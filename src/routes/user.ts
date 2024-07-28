import express from "express";
import {
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
router.get("/me",isAuthenticated,getMyDetails);
export default router;