import { useState } from "react";
import Note from "./components/Note";

const App = ({ initialNotes, filters }) => {
    const [notes, setNotes] = useState(initialNotes);
    const [newNote, setNewNote] = useState("");
    const [filter, setFilter] = useState("all");

    const filteredNotes = notes.filter((note) => {
        if (filter == "all") {
            return true;
        } else if (filter == "important") {
            return note.important;
        } else if (filter == "not important") {
            return !note.important;
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
        setFilter(event.target.value);
    }

    return (
        <div className="app">
            <h1>Notes</h1>
            <div className="filter-bar">
                <p>filter</p>
                <select defaultValue={filter} onChange={handleFilterChange}>
                    {filters.map((f, id) => (
                        <option key={id} value={f}>{f}</option>
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
