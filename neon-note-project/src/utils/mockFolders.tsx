export interface MockProps {
  id: string;
  folderName: string;
  projects: [
    {
      id: string;
      projectName: string;
    },
  ];
}

export const mockPastas: MockProps[] = [];
