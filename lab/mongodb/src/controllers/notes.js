import * as noteService from "../services/notes.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getAllNotes = asyncHandler(async (req, res) => {
    const { important, search, sortBy, order, limit, offset } = req.query;

    const filters = { search, sortBy, order };

    if (important !== undefined) {
        filters.is_important = important === "true";
    }
    if (limit !== undefined) {
        filters.limit = Number(limit);
    }
    if (offset !== undefined) {
        filters.offset = Number(offset);
    }

    const notes = await noteService.getAll(filters);
    res.json(notes);
});

export const getNote = asyncHandler(async (req, res) => {
    const note = await noteService.get(req.params.id);

    if (!note) {
        return res.status(404).json({
            message: "note not found",
        });
    }

    res.json(note);
});

export const createNote = asyncHandler(async (req, res) => {
    const { title, content, is_important } = req.body;

    if (!title || !content) {
        return res.status(400).json({
            message: "title and content are required",
        });
    }

    const note = await noteService.create({ title, content, is_important });
    res.status(201).json({
        note,
        message: "note created successfully",
    });
});

export const updateNote = asyncHandler(async (req, res) => {
    const { title, content, is_important } = req.body;
    const update = {};

    if (title !== undefined) update.title = title;
    if (content !== undefined) update.content = content;
    if (is_important !== undefined) update.is_important = is_important;

    const note = await noteService.update(req.params.id, update);

    if (!note) {
        return res.status(404).json({
            message: "note not found",
        });
    }

    res.json({
        note,
        message: "note updated successfully",
    });
});

export const deleteNote = asyncHandler(async (req, res) => {
    const found = await noteService.exists(req.params.id);

    if (!found) {
        return res.status(404).json({
            message: "note not found",
        });
    }

    await noteService.remove(req.params.id);
    res.json({
        message: "note deleted successfully",
    });
});
