import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Router } from "express";
import User from "../models/user.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { createLogger } from "../utils/logger.js";
import { config } from "../utils/config.js";

const authRouter = Router();
const SALT_ROUNDS = 10;

const logger = createLogger("auth-controller");

authRouter.post(
    "/signup",
    asyncHandler(async (req, res) => {
        const { username, name, password } = req.body;

        if (!username || !password || !name) {
            return res.status(400).json({ message: "username, name and password are required" });
        }

        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(409).json({ message: "username already taken, try a different one" });
        }

        const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
        const user = await User.create({ username, name, passwordHash });

        logger.info(`signed up: ${user.username}`);

        res.status(201).json({ message: "signup successful" });
    }),
);

authRouter.post(
    "/login",
    asyncHandler(async (req, res) => {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "username and password are required" });
        }

        const user = await User.findOne({ username });
        const isValidPassword = user && (await bcrypt.compare(password, user.passwordHash));

        if (!isValidPassword) {
            return res.status(401).json({ message: "invalid username or password" });
        }

        const token = jwt.sign({ sub: user.id, username: user.username }, config.JWT_SECRET, {
            expiresIn: config.JWT_EXPIRES_IN,
        });

        logger.info(`logged in: ${user.username}`);

        res.status(200).json({ token, user: { id: user.id, username: user.username, name: user.name } });
    }),
);

export default authRouter;
