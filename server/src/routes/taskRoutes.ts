import { Router } from "express";
import { createTask, getTasks, updateTaskStatus, getUserTasks } from "../controllers/taskController";
const router = Router();

router.get("/", getTasks);
router.patch("/:taskId/status", updateTaskStatus);
router.post("/", createTask);
router.get("/user/:userId", getUserTasks);


export default router;
