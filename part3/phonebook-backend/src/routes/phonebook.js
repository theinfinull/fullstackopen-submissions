import { Router } from "express";
import PhoneBook from "../models/phonebook.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = Router();

router.get(
    "/info",
    asyncHandler(async (req, res) => {
        const count = await PhoneBook.countDocuments();
        res.type("text/plain").send(
            `phonebook has info for ${count} people.\n\n${new Date().toString().toLowerCase()}`,
        );
    }),
);

router.get(
    "/",
    asyncHandler(async (req, res) => {
        const entries = await PhoneBook.find();
        res.json(entries);
    }),
);

router.get(
    "/:id",
    asyncHandler(async (req, res) => {
        const entry = await PhoneBook.findById(req.params.id);
        if (!entry) {
            return res.status(404).json({
                message: "phonebook entry not found",
            });
        }
        res.json(entry);
    }),
);

router.post(
    "/",
    asyncHandler(async (req, res) => {
        const entry = await PhoneBook.create(req.body);

        return res.status(201).json({
            data: entry,
            message: "entry added successfully",
        });
    }),
);

router.put(
    "/:id",
    asyncHandler(async (req, res) => {
        const entry = await PhoneBook.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            },
        );

        if (!entry) {
            return res.status(404).json({
                message: "phonebook entry not found",
            });
        }

        res.json({
            data: entry,
            message: "entry updated successfully",
        });
    }),
);

router.delete(
    "/:id",
    asyncHandler(async (req, res) => {
        const entry = await PhoneBook.findByIdAndDelete(req.params.id);

        if (!entry) {
            return res.status(404).json({
                message: "phonebook entry not found",
            });
        }

        res.json({
            message: "entry deleted successfully",
        });
    }),
);

export default router;
