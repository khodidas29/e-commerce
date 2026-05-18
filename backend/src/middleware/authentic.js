import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../controllers/user.controller.js";

export const authenticate = (req, res, next) => {

    try {

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "Unauthorized! token is missing"
            });
        }

        if (!authHeader.startsWith("Bearer")) {
            return res.status(401).json({
                message: "Unauthorized! invalid token format"
            });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized! token not found"
            });
        }

        const decoded = jwt.verify(token, JWT_SECRET_KEY);

        req.userId = decoded.userId;

        next();

    } catch (error) {

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                message: "Token expired"
            });
        }

        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                message: "Invalid token"
            });
        }

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};