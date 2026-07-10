import jwt from "jsonwebtoken";
import { config } from "../utils/config.js";

export default function auth(req, res, next) {
    const authorization = req.get("authorization");

    if (!authorization?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "missing or invalid token" });
    }

    try {
        const jwtPayload = jwt.verify(authorization.substring(7), config.JWT_SECRET);
        req.user = {
            id: jwtPayload.sub,
            username: jwtPayload.username,
        };
        next();
    } catch {
        return res.status(401).json({ message: "invalid or expired token" });
    }
}
