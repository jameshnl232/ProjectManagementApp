import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  const { projectId } = req.query;
  try {
    const tasks = await prismaClient.task.findMany({
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
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserTasks = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.params;
  if (!userId) {
    res.status(400).json({ message: "User ID is required" });
    return;
  }
  const parsedUserId = parseInt(userId);

  try {
    const tasks = await prismaClient.task.findMany({
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
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving user's tasks: ${error.message}` });
  }
};

export const createTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
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
  } = req.body;

  try {
    const newTask = await prismaClient.task.create({
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
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTaskStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { taskId } = req.params;
  const { status } = req.body;
  try {
    const updatedTask = await prismaClient.task.update({
      where: { id: Number(taskId) },
      data: { status },
    });
    res.status(200).json(updatedTask);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
