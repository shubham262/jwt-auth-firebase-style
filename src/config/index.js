import mongoose from "mongoose";

export const handleMongoDbConnection = async () => {
	try {
		await mongoose.connect("mongodb://127.0.0.1:27017/jwt");
		console.log("mongo db connection successfull");
	} catch (error) {
		console.log("error connectipn db", error);
	}
};
