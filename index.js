import express from "express";
import { handleMongoDbConnection } from "./src/config/index.js";
import authRoutes from "./src/routes/index.js";
import cors from "cors";
const app = express();
await handleMongoDbConnection();

app.use(cors());

app.use(express.json());
app.use("/api/auth", authRoutes);
app.listen(3001, () => console.log("Server started at port 3001"));
