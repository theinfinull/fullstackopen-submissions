import { Router } from "express";
import Blog from "../models/blog.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { orNotFound } from "../utils/orNotFound.js";

const router = Router();

router.get(
    "/",
    asyncHandler(async (req, res) => {
        const blogs = await Blog.find({ user: req.user.id });
        res.json(blogs);
    }),
);

router.get(
    "/:id",
    asyncHandler(async (req, res) => {
        const blog = await orNotFound(Blog.findOne({ _id: req.params.id, user: req.user.id }), "blog");
        res.json(blog);
    }),
);

router.post(
    "/",
    asyncHandler(async (req, res) => {
        const blog = await Blog.create({
            ...req.body,
            user: req.user.id,
        });

        res.status(201).json({
            blog,
            message: "blog created successfully",
        });
    }),
);

router.put(
    "/:id",
    asyncHandler(async (req, res) => {
        const blog = await orNotFound(
            Blog.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, req.body, {
                returnDocument: "after",
                runValidators: true,
                context: "query",
            }),
            "blog",
        );

        res.json({
            blog,
            message: "blog updated successfully",
        });
    }),
);

router.delete(
    "/:id",
    asyncHandler(async (req, res) => {
        await orNotFound(Blog.findOneAndDelete({ _id: req.params.id, user: req.user.id }), "blog");

        res.json({ message: "blog deleted successfully" });
    }),
);

export default router;
