import { Router } from "express";
import { getTasks, updateTaskStatus } from "../controllers/taskController";
const router = Router();

router.get("/", getTasks);
router.patch("/:taskId/status", updateTaskStatus);

export default router;
