import { Router } from "express";
import User from "../models/user.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.get(
    "/",
    asyncHandler(async (req, res) => {
        const users = await User.find({});
        res.json(users);
    }),
);

export default router;
