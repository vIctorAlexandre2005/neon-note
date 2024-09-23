import { useTheme } from "@/components/ThemeDark";
import { Textarea } from "@chakra-ui/react";

export const NoteTextareaField: React.FC = () => {

  const { darkMode } = useTheme();

  return (
    <textarea
      className={`
      border-none
      resize-none
      bg-transparent
      w-full
      h-full
      px-4 
      text-lg
      py-2 
      ${darkMode ? "text-white" : "text-black-700"}
      focus:outline-none  
      ${darkMode ? "placeholder:opacity-50" : "placeholder:opacity-95"}
      `}
      data-testid="my-textarea"
    />
  );
};