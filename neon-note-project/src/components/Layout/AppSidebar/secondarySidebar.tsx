import { SecondarySidebarNoteFolders } from '@/components/Notes/View/AppSecondarySidebarNote/SecondarySidebarNoteFolders';
import { SecondarySidebarTaskFolders } from '@/components/Task/View/AppSecondarySidebarTask/SecondarySidebarTaskFolders';
import { mockPastas } from '@/pages/tasks/[id]';
import { useRouter } from 'next/router';


export function SecondarySidebar() {
  const router = useRouter();

  const includeTask = router.pathname.includes('/tasks');

  if (router.pathname === '/') {
    return <SecondarySidebarNoteFolders />;
  };

  if (includeTask) {
    return <SecondarySidebarTaskFolders />;
  };
}
