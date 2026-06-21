import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Name is required"],
			trim: true,
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			trim: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: [true, "Password is required"],
			trim: true,
		},
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model("User", userSchema);
export default User;
