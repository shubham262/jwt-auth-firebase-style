import express from "express";
import { registerController, loginController } from "../controller/index.js";
import { authCheck } from "../middleware/index.js";
const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);

export default router;
