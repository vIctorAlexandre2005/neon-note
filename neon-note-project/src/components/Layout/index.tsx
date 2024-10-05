import { useEffect } from "react";
import { useTheme } from "../ThemeDark"
import { NoteHeader } from "./Header/header";
import { Sidebar } from "./Sidebar/sidebar";

interface LayoutProps {
    children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
    const { darkMode, setDarkMode } = useTheme();

    useEffect(() => {
        const darkModeItem = localStorage.getItem("darkMode");
        if (darkModeItem) {
            setDarkMode(JSON.parse(darkModeItem));
        };
      }, []);

    return (
        <div className={`flex flex-col w-full h-screen ${darkMode ? "bg-slate-900" : "bg-neon-50"}`}>
            <NoteHeader />
            <div className="flex h-full gap-4">
                <div className="sidebar flex-none xs:hidden md:flex md:w-24 lg:w-56">
                    <Sidebar darkMode={darkMode} />
                </div>

                <div className={`flex-1 w-full ${darkMode ? "bg-slate-900" : "bg-neon-50"}`}>
                    {children}
                </div>
            </div>
        </div>
    );
};