"use client";

import { useGetTasksQuery, useUpdateTaskStatusMutation } from "@/state/api";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskColumn from "./TaskColumn";


type BoardViewProps = {
  id: string;
  setIsModalOpen: (isOpen: boolean) => void;
};

const taskStatus = ["To Do", "Work In Progress", "Under Review", "Completed"];

export default function BoardView({ id, setIsModalOpen }: BoardViewProps) {
  const {
    data: tasks,
    isLoading,
    error,
  } = useGetTasksQuery({ projectId: Number(id) });
  const [updateTaskStatus] = useUpdateTaskStatusMutation();

  console.log(tasks);

  const moveTask = async (taskId: number, toStatus: string) => {
    await updateTaskStatus({ taskId, status: toStatus });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: An error occurred while fetching tasks</div>;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-4">
        {taskStatus.map((status) => (
          <TaskColumn
            key={status}
            status={status}
            moveTask={moveTask}
            tasks={tasks || []}
            setIsModalNewTaskOpen={setIsModalOpen}
          />
        ))}
      </div>
    </DndProvider>
  );
}



