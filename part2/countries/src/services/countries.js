const BASE_URL = "https://studies.cs.helsinki.fi/restcountries/api";

async function request(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    if (res.status === 204) return null;
    return res.json();
}

export const getAllCountries = () => request(`${BASE_URL}/all`);
export const getCountry = (name) => request(`${BASE_URL}/name/${encodeURIComponent(name)}`);
