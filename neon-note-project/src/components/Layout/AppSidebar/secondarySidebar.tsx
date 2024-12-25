import { SecondarySidebarNoteFolders } from '@/components/Notes/View/AppSecondarySidebarNote/SecondarySidebarNoteFolders';
import { SecondarySidebarTaskFolders } from '@/components/Task/View/AppSecondarySidebarTask/SecondarySidebarTaskFolders';
import { useRouter } from 'next/router';


export function SecondarySidebar() {
  const router = useRouter();

  if (router.pathname === '/') {
    return <SecondarySidebarNoteFolders />;
  };

  if (router.pathname === '/tasks') {
    return <SecondarySidebarTaskFolders />;
  };
}
