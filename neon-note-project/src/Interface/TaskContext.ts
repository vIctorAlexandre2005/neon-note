import { MockProps, ProjectProps, StatusTasksFromProjectProps } from "@/utils/mockFolders";
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
    foldersTask: MockProps[];
    setFoldersTask: Dispatch<SetStateAction<MockProps[]>>;
    
    tasksToStartInProject: StatusTasksFromProjectProps[];
    setTasksToStartInProject: Dispatch<SetStateAction<StatusTasksFromProjectProps[]>>;
    tasksInProgressInProject: StatusTasksFromProjectProps[];
    setTasksInProgressInProject: Dispatch<SetStateAction<StatusTasksFromProjectProps[]>>;
    tasksFinishedInProject: StatusTasksFromProjectProps[];
    setTasksFinishedInProject: Dispatch<SetStateAction<StatusTasksFromProjectProps[]>>;

    nameCreatedTask: string;
    setNameCreatedTask: Dispatch<SetStateAction<string>>;

    descriptionCreatedTask: string;
    setDescriptionCreatedTask: Dispatch<SetStateAction<string>>;
    limitDateToFinishTask: Date;
    setLimitDateToFinishTask: Dispatch<SetStateAction<Date>>;
    levelPriorityTask: string;
    setLevelPriorityTask: Dispatch<SetStateAction<string>>;

    editedNameProject: string;
    setEditedNameProject: Dispatch<SetStateAction<string>>;
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
    foldersTask: [],
    setFoldersTask: () => {},
    tasksToStartInProject: [],
    setTasksToStartInProject: () => {},
    tasksInProgressInProject: [],
    setTasksInProgressInProject: () => {},
    tasksFinishedInProject: [],
    setTasksFinishedInProject: () => {},
    nameCreatedTask: '',
    setNameCreatedTask: () => {},
    descriptionCreatedTask: '',
    setDescriptionCreatedTask: () => {},
    limitDateToFinishTask: new Date,
    setLimitDateToFinishTask: () => {},
    levelPriorityTask: '',
    setLevelPriorityTask: () => {},
    editedNameProject: '',
    setEditedNameProject: () => {},
};
