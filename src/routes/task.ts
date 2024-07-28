import express from "express";
import { createTask, deleteTask, getMyTask, updateTask } from "../controllers/task";
import { isAuthenticated } from "../middleware/auth";
const router = express.Router();

router.post('/create',isAuthenticated, createTask);
router.get("/mytask",isAuthenticated, getMyTask)
router.route("/:id").put(isAuthenticated,updateTask).delete(isAuthenticated,deleteTask)

export default router;