import { useRouter } from 'next/router';
import { SidebarHome } from './sidebarHome/sidebarHome';
import { SidebarTasks } from './sidebarTasks/sidebarTasks';

interface SidebarProps {
  darkMode: boolean;
}

export function SecondarySidebar({ darkMode }: SidebarProps) {
  const router = useRouter();

  if (router.pathname === '/') {
    return <SidebarHome />;
  };

  if (router.pathname === '/tasks') {
    return <SidebarTasks />;
  };
}
