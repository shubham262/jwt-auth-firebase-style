import jwt from "jsonwebtoken";
import db from "../models/index.js";
const { User } = db;
export const requireSignIn = async (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return res.status(401).json({
				success: false,
				message: "Access Denied. No token provided.",
			});
		}

		const token = authHeader.split(" ")[1];

		const decoded = jwt.verify(
			token,
			process.env.JWT_SECRET || "fallback_super_secret_key"
		);

		const user = await User.findById(decoded.id).select("-password");

		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User belonging to this token no longer exists.",
			});
		}

		req.user = user;

		next();
	} catch (error) {
		console.error("Auth Middleware Error:", error.message);
		return res.status(401).json({
			success: false,
			message: "Invalid or Expired Token.",
		});
	}
};
