import { navigateListSidebar } from '@/utils/navigateListSidebar';
import { useRouter } from 'next/router';

interface SidebarProps {
  darkMode: boolean;
}
export function Sidebar({ darkMode }: SidebarProps) {
  const router = useRouter();
  return (
    <div className={`flex-none w-full`}>
      <div className={`flex-col mt-6 gap-4 flex`}>
        {navigateListSidebar.map(item => (
          <div
            className={`
              ${router.pathname === item.link ? 'bg-neon-500 text-white' : 'bg-transparent'}
              ${darkMode ? 'bg-neon-600 bg-opacity-35 text-neon-400' : ''}
              transition duration-300 
              hover:bg-neon-400  
              hover:text-white 
              text-center 
              w-full 
              rounded-e-xl 
              flex gap-2
              items-center justify-center
              p-2 cursor-pointer
            `}
            key={`${item.name}`}
            onClick={() => router.push(item.link)}
          >
            <a
              className={`
                text-center 
                items-center 
                justify-center 
                flex gap-2
                text-md
              `}
              key={item.name}
            >
              <item.icon size={20} />
            </a>
            <p className='flex xs:hidden'>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
