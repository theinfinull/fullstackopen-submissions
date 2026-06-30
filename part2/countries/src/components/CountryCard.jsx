import { useEffect, useState } from "react";
import { getWeather, getWeatherIcon } from "../services/weather";

export default function CountryCard({ country: c }) {
    const languages = Object.values(c.languages ?? {}).join(", ");
    const currencies = Object.values(c.currencies ?? {})
        .map((cur) => `${cur.name} (${cur.symbol})`)
        .join(", ");

    const [weather, setWeather] = useState({});

    useEffect(() => {
        const lat = c.capitalInfo?.latlng?.[0];
        const lon = c.capitalInfo?.latlng?.[1];
        if (lat == null || lon == null) return;
        getWeather(lat, lon)
            .then((data) => {
                setWeather({
                    temprature: `${data.current.temperature_2m}${data.current_units.temperature_2m}`,
                    humidity: `${data.current.relative_humidity_2m}${data.current_units.relative_humidity_2m}`,
                    weather_code: data.current.weather_code,
                    weather: getWeatherIcon(data.current.weather_code),
                });
            })
            .catch((err) => {
                console.log(`[ERR] weather : ${err}`);
            });
    }, []);

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
                    ["temprature", weather?.temprature ?? "—"],
                    ["humidity", weather?.humidity ?? "—"],
                    ["weather code", weather?.weather_code ?? "—"],
                    ["weather", weather?.weather ?? "—"],
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
