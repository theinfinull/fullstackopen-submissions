import { useState } from "react";
import PhoneBookView from "./components/PhoneBookView";
import PhoneBooksForm from "./components/PhoneBookForm";

export default function App() {
    const [persons, setPersons] = useState([]);

    return (
        <div className="app">
            <h1>phonebook</h1>
            <h2>add name</h2>
            <PhoneBooksForm persons={persons} setPersons={setPersons} />
            <PhoneBookView persons={persons} />
        </div>
    );
}
