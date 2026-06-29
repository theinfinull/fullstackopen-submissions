import { useState } from "react";
import PhoneBookView from "./components/PhoneBookView";
import PhoneBooksForm from "./components/PhoneBookForm";
import { useEffect } from "react";

export default function App() {
    const [persons, setPersons] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/persons")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setPersons(data);
            })
            .catch((err) => {
                console.log("[ERR]: failed to fetch persons:" + err);
            });
    });

    return (
        <div className="app">
            <h1>phonebook</h1>
            <h2>add name</h2>
            <PhoneBooksForm persons={persons} setPersons={setPersons} />
            <PhoneBookView persons={persons} />
        </div>
    );
}
