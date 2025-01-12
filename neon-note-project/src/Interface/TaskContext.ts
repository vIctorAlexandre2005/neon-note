import { Dispatch, SetStateAction } from "react";

export interface ListFoldersTask {
    name: string;
    id: number;
}

export interface TaskContextData {
    tasksFolders: ListFoldersTask[];
    setTasksFolders: (folders: ListFoldersTask[]) => void;
    newTaskFolderName: string;
    setNewTaskFolderName: Dispatch<SetStateAction<string>>;
    isLoadingTaskFolder: boolean;
    setIsLoadingTaskFolder: Dispatch<SetStateAction<boolean>>;
    selectedTaskFolder: number | null;
    setSelectedTaskFolder: Dispatch<SetStateAction<number | null>>;
}

export const defaultValueTaskContextData: TaskContextData = {
    tasksFolders: [],
    setTasksFolders: () => {},
    newTaskFolderName: '',
    setNewTaskFolderName: () => {},
    isLoadingTaskFolder: false,
    setIsLoadingTaskFolder: () => {},
    selectedTaskFolder: null,
    setSelectedTaskFolder: () => {},
};
