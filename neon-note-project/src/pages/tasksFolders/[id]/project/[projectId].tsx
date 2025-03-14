import { TaskComponent } from '@/components/Task/View';
import { useTaskProjects } from '@/components/Task/hook/useTaskProjects/useTaskProjects';
import { useTaskSidebarAllFolders } from '@/components/Task/hook/useFolders/useTaskSidebarAllFolders';
import { useContextGlobal } from '@/Context';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function MainPageProject() {
  const router = useRouter();
  const { darkMode } = useContextGlobal();

  const { id, projectId } = router.query; // Obtém o ID da pasta e do projeto

  const { listProjects } = useTaskProjects();
  const projectName = listProjects.find(project => project.id === projectId)?.projectName;
  return (
    <div className='w-full h-full overflow-auto p-2'>
      <TaskComponent 
        projectName={projectName} 
      />
    </div>
  );
}
