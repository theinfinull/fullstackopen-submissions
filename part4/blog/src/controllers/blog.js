import { Router } from "express";
import Blog from "../models/blog.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { orNotFound } from "../utils/orNotFound.js";

const router = Router();

router.get(
    "/",
    asyncHandler(async (req, res) => {
        const blogs = await Blog.find({});
        res.json(blogs);
    }),
);

router.get(
    "/:id",
    asyncHandler(async (req, res) => {
        const blog = await orNotFound(Blog.findById(req.params.id), "blog");
        res.json(blog);
    }),
);

router.post(
    "/",
    asyncHandler(async (req, res) => {
        const blog = new Blog(req.body);
        const result = await blog.save();

        res.status(201).json({
            blog: result,
            message: "blog created successfully",
        });
    }),
);

router.put(
    "/:id",
    asyncHandler(async (req, res) => {
        const blog = await orNotFound(
            Blog.findByIdAndUpdate(req.params.id, req.body, {
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
        await orNotFound(Blog.findByIdAndDelete(req.params.id), "blog");

        res.json({ message: "blog deleted successfully" });
    }),
);

export default router;
