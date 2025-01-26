import { Dispatch, SetStateAction } from "react";

export interface ListFoldersTaskFixed {
    name: string;
    id: number;
}

export interface ListFoldersTask {
    name: string;
    id: number;
}

export interface TaskContextData {
    tasksAllFolders: ListFoldersTask[];
    setAllTasksFolders: Dispatch<SetStateAction<ListFoldersTask[]>>;
    tasksFixedFolders: ListFoldersTaskFixed[];
    setTasksFixedFolders: Dispatch<SetStateAction<ListFoldersTaskFixed[]>>;
    newTaskFolderName: string;
    setNewTaskFolderName: Dispatch<SetStateAction<string>>;
    isLoadingTaskFolder: boolean;
    setIsLoadingTaskFolder: Dispatch<SetStateAction<boolean>>;
    selectedTaskFolder: number | null;
    setSelectedTaskFolder: Dispatch<SetStateAction<number | null>>;

    openFixedFolders: boolean;
    setOpenFixedFolders: Dispatch<SetStateAction<boolean>>;
    openNotFixedFolders: boolean;
    setOpenNotFixedFolders: Dispatch<SetStateAction<boolean>>;
}

export const defaultValueTaskContextData: TaskContextData = {
    tasksAllFolders: [],
    setAllTasksFolders: () => {},
    tasksFixedFolders: [],
    setTasksFixedFolders: () => {},
    newTaskFolderName: '',
    setNewTaskFolderName: () => {},
    isLoadingTaskFolder: false,
    setIsLoadingTaskFolder: () => {},
    selectedTaskFolder: null,
    setSelectedTaskFolder: () => {},
    openFixedFolders: false,
    setOpenFixedFolders: () => {},
    openNotFixedFolders: false,
    setOpenNotFixedFolders: () => {},
};
