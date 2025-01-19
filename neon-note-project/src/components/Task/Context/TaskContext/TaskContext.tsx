import { defaultValueTaskContextData, ListFoldersTask, TaskContextData } from "@/Interface/TaskContext";
import { createContext, ReactNode, useContext, useState } from "react";

const TaskProvider = createContext<TaskContextData>(
    defaultValueTaskContextData
  );
  
  const TaskContext = ({ children }: { children: ReactNode }) => {
    
    const [tasksFolders, setTasksFolders] = useState<ListFoldersTask[]>([]); // Lista de pastas
    const [isLoadingTaskFolder, setIsLoadingTaskFolder] = useState<boolean>(false); // Indica se as pastas estao sendo carregadas
    const [newTaskFolderName, setNewTaskFolderName] = useState<string>(''); // Nome da nova pasta criada
    const [selectedTaskFolder, setSelectedTaskFolder] = useState<number | null>(null); // Pasta selecionada
    const [openFixedFolders, setOpenFixedFolders] = useState<boolean>(false); // Indica se as pastas fixas estao abertas
    const [openNotFixedFolders, setOpenNotFixedFolders] = useState<boolean>(false); // Indica se as pastas nao fixas estao abertas
  
    return (
      <TaskProvider.Provider
        value={{
          tasksFolders,
          setTasksFolders,
          isLoadingTaskFolder,
          setIsLoadingTaskFolder,
          newTaskFolderName,
          setNewTaskFolderName,
          selectedTaskFolder,
          setSelectedTaskFolder,
          openFixedFolders,
          setOpenFixedFolders,
          openNotFixedFolders,
          setOpenNotFixedFolders
        }}
      >
        {children}
      </TaskProvider.Provider>
    );
  };
  
  export const useContextTaskData = () => useContext(TaskProvider);
  export default TaskContext;
  