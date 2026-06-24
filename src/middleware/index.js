import db from "../models/index.js";
import jwt from "jsonwebtoken";

const { User } = db;

export const authCheckMiddleware = async (req, res, next) => {
	try {
		const authorization = req.headers.authorization;
		if (!authorization || !authorization.startsWith("Bearer")) {
			return res.status(403).json({
				message: "Unauthorised User",
			});
		}

		const token = authorization.split(" ")?.[1];
		if (!token) {
			return res.status(403).json({
				message: "Unauthorised User",
			});
		}

		try {
			var decoded = jwt.verify(token, process.env.JWT_SECRET);
		} catch (err) {
			console.log("err", err);
			return res.status(403).json({
				message: "Unauthorised User",
				error: "Token is either expired or invalid",
			});
		}

		const user = await User.findById(decoded?.userId);
		if (!user) {
			return res.status(403).json({
				message: "Invalid token",
				error: "Token is either expired or invalid",
			});
		}
		req.user = user;

		next();
	} catch (error) {
		console.log("error==>authCheckMiddleware", error);
		res.status(500).json({
			message: "Internal Servor error",
			error,
		});
	}
};
