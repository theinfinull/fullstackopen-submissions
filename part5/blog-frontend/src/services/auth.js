import { createLogger } from "../utils/logger";
import { request } from "./api";

const logger = createLogger("auth-service");

const AUTH_TOKEN_KEY = "auth_token";

function getAuthToken() {
    const authToken = localStorage.getItem(AUTH_TOKEN_KEY);
    logger.info(`auth token accessed: ${authToken}`);
    return authToken;
}

function setAuthToken(authToken) {
    logger.info(`auth token set: ${authToken}`);
    localStorage.setItem(AUTH_TOKEN_KEY, authToken);
}

function removeAuthToken() {
    logger.info(`auth token removed`);
    localStorage.removeItem(AUTH_TOKEN_KEY);
}

function getAuthHeader() {
    const authToken = getAuthToken();
    const authHeader = authToken ? { Authorization: `Bearer ${authToken}` } : {};
    logger.info(`auth header: ${authHeader} is accessed`);
    return authHeader;
}

function isAuthenticated() {
    return Boolean(getAuthToken());
}

async function login(username, password) {
    const data = await request("/api/login", {
        method: "POST",
        body: { username, password },
    });

    setAuthToken(data.token);

    return data;
}

async function signup(username, name, password) {
    return request("/api/signup", {
        method: "POST",
        body: { username, name, password },
    });
}

function logout() {
    removeAuthToken();
    window.location.replace("/login");
}

export { login, signup, logout, getAuthHeader, isAuthenticated };
