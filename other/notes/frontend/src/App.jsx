import { useEffect, useState, useCallback } from "react";
import { Search } from "lucide-react";
import NoteCard from "./components/NoteCard";
import CreateForm from "./components/CreateForm";
import Notification from "./components/Notification";
import { getAllNotes, removeNote, updateNote, createNote } from "./services/notes";
import "./index.css";

export default function App() {
    const [notes, setNotes] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [notifications, setNotifications] = useState([]);

    const notify = useCallback((message, type = "success") => {
        const id = Date.now();
        setNotifications((prev) => [...prev, { id, message, type }]);
    }, []);

    function dismiss(id) {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    }

    useEffect(() => {
        getAllNotes()
            .then(setNotes)
            .catch(() => notify("failed to load notes", "error"));
    }, []);

    function handleCreate({ title, content, is_important }) {
        createNote(title, content, is_important)
            .then(({ note, message }) => {
                setNotes((prev) => [note, ...prev]);
                notify(message);
            })
            .catch(() => notify("failed to create note", "error"));
    }

    function handleRemove(id) {
        removeNote(id)
            .then(({ message }) => {
                setNotes((prev) => prev.filter((n) => n.id !== id));
                notify(message);
            })
            .catch(() => notify("failed to delete note", "error"));
    }

    function handleToggle(note) {
        updateNote(note.id, { ...note, is_important: !note.is_important })
            .then(({ note: updated, message }) => {
                setNotes((prev) => prev.map((n) => (n.id === updated.id ? updated : n)));
                notify(message);
            })
            .catch(() => notify("failed to update note", "error"));
    }

    const visible = notes
        .filter((n) =>
            filter === "important" ? n.is_important :
            filter === "not_important" ? !n.is_important : true
        )
        .filter((n) =>
            search
                ? n.title.toLowerCase().includes(search.toLowerCase()) ||
                  n.content.toLowerCase().includes(search.toLowerCase())
                : true
        );

    return (
        <div className="app">
            <header className="header">
                <h1 className="wordmark">notes.</h1>
            </header>

            <CreateForm onCreate={handleCreate} />

            <div className="toolbar">
                <div className="search-wrap">
                    <Search size={14} className="search-icon" />
                    <input
                        className="search-input"
                        type="text"
                        placeholder="search notes..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="filter-group">
                    {[
                        { key: "all", label: "all" },
                        { key: "important", label: "★ important" },
                        { key: "not_important", label: "others" },
                    ].map((t) => (
                        <button
                            key={t.key}
                            className={`filter-btn ${filter === t.key ? "active" : ""}`}
                            onClick={() => setFilter(t.key)}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>
            </div>

            {visible.length === 0 ? (
                <p className="empty">no notes{search ? ` for "${search}"` : ""}.</p>
            ) : (
                <div className="notes-grid">
                    {visible.map((note) => (
                        <NoteCard key={note.id} note={note} onRemove={handleRemove} onToggle={handleToggle} />
                    ))}
                </div>
            )}

            <Notification notifications={notifications} onDismiss={dismiss} />
        </div>
    );
}
