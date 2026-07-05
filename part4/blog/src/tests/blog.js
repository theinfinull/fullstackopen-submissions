import "dotenv/config";
import assert from "node:assert";
import { after, beforeEach, describe, test } from "node:test";
import supertest from "supertest";

import { createApp } from "../app.js";
import Blog from "../models/blog.js";
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

// Helpers ---
function blogFields(blog) {
    const { title, author, url, likes } = blog;
    return { title, author, url, likes };
}

async function clearBlogs() {
    await Blog.deleteMany({});
}

function postBlog(blog) {
    return api
        .post("/api/blogs")
        .send(blog)
        .expect("Content-Type", /application\/json/);
}

function getBlogsRequest() {
    return api
        .get("/api/blogs")
        .expect(200)
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
    for (const title of titles) {
        await createBlog(title);
    }
}

async function expectValidationError(blog, message) {
    const { body } = await postBlog(blog).expect(400);

    assert.strictEqual(body.message, message);
}

// Lifecycle ---
beforeEach(clearBlogs);

after(async () => {
    await clearBlogs();
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
