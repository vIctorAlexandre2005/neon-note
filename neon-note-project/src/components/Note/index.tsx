import { NoteHeader } from "./NoteHeader";
import { NoteMain } from "./NoteMain";
import { useTheme } from "../ThemeDark";
import { SidebarNote } from "../SidebarNote";
import { useEffect, useState } from "react";
import { useContextNoteData } from "../Context/NoteContext";
import { useContextGlobal } from "../Context";

export function NeonNote() {

  const { activeNote } = useContextNoteData();
  const { darkMode } = useTheme();

  return (
    <div className="flex min-h-full p-4 gap-8">
      <div className="flex-none w-80">
        <SidebarNote />
      </div>

      <div className="flex-1">
        {activeNote ? (
          <NoteMain />
        ) : (
            <div className="flex mt-20 flex-col justify-center items-center">
              <img src="/empty.svg" alt="empty" className="object-cover" height={300} width={300} />
              <h3 className={`${darkMode ? "text-white" : "text-black"} text-xl mt-5`}>Nenhuma nota encontrada ainda.</h3>
            </div>
        )}
      </div>
    </div>
  );
}
