const BASE_URL = "/api/notes";

async function request(url, options = {}) {
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
        ...options,
    });

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
}

async function createNote(title, content, is_important = false) {
    return request(BASE_URL, {
        method: "POST",
        body: JSON.stringify({
            title,
            content,
            is_important,
        }),
    });
}

async function updateNote(id, updates) {
    return request(`${BASE_URL}/${id}`, {
        method: "PUT",
        body: JSON.stringify(updates),
    });
}

async function removeNote(id) {
    return request(`${BASE_URL}/${id}`, {
        method: "DELETE",
    });
}

async function getNote(id) {
    return request(`${BASE_URL}/${id}`);
}

async function getAllNotes() {
    return request(BASE_URL);
}

export { createNote, updateNote, removeNote, getNote, getAllNotes };
