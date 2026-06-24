import db from "../models/index.js";
import jwt from "jsonwebtoken";

const { User } = db;
export const registerController = async (req, res) => {
	try {
		const { name, email, password } = req.body || {};

		if (!name || !email || !password) {
			return res.status(400).json({
				message: "Name,email and password is mandatory",
			});
		}

		const user = await User.findOne({ email });

		if (user) {
			return res.status(400).json({
				message: "User already exist with the given  email",
			});
		}

		const newUser = await User.create({
			name,
			email,
			password,
		});

		const token = jwt.sign(
			{
				name,
				email,
				userId: newUser?._id,
			},
			process.env.JWT_SECRET,
			{ expiresIn: "1h" }
		);

		return res.status(201).json({
			message: "User got created",
			user: {
				name,
				email,
				userId: newUser?._id,
			},
			token,
		});
	} catch (error) {
		console.log("error==>registerController", error);
		res.status(500).json({
			message: "Internal Servor error",
			error,
		});
	}
};
export const loginController = async (req, res) => {
	try {
		const { email, password } = req.body || {};

		if (!email || !password) {
			return res.status(400).json({
				message: "Email and password is mandatory",
			});
		}

		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({
				message: "User does not exist with the given  email",
			});
		}

		const validate = await user.comparePassword(password);

		if (!validate) {
			return res.status(400).json({
				message: "Invalid credential",
			});
		}

		const token = jwt.sign(
			{
				name: user.name,
				email: user?.email,
				userId: user?._id,
			},
			process.env.JWT_SECRET,
			{ expiresIn: "1h" }
		);

		return res.status(200).json({
			message: "Authenticated",
			user: {
				name: user.name,
				email: user?.email,
				userId: user?._id,
			},
			token,
		});
	} catch (error) {
		console.log("error==>loginController", error);
		res.status(500).json({
			message: "Internal Servor error",
			error,
		});
	}
};
export const dashboardController = async (req, res) => {
	try {
		const user = req?.user || {};

		return res.status(200).json({
			message: "testing done",
		});
	} catch (error) {
		console.log("error==>dashboardController", error);
		res.status(500).json({
			message: "Internal Servor error",
			error,
		});
	}
};
