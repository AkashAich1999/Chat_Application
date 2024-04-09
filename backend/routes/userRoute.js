import express from "express";
import { Register } from "../controllers/userController.js";
import { Login } from "../controllers/userController.js";
import { Logout } from "../controllers/userController.js";

const router = express.Router();

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/logout").get(Logout);

export default router;