import { NoteHeader } from "./NoteHeader";
import { NoteMain } from "./NoteMain";
import { useTheme } from "../ThemeDark";
import { SidebarNote } from "../SidebarNote";
import { useEffect, useState } from "react";

export function NeonNote() {

  return (
    <div className="flex min-h-full pl-4 pt-4 gap-8">
      <div className="flex-none w-80">
        <SidebarNote />
      </div>

      <div className="flex-1">
        <NoteMain />
      </div>
    </div>
  );
}
