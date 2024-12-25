import { defaultValueTaskContextData, ListFoldersTask, TaskContextData } from "@/Interface/TaskContext";
import { createContext, ReactNode, useContext, useState } from "react";

const TaskProvider = createContext<TaskContextData>(
    defaultValueTaskContextData
  );
  
  const TaskContext = ({ children }: { children: ReactNode }) => {
    
    const [foldersTasks, setFoldersTasks] = useState<ListFoldersTask>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
  
    return (
      <TaskProvider.Provider
        value={{
            foldersTasks,
        }}
      >
        {children}
      </TaskProvider.Provider>
    );
  };
  
  export const useContextTaskData = () => useContext(TaskProvider);
  export default TaskContext;
  