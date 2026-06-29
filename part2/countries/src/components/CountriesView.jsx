import CountryCard from "./CountryCard";

export default function CountriesView({
    countries,
    search,
    isLoading,
    error,
    selected,
    setSelected,
}) {
    if (isLoading) {
        return (
            <p className="hint loading">
                fetching countries
                <span className="dots" />
            </p>
        );
    }

    if (error) {
        return <p className="hint error">failed to load countries: {error}</p>;
    }

    if (!search.trim()) {
        return <p className="hint">start typing to search countries</p>;
    }

    if (countries.length === 0) {
        return <p className="hint">no matches for "{search}"</p>;
    }

    if (countries.length > 10) {
        return (
            <p className="hint">too many matches — specify another filter</p>
        );
    }

    if (countries.length === 1) {
        return <CountryCard country={countries[0]} />;
    }

    // 2–10 results: list with show button
    if (selected) {
        return (
            <>
                <button className="btn-back" onClick={() => setSelected(null)}>
                    ← back
                </button>
                <CountryCard country={selected} />
            </>
        );
    }

    return (
        <ul className="country-list">
            {countries.map((c) => (
                <li key={c.cca3} className="country-list__item">
                    <img
                        src={c.flags.png}
                        alt={c.name.common}
                        className="country-list__flag"
                    />
                    <span>{c.name.common}</span>
                    <button className="btn-show" onClick={() => setSelected(c)}>
                        show
                    </button>
                </li>
            ))}
        </ul>
    );
}
