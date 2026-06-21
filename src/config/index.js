import mongoose from "mongoose";

const mongoUri = "mongodb://127.0.0.1:27017/jwt";
export const handleMongoDbConnection = async () => {
	try {
		await mongoose.connect(mongoUri);
		console.log("Database connected");
	} catch (error) {
		console.log("Database connecttion error==>", error);
	}
};
