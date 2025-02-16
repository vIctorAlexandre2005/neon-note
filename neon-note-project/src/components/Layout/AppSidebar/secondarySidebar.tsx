import { SecondarySidebarNoteFolders } from '@/components/Notes/View/AppSecondarySidebarNote/SecondarySidebarNoteFolders';
import { SecondarySidebarTaskFolders } from '@/components/Task/View/AppSecondarySidebarTask/SecondarySidebarTaskFolders';
import { useRouter } from 'next/router';

export function SecondarySidebar() {
  const router = useRouter();

  const includeTaskInRoute = router.pathname.includes('/tasksFolders');

  if (router.pathname === '/') {
    return <SecondarySidebarNoteFolders />;
  };

  if (includeTaskInRoute) {
    const { id } = router.query;
    return <SecondarySidebarTaskFolders id={id} />;
  };
}
