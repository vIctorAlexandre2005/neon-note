interface SidebarProps {
    darkMode: boolean;
}

export function Sidebar({ darkMode }: SidebarProps) {
    return (
        <div className={` ${darkMode ? 'bg-slate-950' : 'bg-neon-50'} flex-none w-full h-full`}>
            <p className={`${darkMode ? 'text-white' : 'text-black'}`}>sidebarsidebarsidebarsidebarsidebarsidebar</p>
        </div>
    )
}