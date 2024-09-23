import { useEffect, useState } from "react";
import { NoteInput } from "./NoteInput";
import { useTheme } from "@/components/ThemeDark";
import { toast } from "react-toastify";
import { NoteTextareaField } from "@/utils/modals/InputsNote/text";
import { NoteInputField } from "@/utils/modals/InputsNote/title";

export function NoteMain() {

  const { darkMode } = useTheme();

  return (
    <div className={`${darkMode ? "bg-slate-900" : "bg-neon-100"} w-full rounded-xl h-full flex flex-col p-2`}>
      <NoteInput />
      {/* {noteList.length === 0 && (
        <div className="flex mt-20 flex-col justify-center items-center">
          <img src="/empty.svg" alt="empty" className="object-cover" height={300} width={300} />
          <h3 className={`${darkMode ? "text-white" : "text-black"} text-xl mt-5`}>Nenhuma nota encontrada ainda.</h3>
        </div>
      )} */}
    </div>
  );
}
