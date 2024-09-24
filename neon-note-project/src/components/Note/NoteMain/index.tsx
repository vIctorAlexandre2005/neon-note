import { useEffect, useState } from "react";
import { NoteInput } from "./NoteInput";
import { useTheme } from "@/components/ThemeDark";
import { toast } from "react-toastify";
import { useContextNoteData } from "@/components/Context/NoteContext";
import ScaleIn from "@/components/Effects/ScaleIn";

export function NoteMain() {

  const { darkMode } = useTheme();

  return (
    <div className={`${darkMode ? "bg-slate-900" : "bg-neon-100"} w-full rounded-xl h-full flex flex-col p-2`}>
      <ScaleIn>
        <NoteInput />
      </ScaleIn>
    </div>
  );
}
