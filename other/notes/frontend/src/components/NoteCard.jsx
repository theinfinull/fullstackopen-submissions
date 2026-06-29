import { Star, Trash2 } from "lucide-react";

function formatDate(str) {
    return new Date(str).toLocaleDateString("en-GB", {
        day: "2-digit", month: "short", year: "2-digit",
    }).toUpperCase();
}

export default function NoteCard({ note, onRemove, onToggle }) {
    return (
        <div className={`note-card ${note.is_important ? "is-important" : ""}`}>
            <p className="note-date">{formatDate(note.created_at)}</p>
            <h3 className="note-title">{note.title}</h3>
            <p className="note-content">{note.content}</p>
            <div className="note-actions">
                <button
                    className={`icon-btn star ${note.is_important ? "active" : ""}`}
                    onClick={() => onToggle(note)}
                    title={note.is_important ? "Unmark" : "Mark important"}
                >
                    <Star size={14} fill={note.is_important ? "currentColor" : "none"} />
                </button>
                <button
                    className="icon-btn trash"
                    onClick={() => onRemove(note.id)}
                    title="Delete"
                >
                    <Trash2 size={14} />
                </button>
            </div>
        </div>
    );
}
