import { Router } from "express";
import Blog from "../models/blog.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { createLogger } from "../utils/logger.js";

const router = Router();
const logger = createLogger("blog-controller");

router.get(
    "/",
    asyncHandler(async (req, res) => {
        const blogs = await Blog.find({});
        res.json(blogs);
    }),
);

router.post(
    "/",
    asyncHandler(async (req, res) => {
        logger.info(req.body)
        const blog = new Blog(req.body);
        const result = await blog.save();

        res.status(201).json({
            blog: result,
            message: "blog created successfully",
        });
    }),
);

export default router;
