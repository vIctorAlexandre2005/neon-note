import { useTheme } from "@/components/ThemeDark";
import { NoteTextareaField } from "@/utils/modals/InputsNote/text";
import { NoteInputField } from "@/utils/modals/InputsNote/title";
import React, { useState } from "react";
import { toast } from "react-toastify";

export function NoteInput() {
  const { darkMode } = useTheme();

  return (
    <>
      <div className="xs:p-4 sm:p-0 h-full flex gap-4 flex-col">
          <NoteInputField />
          <NoteTextareaField />
      </div>
    </>
  );
}
