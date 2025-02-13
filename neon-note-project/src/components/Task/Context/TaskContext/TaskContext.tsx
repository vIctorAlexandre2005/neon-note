import { defaultValueTaskContextData, ListFoldersTask, ListFoldersTaskFixed, TaskContextData } from "@/Interface/TaskContext";
import { mockPastas, MockProps, ProjectProps } from "@/utils/mockFolders";
import { createContext, ReactNode, useContext, useState } from "react";

const TaskProvider = createContext<TaskContextData>(
    defaultValueTaskContextData
  );
  
  const TaskContext = ({ children }: { children: ReactNode }) => {
    
    const [tasksAllFolders, setAllTasksFolders] = useState<ListFoldersTask[]>([]); // Lista de pastas
    const [tasksFixedFolders, setTasksFixedFolders] = useState<ListFoldersTaskFixed[]>([]); // Lista de pastas fixas
    const [newTaskFolderName, setNewTaskFolderName] = useState<string>(''); // Nome da nova pasta criada
    const [editedTaskFolderName, setEditedTaskFolderName] = useState<string>(''); // Nome da pasta editada

    const [isLoadingTaskFolder, setIsLoadingTaskFolder] = useState<boolean>(false); // Indica se as pastas estao sendo carregadas
    
    const [selectedTaskFolder, setSelectedTaskFolder] = useState<string | null>(null); // Pasta selecionada
    const [openFixedFolders, setOpenFixedFolders] = useState<boolean>(false); // Indica se as pastas fixas estao abertas
    const [openNotFixedFolders, setOpenNotFixedFolders] = useState<boolean>(true); // Indica se as pastas nao fixas estao abertas
    const [newTaskProjectName, setNewTaskProjectName] = useState<string | null>(null); //nome do projeto a ser criado
    const [mockArray, setMockArray] = useState<MockProps[]>(mockPastas);
    const mapListProject = mockArray.map(folder => folder.projects.map(project => project));
    console.log('mapListProject', mapListProject);
    const [listProjects, setListProjects] = useState<ProjectProps[]>(mapListProject.flat() || []);    
    return (
      <TaskProvider.Provider
        value={{
          tasksAllFolders,
          setAllTasksFolders,
          tasksFixedFolders,
          setTasksFixedFolders,
          isLoadingTaskFolder,
          setIsLoadingTaskFolder,
          newTaskFolderName,
          setNewTaskFolderName,
          selectedTaskFolder,
          setSelectedTaskFolder,
          openFixedFolders,
          setOpenFixedFolders,
          openNotFixedFolders,
          setOpenNotFixedFolders,
          editedTaskFolderName,
          setEditedTaskFolderName,
          newTaskProjectName,
          setNewTaskProjectName,
          listProjects,
          setListProjects,
          mockArray,
          setMockArray
        }}
      >
        {children}
      </TaskProvider.Provider>
    );
  };
  
  export const useContextTaskData = () => useContext(TaskProvider);
  export default TaskContext;
  