export default function CountryCard({ country: c }) {
    const languages = Object.values(c.languages ?? {}).join(", ");
    const currencies = Object.values(c.currencies ?? {})
        .map((cur) => `${cur.name} (${cur.symbol})`)
        .join(", ");

    return (
        <div className="country-card">
            <div className="country-card__header">
                <img
                    src={c.flags.png}
                    alt={c.flags.alt ?? c.name.common}
                    className="country-card__flag"
                />
                <div>
                    <h2 className="country-card__name">{c.name.common}</h2>
                    <p className="country-card__official">{c.name.official}</p>
                    <span className="country-card__emoji">{c.flag}</span>
                </div>
            </div>
            <div className="country-card__grid">
                {[
                    ["capital", c.capital?.[0] ?? "—"],
                    [
                        "region",
                        `${c.region}${c.subregion ? ` — ${c.subregion}` : ""}`,
                    ],
                    ["population", c.population.toLocaleString()],
                    ["area", `${c.area.toLocaleString()} km²`],
                    ["languages", languages || "—"],
                    ["currencies", currencies || "—"],
                    ["timezone", c.timezones?.[0] ?? "—"],
                    ["drives on", c.car?.side ?? "—"],
                ].map(([label, value]) => (
                    <div key={label} className="country-card__stat">
                        <span className="country-card__label">{label}</span>
                        <span>{value}</span>
                    </div>
                ))}
            </div>
            {c.borders?.length > 0 && (
                <div className="country-card__borders">
                    <span className="country-card__label">borders</span>
                    <div className="country-card__tags">
                        {c.borders.map((b) => (
                            <span key={b} className="tag">
                                {b}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
