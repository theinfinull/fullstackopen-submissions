const BASE_URL = "/api/persons";

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

async function createPerson(name, number) {
    return request(BASE_URL, {
        method: "POST",
        body: JSON.stringify({
            name,
            number,
        }),
    });
}

async function updatePerson(id, updates) {
    return request(`${BASE_URL}/${id}`, {
        method: "PUT",
        body: JSON.stringify(updates),
    });
}

async function removePerson(id) {
    return request(`${BASE_URL}/${id}`, {
        method: "DELETE",
    });
}

async function getPerson(id) {
    return request(`${BASE_URL}/${id}`);
}

async function getAllPersons() {
    return request(BASE_URL);
}

export { createPerson, updatePerson, removePerson, getPerson, getAllPersons };
