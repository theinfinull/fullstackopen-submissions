import { request } from "./utils";

const BASE_URL = "https://studies.cs.helsinki.fi/restcountries/api";

export const getAllCountries = () => request(`${BASE_URL}/all`);
export const getCountry = (name) =>
    request(`${BASE_URL}/name/${encodeURIComponent(name)}`);
