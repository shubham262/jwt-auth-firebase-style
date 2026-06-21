import db from "../models/index.js";
import jwt from "jsonwebtoken";
const { User } = db;

export const registerController = async (req, res) => {
	try {
		const { name, email, password } = req.body || {};
		if (!name || !email || !password) {
			return res
				.status(400)
				.json({ message: "Name,email and password is mandatory" });
		}

		const user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({ message: "User already exist" });
		}

		const newUser = await User.create({ name, email, password });

		console.log("JWT_SECRET", process.env.JWT_SECRET);
		const token = jwt.sign(
			{
				userId: newUser?._id,
				name,
				email,
			},
			process.env.JWT_SECRET,
			{ expiresIn: "1h" }
		);

		return res
			.status(201)
			.json({ message: "User created successfully", token, user: newUser });
	} catch (error) {
		console.log("registerController", error);
		res.status(500).json({
			message: "Internal Servor error",
			error,
		});
	}
};

export const loginController = async () => {
	try {
		const { email, password } = req.body || {};
		if (!email || !password) {
			return res
				.status(400)
				.json({ message: "Email and password is mandatory" });
		}

		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({ message: "User does not exist" });
		}

		const validate = await user.comparePassword(password);
		if (!validate) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		const token = jwt.sign(
			{
				userId: user?._id,
				name: user?.name,
				email: user?.email,
			},
			process.env.JWT_SECRET,
			{ expiresIn: "1h" }
		);

		return res
			.status(201)
			.json({ message: "User fetched successfully", token, user });
	} catch (error) {
		console.log("registerloginControllerController", error);
		res.status(500).json({
			message: "Internal Servor error",
			error,
		});
	}
};
