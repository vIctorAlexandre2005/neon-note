import { SecondarySidebarNoteFolders } from '@/components/Notes/View/AppSecondarySidebarNote/SecondarySidebarNoteFolders';
import { SecondarySidebarTaskFolders } from '@/components/Task/View/AppSecondarySidebarTask/SecondarySidebarTaskFolders';
import { useRouter } from 'next/router';

interface SidebarProps {
  darkMode: boolean;
}

export function SecondarySidebar({ darkMode }: SidebarProps) {
  const router = useRouter();

  if (router.pathname === '/') {
    return <SecondarySidebarNoteFolders />;
  };

  if (router.pathname === '/tasks') {
    return <SecondarySidebarTaskFolders />;
  };
}
