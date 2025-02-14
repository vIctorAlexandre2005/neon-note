interface SubTasks {
  id: string;
  title: string;
  description: string;
  subTaskCreatedDate: Date;
};

export interface StatusTasksFromProjectProps {
  id: string;
  title: string;
  description?: string;
  totalTasksThisStatus: number;
  progressTask: number;
  subTasks?: SubTasks[];
  taskCreatedDate: string | undefined;
  label?: string;
};

export interface ProjectTasksPropsStatus {
  toStart: StatusTasksFromProjectProps[];
  inProgress: StatusTasksFromProjectProps[];
  finished: StatusTasksFromProjectProps[];
};

export interface ProjectTasksProps {
  status: ProjectTasksPropsStatus;
  total: number | null;
}

export interface ProjectProps {
  id: string;
  projectName: string;
  projectTasks: ProjectTasksProps;
};

export interface MockProps {
  id: string;
  folderName: string;
  projects: ProjectProps[];
}

export const mockPastas: MockProps[] = [];
