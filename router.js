import express from "express";
import auth from "./Middleware/auth";
import { index, register, login } from "./controller/page";

const router = express.Router();

//Home
router.get("/", auth, index);

//register
router.post("/register", register);

//login
router.post("/login", login);

export default router;
