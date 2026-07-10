import "dotenv/config";
import assert from "node:assert";
import { after, before, beforeEach, describe, test } from "node:test";
import mongoose from "mongoose";
import supertest from "supertest";

import { createApp } from "../app.js";
import Blog from "../models/blog.js";
import User from "../models/user.js";
import { loadConfig } from "../utils/config.js";
import { connectToMongoDB, disconnectFromMongoDB } from "../utils/mongoDB.js";

const api = supertest(createApp());

await connectToMongoDB(loadConfig().MONGODB_URI);

const BLOG_TEMPLATE = {
    title: "example",
    author: "example",
    url: "https://example.com",
    likes: 1,
};

const TEST_USER = {
    username: "blog.tests.user",
    name: "Blog Tests User",
    password: "TestPassword123!",
};

// a syntactically valid ObjectId that (almost certainly) doesn't exist
const NONEXISTENT_ID = new mongoose.Types.ObjectId().toString();
const MALFORMED_ID = "not-an-object-id";

let authHeader;
let userId;

// Helpers ---
function blogFields(blog) {
    const { title, author, url, likes } = blog;
    return { title, author, url, likes };
}

async function clearBlogs() {
    await Blog.deleteMany({ user: userId });
}

async function authenticateTestUser() {
    await api.post("/api/signup").send(TEST_USER);

    const { body } = await api.post("/api/login").send({ username: TEST_USER.username, password: TEST_USER.password }).expect(200);

    return { token: body.token, id: body.user.id };
}

function postBlog(blog) {
    return api
        .post("/api/blogs")
        .set("Authorization", authHeader)
        .send(blog)
        .expect("Content-Type", /application\/json/);
}

function getBlogsRequest() {
    return api
        .get("/api/blogs")
        .set("Authorization", authHeader)
        .expect(200)
        .expect("Content-Type", /application\/json/);
}

function getBlogRequest(id) {
    return api
        .get(`/api/blogs/${id}`)
        .set("Authorization", authHeader)
        .expect("Content-Type", /application\/json/);
}

function putBlogRequest(id, updates) {
    return api
        .put(`/api/blogs/${id}`)
        .set("Authorization", authHeader)
        .send(updates)
        .expect("Content-Type", /application\/json/);
}

function deleteBlogRequest(id) {
    return api
        .delete(`/api/blogs/${id}`)
        .set("Authorization", authHeader)
        .expect("Content-Type", /application\/json/);
}

async function getBlogs() {
    const { body } = await getBlogsRequest();
    return body;
}

async function createBlog(title) {
    const blog = {
        ...BLOG_TEMPLATE,
        title,
    };

    const { body } = await postBlog(blog).expect(201);

    assert.strictEqual(body.message, "blog created successfully");
    assert.deepStrictEqual(blogFields(body.blog), blog);

    return body.blog;
}

async function seedBlogs(...titles) {
    const blogs = [];
    for (const title of titles) {
        blogs.push(await createBlog(title));
    }
    return blogs;
}

async function expectValidationError(blog, message) {
    const { body } = await postBlog(blog).expect(400);

    assert.strictEqual(body.message, message);
}

async function expectNotFound(request) {
    const { body } = await request.expect(404);

    assert.strictEqual(body.message, "blog not found");
}

// Lifecycle ---
before(async () => {
    const { token, id } = await authenticateTestUser();
    authHeader = `Bearer ${token}`;
    userId = id;
});

beforeEach(clearBlogs);

after(async () => {
    await clearBlogs();
    await User.deleteOne({ _id: userId });
    await disconnectFromMongoDB();
});

// POST tests ---
describe("POST /api/blogs", () => {
    test("creates a blog", async () => {
        await createBlog("a");
    });

    describe("validation", () => {
        test("rejects missing title", async () => {
            await expectValidationError({ ...BLOG_TEMPLATE, title: "" }, "Blog validation failed: title: title is required");
        });

        test("rejects missing author", async () => {
            await expectValidationError({ ...BLOG_TEMPLATE, author: "" }, "Blog validation failed: author: author is required");
        });

        test("rejects invalid URL", async () => {
            await expectValidationError({ ...BLOG_TEMPLATE, url: "http://localhost:9000" }, "Blog validation failed: url: invalid URL");
        });

        test("likes defaults to 0", async () => {
            const { likes, ...blog } = BLOG_TEMPLATE;
            const { body } = await postBlog(blog).expect(201);

            assert.strictEqual(body.message, "blog created successfully");
            assert.deepStrictEqual(blogFields(body.blog), { ...blog, likes: 0 });
        });
    });
});

// GET tests ---
describe("GET /api/blogs", () => {
    beforeEach(async () => {
        await seedBlogs("a", "b");
    });

    test("returns JSON", async () => {
        await getBlogsRequest();
    });

    test("returns all blogs", async () => {
        const blogs = await getBlogs();

        assert.strictEqual(blogs.length, 2);
    });
});

// GET by id tests ---
describe("GET /api/blogs/:id", () => {
    test("returns the matching blog", async () => {
        const created = await createBlog("a");

        const { body } = await getBlogRequest(created.id).expect(200);

        assert.deepStrictEqual(body, created);
    });

    test("returns 404 for a nonexistent id", async () => {
        await expectNotFound(getBlogRequest(NONEXISTENT_ID));
    });

    test("returns 404 for a malformed id", async () => {
        await expectNotFound(getBlogRequest(MALFORMED_ID));
    });
});

// PUT tests ---
describe("PUT /api/blogs/:id", () => {
    test("updates the matching blog", async () => {
        const created = await createBlog("a");

        const { body } = await putBlogRequest(created.id, { likes: 10 }).expect(200);

        assert.strictEqual(body.message, "blog updated successfully");
        assert.strictEqual(body.blog.id, created.id);
        assert.strictEqual(body.blog.likes, 10);

        const { body: fetched } = await getBlogRequest(created.id).expect(200);
        assert.strictEqual(fetched.likes, 10);
    });

    test("returns 404 for a nonexistent id", async () => {
        await expectNotFound(putBlogRequest(NONEXISTENT_ID, { likes: 10 }));
    });

    test("returns 404 for a malformed id", async () => {
        await expectNotFound(putBlogRequest(MALFORMED_ID, { likes: 10 }));
    });

    test("rejects an update that violates validation", async () => {
        const created = await createBlog("a");

        const { body } = await putBlogRequest(created.id, { title: "" }).expect(400);

        assert.strictEqual(body.message, "Validation failed: title: title is required");
    });
});

// DELETE tests ---
describe("DELETE /api/blogs/:id", () => {
    test("deletes the matching blog", async () => {
        const created = await createBlog("a");

        const { body } = await deleteBlogRequest(created.id).expect(200);

        assert.strictEqual(body.message, "blog deleted successfully");

        await expectNotFound(getBlogRequest(created.id));
    });

    test("returns 404 for a nonexistent id", async () => {
        await expectNotFound(deleteBlogRequest(NONEXISTENT_ID));
    });

    test("returns 404 for a malformed id", async () => {
        await expectNotFound(deleteBlogRequest(MALFORMED_ID));
    });
});
