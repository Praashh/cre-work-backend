import express from "express"
import userRouter from "./user";
import taskRouter from "./task"
const router = express.Router();
router.use("/user", userRouter);
router.use('/task', taskRouter)
export default router;