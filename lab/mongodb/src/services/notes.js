import { Note } from "../models/note.js";

export async function getAll({
    is_important,
    search,
    sortBy,
    order,
    limit,
    offset,
}) {
    const filter = {};

    if (is_important !== undefined) {
        filter.is_important = is_important;
    }

    if (search) {
        filter.content = {
            $regex: search,
            $options: "i",
        };
    }

    let query = Note.find(filter);

    if (sortBy) {
        query = query.sort({
            [sortBy]: order === "desc" ? -1 : 1,
        });
    }

    if (offset) query = query.skip(offset);
    if (limit) query = query.limit(limit);

    return query.exec();
}

export function get(id) {
    return Note.findById(id).exec();
}

export function create(note) {
    return Note.create(note);
}

export function update(id, note) {
    return Note.findByIdAndUpdate(id, note, {
        new: true,
        runValidators: true,
    }).exec();
}

export function remove(id) {
    return Note.findByIdAndDelete(id).exec();
}

export function exists(id) {
    return Note.exists({ _id: id });
}
