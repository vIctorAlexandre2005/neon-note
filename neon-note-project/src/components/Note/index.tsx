import { NoteHeader } from "./NoteHeader";
import { NoteMain } from "./NoteMain";
import { useTheme } from "../ThemeDark";

export function NeonNote() {
  const { darkMode } = useTheme();
  return (
    <div className={`${darkMode ? "bg-black-900" : "bg-neon-50"} h-screen`}>
      <header>
        <NoteHeader />
      </header>

      <main className="bg-black-950">
        <NoteMain />
      </main>
    </div>
  );
}
