import { useState } from "react";

export default function PhoneBooksForm({ persons, setPersons }) {
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");

    function formSubmitHandler(e) {
        e.preventDefault();

        if (!newName) {
            console.log(`[INFO] name is empty`);
            return;
        }

        if (!newNumber) {
            console.log(`[INFO] number is empty`);
            return;
        }

        if (persons.some((person) => person.name == newName)) {
            alert(`name : ${newName} already exists in phonebook`);
            console.log(`[INFO] name aleady exists in phonebook : ${newName}`);
            return;
        }

        if (persons.some((person) => person.number == newNumber)) {
            alert(`number : ${newNumber} already exists in phonebook`);
            console.log(
                `[INFO] number aleady exists in phonebook : ${newName}`,
            );
            return;
        }

        console.log(
            `[INFO] form submitted with name : ${newName} and number : ${newNumber}`,
        );
        setPersons(persons.concat({ name: newName, number: newNumber }));
    }

    return (
        <form onSubmit={formSubmitHandler}>
            <div className="field">
                <label>name</label>
                <input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="john doe"
                />
            </div>
            <div className="field">
                <label>number</label>
                <input
                    value={newNumber}
                    onChange={(e) => setNewNumber(e.target.value)}
                    placeholder="+91 00000 00000"
                />
            </div>
            <button type="submit">add</button>
        </form>
    );
}
