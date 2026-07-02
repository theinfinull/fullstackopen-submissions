import { json, Router } from "express";
import { phonebookDB } from "../data/phonebook.js";

const router = Router();


router.get("/info", (req, res) => {
    return res
        .type("text/plain")
        .send(`phonebook has info for ${phonebookDB.length} people.\n\n${new Date().toString().toLowerCase()}`)
});

router.get("/", (req, res) => {
    return res.json(phonebookDB);
});

router.get("/:id", (req, res) => {
    const entry = phonebookDB.find((entry) => entry.id == req.params.id);
    if (!entry) {
        return res.status(404).json({
            message: "phonebook entry not found",
        });
    }
    return res.json(entry);
});

router.post("/", (req, res) => {
    const { name, number } = req.body;
    if (!name || !number) {
        return res.status(404).json({
            message: "name and number are required",
        });
    }
    if (phonebookDB.some((entry) => entry.number == number)) {
        return res.status(404).json({
            message: "number already exists for another user",
        });
    }
    const id = Math.max(0, ...phonebookDB.map((entry) => entry.id)) + 1;
    phonebookDB.push({ id, name, number });
    return res.status(201).json({
        data: { id, name, number },
        message: "entry added successfully",
    });
});

router.put("/:id", (req, res) => {
    const entry = phonebookDB.find((entry) => entry.id == req.params.id);
    if (!entry) {
        return res.status(404).json({
            message: "phonebook entry not found",
        });
    }
    const { name, number } = req.body;
    if (!name || !number) {
        return res.status(404).json({
            message: "name and number are required",
        });
    }
    // 2 persons can have same name, so using number instead
    if (phonebookDB.some((e) => e.number == number && e.id != entry.id)) {
        return res.status(404).json({
            message: "number already exists for another person",
        });
    }
    entry.name = name;
    entry.number = number;
    return res.json({
        data: entry,
        message: "entry updated successfully",
    });
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const entry = phonebookDB.find((entry) => entry.id == id);
    if (!entry) {
        return res.status(404).json({
            message: "phonebook entry not found",
        });
    }
    const index = phonebookDB.findIndex((entry) => entry.id == id);
    phonebookDB.splice(index, 1);
    return res.json({
        message: "entry deleted successfully",
    });
});

export default router;
