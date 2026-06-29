import { notesDB } from "../db/notes.js";

export function getAllNotes(req, res) {
    const { important, search, sortBy, order, limit, offset } = req.query;
    res.json(
        notesDB.getAll({
            important:
                important !== undefined ? important === "true" : undefined,
            search,
            sortBy,
            order,
            limit: limit !== undefined ? Number(limit) : undefined,
            offset: offset !== undefined ? Number(offset) : undefined,
        }),
    );
}

export function getNote(req, res) {
    if (!notesDB.exists(req.params.id))
        return res.status(404).json({ error: "note not found" });
    res.json(notesDB.get(req.params.id));
}

export function createNote(req, res) {
    const { title, content, is_important } = req.body;
    if (!title || !content)
        return res
            .status(400)
            .json({ error: "title and content are required" });
    res.status(201).json({
        note: notesDB.create({ title, content, is_important }),
        message: "note created successfully",
    });
}

export function updateNote(req, res) {
    const { id } = req.params;
    if (!notesDB.exists(id))
        return res.status(404).json({ error: "note not found" });
    const { title, content, is_important } = req.body;
    res.json({
        note: notesDB.update(id, { title, content, is_important }),
        message: "note updated successfully",
    });
}

export function deleteNote(req, res) {
    if (!notesDB.exists(req.params.id))
        return res.status(404).json({ error: "note not found" });
    notesDB.delete(req.params.id);
    res.json({ message: "note deleted successfully" });
}
