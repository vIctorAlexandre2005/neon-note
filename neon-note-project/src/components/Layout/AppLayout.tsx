import { useEffect } from "react";
import { useTheme } from "../ThemeDark"
import { NoteHeader } from "./AppHeader/header";
import { Sidebar } from "./AppSidebar/sidebar";
import { useRouter } from "next/router";
import { useContextGlobal } from "@/Context";
import { Loader } from "../common/Loader";

interface LayoutProps {
    children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
    const { darkMode, setDarkMode } = useTheme();

    const { user, loading } = useContextGlobal();

    const router = useRouter();

    if (loading) {
        return <Loader />
    };

    if (!user && router.pathname !== "/login") {
        router.push("/login");
        return null;
    };

    useEffect(() => {
        const darkModeItem = localStorage.getItem("darkMode");
        if (darkModeItem) {
            setDarkMode(JSON.parse(darkModeItem));
        };
      }, []);

    return (
        <div className={`flex flex-col w-full h-screen ${darkMode ? "bg-slate-950" : "bg-neon-50"}`}>
            <div className={`${router.pathname === "/login" ? "hidden" : "block"}`}>
                <NoteHeader />
            </div>
            <div className="flex h-full gap-4">
                <div className={`${router.pathname === "/login" ? "hidden" : "flex sidebar flex-none xs:hidden md:flex md:w-24 lg:w-56"}`}>
                    <Sidebar darkMode={darkMode} />
                </div>

                <div className={`flex-1 w-full ${darkMode ? "bg-slate-900" : "bg-neon-50"}`}>
                    {children}
                </div>
            </div>
        </div>
    );
};