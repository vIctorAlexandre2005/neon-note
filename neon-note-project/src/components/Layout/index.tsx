import { useTheme } from "../ThemeDark"
import { NoteHeader } from "./Header/header";
import { Sidebar } from "./Sidebar/sidebar";

interface LayoutProps {
    children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
    const { darkMode } = useTheme();
    return (
        <div className={`flex flex-col h-screen ${darkMode ? "bg-slate-900" : "bg-neon-50"}`}>
            <NoteHeader />
            <div className="flex h-full">
                <div className="sidebar flex-none w-56">
                    <Sidebar darkMode={darkMode} />
                </div>

                <div className={`flex-1 ${darkMode ? "bg-slate-900" : "bg-neon-50"}`}>
                    {children}
                </div>
            </div>
        </div>
    )
}