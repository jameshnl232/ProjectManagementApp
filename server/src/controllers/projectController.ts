import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export const getProjects = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const projects = await prismaClient.project.findMany();
    res.status(200).json(projects);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, description, startDate, endDate } = req.body;

try{
    const newProject = await prismaClient.project.create({
        data: {
            name,
            description,
            startDate,
            endDate
        }
    });
    res.status(201).json(newProject);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};


