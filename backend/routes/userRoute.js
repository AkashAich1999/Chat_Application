import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { Register, Login, Logout, getOtherUsers } from "../controllers/userController.js";

const router = express.Router();

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/logout").get(Logout);
router.route("/").get(isAuthenticated, getOtherUsers);

export default router;