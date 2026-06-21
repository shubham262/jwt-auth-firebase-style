import mongoose from "mongoose";
import bcrypt from "bcryptjs";
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
			unique: true,
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

userSchema.pre("save", async function () {
	if (!this.isModified("password")) return;

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (candiatePassword) {
	return await bcrypt.compare(candiatePassword, hash);
};

const User = mongoose.model("User", userSchema);
export default User;
