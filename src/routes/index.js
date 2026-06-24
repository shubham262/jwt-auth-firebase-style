import express from "express";
import { dashboardController, loginController, registerController } from "../controllers/index.js";
import { authCheckMiddleware } from "../middleware/index.js";
const router = express.Router();
router.post("/register", registerController);
router.post("/login", loginController);
router.get("/dashboard", authCheckMiddleware, dashboardController);

export default router;
