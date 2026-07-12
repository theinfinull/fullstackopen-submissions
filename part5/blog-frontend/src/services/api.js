import { createLogger } from "../utils/logger";
import { getAuthHeader } from "./auth";

async function request(url, { method = "GET", body, headers = {} } = {}) {
    const hasJsonBody = body !== undefined;

    const response = await fetch(url, {
        method,
        headers: {
            ...(hasJsonBody && { "Content-Type": "application/json" }),
            ...getAuthHeader(),
            ...headers,
        },
        body: hasJsonBody ? JSON.stringify(body) : undefined,
    });

    if (response.status === 204) {
        return null;
    }

    const contentType = response.headers.get("content-type") ?? "";
    const data = contentType.includes("application/json") ? await response.json() : await response.text();

    if (!response.ok) {
        throw new Error(data?.message || data || `HTTP ${response.status}`);
    }

    return data;
}

export { request };
