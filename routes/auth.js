import express from "express";
import { register, login, refreshToken } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/token", refreshToken);

export default router;
