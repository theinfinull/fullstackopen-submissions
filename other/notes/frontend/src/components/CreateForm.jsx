import { useState } from "react";
import { Star } from "lucide-react";

export default function CreateForm({ onCreate }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isImportant, setIsImportant] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;
        onCreate({ title: title.trim(), content: content.trim(), is_important: isImportant });
        setTitle("");
        setContent("");
        setIsImportant(false);
    }

    return (
        <form className="create-form" onSubmit={handleSubmit}>
            <input
                className="create-title"
                placeholder="Note title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                className="create-content"
                placeholder="Write something..."
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <div className="create-footer">
                <button
                    type="button"
                    className={`important-toggle ${isImportant ? "active" : ""}`}
                    onClick={() => setIsImportant((prev) => !prev)}
                    aria-pressed={isImportant}
                >
                    <Star size={13} fill={isImportant ? "currentColor" : "none"} />
                    important
                </button>
                <button type="submit" className="btn-create" disabled={!title.trim() || !content.trim()}>
                    + create note
                </button>
            </div>
        </form>
    );
}
