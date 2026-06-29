import { useState } from "react";

export default function PhoneBooksForm({ modifyHandler, notify }) {
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");

    function formSubmitHandler(e) {
        e.preventDefault();

        if (!newName) {
            console.log(`[INFO] name is empty`);
            notify("error", "name is empty");
            return;
        }

        if (!newNumber) {
            console.log(`[INFO] number is empty`);
            notify("error", "number is empty");
            return;
        }

        console.log(
            `[INFO] form submitted with name : ${newName} and number : ${newNumber}`,
        );
        modifyHandler(newName, newNumber);
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
