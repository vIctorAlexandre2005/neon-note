import { navigateListSidebar } from '@/utils/navigateListSidebar';
import { handleNavigation } from '@/utils/navigationProgress';
import { useRouter } from 'next/router';

interface SidebarProps {
  darkMode: boolean;
}
export function Sidebar({ darkMode }: SidebarProps) {
  const router = useRouter();
  return (
    <div
      className={`flex-none fixed h-full w-24 ${darkMode ? 'bg-slate-900 border-r-2 border-slate-800' : 'bg-neon-500'}`}
    >
      <div className={`flex-col mt-6 gap-4 flex`}>
        {navigateListSidebar.map(item => (
          <div
            className={`
              transition duration-300 
              text-center 
              w-auto
              rounded-e-xl 
              flex gap-2
              items-center justify-center
              p-2 cursor-pointer
            `}
            key={`${item.name}`}
            onClick={() => handleNavigation(router, item.link)}
          >
            <div
              className={`
                  ${
                    router.pathname === item.link
                      ? darkMode
                        ? 'bg-blue-900 bg-opacity-40 text-white p-2 flex justify-center rounded-full'
                        : 'bg-blue-950 bg-opacity-50 text-white p-2 flex justify-center rounded-full'
                      : 'bg-transparent hover:bg-blue-950 hover:bg-opacity-40 p-2 rounded-full transition duration-300 text-white'
                  }
                `}
            >
              <item.icon size={24} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
