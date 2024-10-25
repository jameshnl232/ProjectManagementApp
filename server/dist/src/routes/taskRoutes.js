"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskController_1 = require("../controllers/taskController");
const router = (0, express_1.Router)();
router.get("/", taskController_1.getTasks);
router.patch("/:taskId/status", taskController_1.updateTaskStatus);
exports.default = router;