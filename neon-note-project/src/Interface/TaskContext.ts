import { MockProps, ProjectProps } from "@/utils/mockFolders";
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
    editedTaskFolderName: string;
    setEditedTaskFolderName: Dispatch<SetStateAction<string>>;
    isLoadingTaskFolder: boolean;
    setIsLoadingTaskFolder: Dispatch<SetStateAction<boolean>>;
    selectedTaskFolder: string | null;
    setSelectedTaskFolder: Dispatch<SetStateAction<string | null>>;
    newTaskProjectName: string | null;
    setNewTaskProjectName: Dispatch<SetStateAction<string | null>>;
    openFixedFolders: boolean;
    setOpenFixedFolders: Dispatch<SetStateAction<boolean>>;
    openNotFixedFolders: boolean;
    setOpenNotFixedFolders: Dispatch<SetStateAction<boolean>>;
    listProjects: ProjectProps[];
    setListProjects: Dispatch<SetStateAction<ProjectProps[]>>;
    mockArray: MockProps[];
    setMockArray: Dispatch<SetStateAction<MockProps[]>>;
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
    selectedTaskFolder: '',
    setSelectedTaskFolder: () => {},
    openFixedFolders: false,
    setOpenFixedFolders: () => {},
    openNotFixedFolders: false,
    setOpenNotFixedFolders: () => {},
    editedTaskFolderName: '',
    setEditedTaskFolderName:() => {},
    newTaskProjectName: '',
    setNewTaskProjectName: () => {},
    listProjects: [],
    setListProjects: () => {},
    mockArray: [],
    setMockArray: () => {},
};
