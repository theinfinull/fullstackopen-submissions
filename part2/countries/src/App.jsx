import { useState, useEffect } from "react";
import { getAllCountries } from "./services/countries";
import SearchBar from "./components/SearchBar";
import CountriesView from "./components/CountriesView";

export default function App() {
    const [countries, setCountries] = useState([]);
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getAllCountries()
            .then(setCountries)
            .catch((err) => setError(err.message))
            .finally(() => setIsLoading(false));
    }, []);

    // reset selected country whenever search changes
    useEffect(() => {
        setSelected(null);
    }, [search]);

    const filtered = search.trim()
        ? countries.filter((c) =>
              c.name.common.toLowerCase().includes(search.trim().toLowerCase()),
          )
        : [];

    return (
        <div className="app">
            <h1>countries</h1>
            <SearchBar
                search={search}
                setSearch={setSearch}
                isLoading={isLoading}
            />
            <CountriesView
                countries={filtered}
                search={search}
                isLoading={isLoading}
                error={error}
                selected={selected}
                setSelected={setSelected}
            />
        </div>
    );
}
