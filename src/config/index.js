import mongoose from "mongoose";

const MONGO_URI = "mongodb://127.0.0.1:27017/jwt";

export const handleMongoDBConnection = async () => {
	try {
		await mongoose.connect(MONGO_URI);
		console.log("mongodb connection successfull");
	} catch (error) {
		console.log("error==>handleMongoDBConnection", error);
	}
};
