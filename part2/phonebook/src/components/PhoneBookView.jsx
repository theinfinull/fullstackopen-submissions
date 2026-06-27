import { useState } from "react";

export default function PhoneBookView({ persons }) {
    const [search, setSearch] = useState("");

    const shownPersons = search
        ? persons.filter(
              (person) =>
                  person.name.toLowerCase().includes(search) ||
                  person.number.includes(search),
          )
        : persons;

    return (
        <div>
            <h2>names</h2>
            <div className="field">
                <label>search</label>
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder=""
                />
            </div>
            <ul>
                {shownPersons.map((person, id) => (
                    <li key={id}>{person.name + " : " + person.number}</li>
                ))}
            </ul>
        </div>
    );
}
