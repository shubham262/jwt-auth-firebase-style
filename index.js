import express from "express";
import cors from "cors";
import { handleMongoDBConnection } from "./src/config/index.js";
import authRoutes from "./src/routes/index.js";
const app = express();
await handleMongoDBConnection();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

app.listen(3001, () => console.log("server started at port 3000"));
