import db from "./index.js";

db.exec(`
    CREATE TABLE IF NOT EXISTS notes (
        id           INTEGER  PRIMARY KEY AUTOINCREMENT,
        title        TEXT     NOT NULL,
        content      TEXT     NOT NULL,
        is_important INTEGER  NOT NULL DEFAULT 0,
        created_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at   DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

const STATEMENT = {
    GET: db.prepare(`SELECT * FROM notes WHERE id = ?`),
    EXISTS: db.prepare(
        `SELECT EXISTS(SELECT 1 FROM notes WHERE id = ?) AS found`,
    ),
    CREATE: db.prepare(
        `INSERT INTO notes (title, content, is_important) VALUES (?, ?, ?)`,
    ),
    UPDATE: db.prepare(`
        UPDATE notes
        SET title = ?, content = ?, is_important = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    `),
    DELETE: db.prepare(`DELETE FROM notes WHERE id = ?`),
};

function buildGetAllQuery({
    important,
    search,
    sortBy = "created_at",
    order = "DESC",
    limit,
    offset,
} = {}) {
    let query = `SELECT * FROM notes`;
    const criteria = [];
    const params = [];
    if (important !== undefined) {
        criteria.push(`is_important = ?`);
        params.push(important ? 1 : 0);
    }
    if (search) {
        criteria.push(`(title LIKE ? OR content LIKE ?)`);
        params.push(`%${search}%`, `%${search}%`);
    }
    if (criteria.length) {
        query += ` WHERE ${criteria.join(" AND ")}`;
    }
    query += ` ORDER BY ${sortBy} ${order}`;

    if (limit != null) {
        query += ` LIMIT ?`;
        params.push(limit);
    }
    if (offset != null) {
        query += ` OFFSET ?`;
        params.push(offset);
    }
    return { sql: query, params };
}

const formatNote = (row) => row && { ...row, is_important: !!row.is_important };

export const notesDB = {
    getAll(filters = {}) {
        const { sql, params } = buildGetAllQuery(filters);
        return db
            .prepare(sql)
            .all(...params)
            .map(formatNote);
    },

    get(id) {
        return formatNote(STATEMENT.GET.get(id));
    },

    exists(id) {
        return !!STATEMENT.EXISTS.get(id)?.found;
    },

    create({ title, content, is_important = false }) {
        const { lastInsertRowid } = STATEMENT.CREATE.run(
            title,
            content,
            is_important ? 1 : 0,
        );
        return this.get(lastInsertRowid);
    },

    update(id, { title, content, is_important }) {
        STATEMENT.UPDATE.run(title, content, is_important ? 1 : 0, id);
        return this.get(id);
    },

    delete(id) {
        return STATEMENT.DELETE.run(id);
    },
};
