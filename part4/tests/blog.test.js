import { describe, test } from "node:test";
import assert from "node:assert";
import { getFavouriteBlog, getTotalLikes, mostLikedAuthor, authorWithManyBlogs } from "./blog.js";

const multiBlogsList = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "how to center a div (after losing my sanity)",
        author: "css therapist",
        url: "https://example.com/center-div",
        likes: 404,
    },
    {
        _id: "5a422a851b54a276234d17f7",
        title: "my production database said 'trust me'",
        author: "intern with sudo",
        url: "https://example.com/prod-db",
        likes: 911,
    },
    {
        _id: "5a422a851454a676234d17f7",
        title: "console.log(): the senior developer's debugger",
        author: "definitely not me",
        url: "https://example.com/console-log",
        likes: 1337,
    },
    {
        _id: "5a4229851b54a676234d17f7",
        title: "i named the variable temp. it's been 7 years.",
        author: "legacy code",
        url: "https://example.com/temp-variable",
        likes: 666,
    },
    {
        _id: "4a422a851b54a676234d17f7",
        title: "works on my machine: a love story",
        author: "devops survivor",
        url: "https://example.com/works-on-my-machine",
        likes: 2048,
    },
    {
        _id: "5a422a851b54a676234d19f7",
        title: "the bug wasn't in my code. it was in reality.",
        author: "sleep deprived engineer",
        url: "https://example.com/reality-bug",
        likes: 42,
    },
];

const singleBlogList = [
    {
        _id: "5a422a891b54a676234d19f7",
        title: "i deleted production to improve performance",
        author: "optimization expert",
        url: "https://example.com/delete-prod",
        likes: 5000,
    },
];

const externalBlogList = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0,
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0,
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0,
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0,
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0,
    },
];

describe("other tests", () => {
    test("always true", () => {
        assert.strictEqual(true, true);
    });
});

describe("blog tests", () => {
    describe("length tests", () => {
        test("length test", () => {
            assert.strictEqual(multiBlogsList.length, 6);
        });
    });

    describe("total likes", () => {
        test("empty list is 0", () => {
            const likes = getTotalLikes([]);
            assert.strictEqual(likes, 0);
        });

        test("single blog list is correct", () => {
            const likes = getTotalLikes(singleBlogList);
            assert.strictEqual(likes, 5000);
        });

        test("multi blog list is correct", () => {
            const likes = getTotalLikes(multiBlogsList);
            assert.strictEqual(likes, 5408);
        });

        test("another external multi blog list is correct", () => {
            const likes = getTotalLikes(externalBlogList);
            assert.strictEqual(likes, 36);
        });
    });

    describe("favourite blog", () => {
        test("empty list is {}", () => {
            const blog = getFavouriteBlog([]);
            assert.deepStrictEqual(blog, {});
        });

        test("single blog list returns same", () => {
            const blog = getFavouriteBlog(singleBlogList);
            assert.deepStrictEqual(blog, singleBlogList[0]);
        });

        test("multi blog list returns correct blog", () => {
            const blog = getFavouriteBlog(multiBlogsList);
            assert.deepStrictEqual(blog, multiBlogsList[4]);
        });

        test("another external multi blog list returns correct blog", () => {
            const blog = getFavouriteBlog(externalBlogList);
            assert.strictEqual(blog, externalBlogList[2]);
        });
    });

    describe("most liked author", () => {
        test("empty list is {}", () => {
            assert.deepStrictEqual(mostLikedAuthor([]), {});
        });

        test("single blog list returns author with likes", () => {
            assert.deepStrictEqual(mostLikedAuthor(singleBlogList), {
                author: "optimization expert",
                likes: 5000,
            });
        });

        test("external blog list returns correct author", () => {
            assert.deepStrictEqual(mostLikedAuthor(externalBlogList), {
                author: "Edsger W. Dijkstra",
                likes: 17,
            });
        });

        test("multi blog list returns correct author", () => {
            assert.deepStrictEqual(mostLikedAuthor(multiBlogsList), {
                author: "devops survivor",
                likes: 2048,
            });
        });
    });

    describe("author with many blogs", () => {
        test("empty list is {}", () => {
            assert.deepStrictEqual(authorWithManyBlogs([]), {});
        });

        test("single blog list returns author with one blog", () => {
            assert.deepStrictEqual(authorWithManyBlogs(singleBlogList), {
                author: "optimization expert",
                blogs: 1,
            });
        });

        test("external blog list returns correct author", () => {
            assert.deepStrictEqual(authorWithManyBlogs(externalBlogList), {
                author: "Robert C. Martin",
                blogs: 3,
            });
        });

        test("multi blog list returns one of the authors with one blog", () => {
            assert.deepStrictEqual(authorWithManyBlogs(multiBlogsList), {
                author: "css therapist",
                blogs: 1,
            });
        });
    });
});
