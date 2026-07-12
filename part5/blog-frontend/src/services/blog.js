import { request } from "./api";

const BASE_PATH = "/blogs";

async function getAllBlogs() {
    return request(BASE_PATH);
}

async function getBlog(id) {
    return request(`${BASE_PATH}/${id}`);
}

async function createBlog(title, author, url, likes) {
    return request(BASE_PATH, {
        method: "POST",
        body: { title, author, url, likes },
    });
}

async function updateBlog(id, updates) {
    return request(`${BASE_PATH}/${id}`, {
        method: "PUT",
        body: updates,
    });
}

async function removeBlog(id) {
    return request(`${BASE_PATH}/${id}`, {
        method: "DELETE",
    });
}

export { getAllBlogs, getBlog, createBlog, updateBlog, removeBlog };
