"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskStatus = exports.createTask = exports.getUserTasks = exports.getTasks = void 0;
const client_1 = require("@prisma/client");
const prismaClient = new client_1.PrismaClient();
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectId } = req.query;
    try {
        const tasks = yield prismaClient.task.findMany({
            where: {
                projectId: Number(projectId),
            },
            include: {
                author: true,
                assignee: true,
                attachments: true,
                comments: true,
            },
        });
        res.status(200).json(tasks);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getTasks = getTasks;
const getUserTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    if (!userId) {
        res.status(400).json({ message: "User ID is required" });
        return;
    }
    const parsedUserId = parseInt(userId);
    try {
        const tasks = yield prismaClient.task.findMany({
            where: {
                OR: [{ authorUserId: parsedUserId }, { assignedUserId: parsedUserId }],
            },
            include: {
                author: true,
                assignee: true,
            },
        });
        console.log("Found tasks:", tasks.length); // Debug log
        res.json(tasks);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: `Error retrieving user's tasks: ${error.message}` });
    }
});
exports.getUserTasks = getUserTasks;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, status, priority, tags, startDate, dueDate, points, projectId, authorUserId, assignedUserId, } = req.body;
    try {
        const newTask = yield prismaClient.task.create({
            data: {
                title,
                description,
                status,
                priority,
                tags,
                startDate,
                dueDate,
                points,
                projectId,
                authorUserId,
                assignedUserId,
            },
        });
        res.status(201).json(newTask);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.createTask = createTask;
const updateTaskStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskId } = req.params;
    const { status } = req.body;
    try {
        const updatedTask = yield prismaClient.task.update({
            where: { id: Number(taskId) },
            data: { status },
        });
        res.status(200).json(updatedTask);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updateTaskStatus = updateTaskStatus;
