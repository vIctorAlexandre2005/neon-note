import { TaskComponent } from '@/components/Task/View';
import { useTaskSidebarAllFolders } from '@/components/Task/ViewModel/useTaskSidebarAllFolders';
import { useContextGlobal } from '@/Context';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function MainPageProject() {
  const router = useRouter();
  const { darkMode } = useContextGlobal();

  const { id, projectId } = router.query; // Obtém o ID da pasta e do projeto

  const { mockArray } = useTaskSidebarAllFolders();
  
  const project = mockArray.find(pasta => pasta.projects.find(project => project.id === projectId));

  console.log(project);

  if (!projectId) {
    return <p>Projeto não encontrado.</p>;
  }

  return (
    <div className='w-full h-full p-6'>
      <TaskComponent 
        projectName={
          project?.projects.find(project => project.id === projectId)?.projectName
        } 
      />
    </div>
  );
}
