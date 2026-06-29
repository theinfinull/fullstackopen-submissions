import express from "express";
import cors from "cors";
import Database from "better-sqlite3";

const db = new Database("phonebook.db");

db.exec(`
    CREATE TABLE IF NOT EXISTS persons (
        id      INTEGER PRIMARY KEY AUTOINCREMENT,
        name    TEXT    NOT NULL UNIQUE,
        number  TEXT    NOT NULL
    )
`);

const app = express();
const PORT = process.env.PORT || 3390;

app.use(cors());
app.use(express.json());

// GET all persons
app.get("/api/persons", (_req, res) => {
    res.json(db.prepare("SELECT * FROM persons").all());
});

// GET single person
app.get("/api/persons/:id", (req, res) => {
    const person = db
        .prepare("SELECT * FROM persons WHERE id = ?")
        .get(req.params.id);
    if (!person) return res.status(404).json({ error: "person not found" });
    res.json(person);
});

// POST create person
app.post("/api/persons", (req, res) => {
    const { name, number } = req.body ?? {};
    if (!name || !number) {
        return res.status(400).json({ error: "name and number are required" });
    }
    try {
        const result = db
            .prepare("INSERT INTO persons (name, number) VALUES (?, ?)")
            .run(name, number);
        res.status(201).json({ id: result.lastInsertRowid, name, number });
    } catch (e) {
        if (e.code === "SQLITE_CONSTRAINT_UNIQUE") {
            return res.status(409).json({ error: "name must be unique" });
        }
        throw e;
    }
});

// PUT update person
app.put("/api/persons/:id", (req, res) => {
    const { name, number } = req.body ?? {};
    const existing = db
        .prepare("SELECT * FROM persons WHERE id = ?")
        .get(req.params.id);
    if (!existing) return res.status(404).json({ error: "person not found" });
    const updated = {
        name: name ?? existing.name,
        number: number ?? existing.number,
    };
    db.prepare("UPDATE persons SET name = ?, number = ? WHERE id = ?").run(
        updated.name,
        updated.number,
        req.params.id,
    );
    res.json({ id: Number(req.params.id), ...updated });
});

// DELETE person
app.delete("/api/persons/:id", (req, res) => {
    const result = db
        .prepare("DELETE FROM persons WHERE id = ?")
        .run(req.params.id);
    if (result.changes === 0)
        return res.status(404).json({ error: "person not found" });
    res.status(204).end();
});

app.listen(PORT, () => {
    console.log(`[server] http://localhost:${PORT}`);
});
