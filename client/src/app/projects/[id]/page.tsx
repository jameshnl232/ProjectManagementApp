"use client";

import { useState } from 'react'
import ProjectHeader from '../ProjectHeader';
import BoardView from '../BoardView';
import ListView from '../ListView';

type ProjectPageProps = {
  params: {
    id: string;
  };
};

export default function ProjectPage({params}: ProjectPageProps) {

    const {id} = params;

    const [activeTab, setActiveTab] = useState("Board");
    const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

   return (
     <div>
       {/* <ModalNewTask
         isOpen={isModalNewTaskOpen}
         onClose={() => setIsModalNewTaskOpen(false)}
         id={id}
       /> */}
       <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
       {activeTab === "Board" && (
         <BoardView id={id} setIsModalOpen={setIsModalNewTaskOpen} />
       )}
        {activeTab === "List" && (
         <ListView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
       )}
{/*        {activeTab === "Timeline" && (
         <Timeline id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
       )}
       {activeTab === "Table" && (
         <Table id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
       )}  */}
     </div>
   );
}
