import db from "../models/index.js";
import jwt from "jsonwebtoken";

const { User } = db;

const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "1d",
	});
};

export const registerController = async (req, res) => {
	try {
		const { name, email, password } = req.body || {};

		if (!name || !email || !password) {
			return res
				.status(400)
				.json({ success: false, message: "Please provide all fields" });
		}

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res
				.status(400)
				.json({ success: false, message: "Email is already registered" });
		}

		const user = await User.create({ name, email, password });

		const token = generateToken(user._id);

		res.status(201).json({
			success: true,
			message: "User registered successfully",
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
			},
			token,
		});
	} catch (error) {
		console.error("Registration Error:", error);
		res
			.status(500)
			.json({ success: false, message: "Server Error during registration" });
	}
};

export const loginController = async (req, res) => {
	try {
		const { email, password } = req.body || {};

		if (!email || !password) {
			return res
				.status(400)
				.json({ success: false, message: "Please provide email and password" });
		}

		const user = await User.findOne({ email }).select("+password");
		if (!user) {
			return res
				.status(401)
				.json({ success: false, message: "Invalid credentials" });
		}

		const isMatch = await user.comparePassword(password);
		if (!isMatch) {
			return res
				.status(401)
				.json({ success: false, message: "Invalid credentials" });
		}

		const token = generateToken(user._id);

		res.status(200).json({
			success: true,
			message: "Logged in successfully",
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
			},
			token,
		});
	} catch (error) {
		console.error("Login Error:", error);
		res
			.status(500)
			.json({ success: false, message: "Server Error during login" });
	}
};
