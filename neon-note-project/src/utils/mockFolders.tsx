export interface ProjectProps {
  id: string;
  projectName: string;
};

export interface MockProps {
  id: string;
  folderName: string;
  projects: ProjectProps[];
}

export const mockPastas: MockProps[] = [];
