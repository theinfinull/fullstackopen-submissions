import { useState, useEffect } from "react";
import axios from "axios";
import Note from "./components/Note";

const App = () => {
    useEffect(() => {
        console.log("effect");
        Promise.all([
            axios.get("http://localhost:3001/notes"),
            axios.get("http://localhost:3001/filters"),
        ])
            .then(([notesResponse, filtersResponse]) => {
                setNotes(notesResponse.data);
                setFilters(filtersResponse.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const [notes, setNotes] = useState([]);
    const [filters, setFilters] = useState([]);

    const [newNote, setNewNote] = useState("");
    const [currFilter, setCurrFilter] = useState("all");

    const filteredNotes = notes.filter((note) => {
        switch (currFilter) {
            case "important":
                return note.important;
            case "not important":
                return !note.important;
            default:
                return true;
        }
    });

    function addNote(event) {
        event.preventDefault();

        const noteObj = {
            id: String(notes.length + 1),
            content: newNote,
            important: Math.random() < 0.5,
        };

        console.log("[INFO] new note added: ", newNote);
        setNotes(notes.concat(noteObj));
    }

    function handleNewNoteChange(event) {
        console.log("[INFO] new note value changed: " + event.target.value);
        setNewNote(event.target.value);
    }

    function handleFilterChange(event) {
        console.log("[INFO] filter changed: " + event.target.value);
        setCurrFilter(event.target.value);
    }

    return (
        <div className="app">
            <h1>Notes</h1>
            <div className="filter-bar">
                <p>filter</p>
                <select value={currFilter} onChange={handleFilterChange}>
                    {filters.map((filter, id) => (
                        <option key={id} value={filter.value}>
                            {filter.value}
                        </option>
                    ))}
                </select>
            </div>
            <ul>
                {filteredNotes.map((note) => (
                    <Note
                        key={note.id}
                        content={note.content}
                        isImportant={note.important}
                    />
                ))}
            </ul>
            <form onSubmit={addNote}>
                <input
                    value={newNote}
                    onChange={handleNewNoteChange}
                    placeholder="type somethin..."
                />
                <button type="submit">submit</button>
            </form>
        </div>
    );
};

export default App;
