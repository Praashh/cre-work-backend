import express from "express";
import {
  Auth,
  Login,
  Register,
  getMyDetails,
  logout,
} from "../controllers/user";
import { isAuthenticated } from "../middleware/auth";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.post("/logout", logout);
router.get("/auth", Auth)
router.get("/me",isAuthenticated,getMyDetails);
export default router;