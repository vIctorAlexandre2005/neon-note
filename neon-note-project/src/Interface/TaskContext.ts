export interface ListFoldersTask {

}

export interface TaskContextData {
    foldersTasks: ListFoldersTask;
}

export const defaultValueTaskContextData: TaskContextData = {
    foldersTasks: [],
};
