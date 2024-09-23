import { useTheme } from "@/components/ThemeDark";

export const NoteInputField: React.FC = () => {

  const { darkMode } = useTheme();

  return (
    <input
      data-testid="my-input"
      className={`
          border-none
          bg-transparent
          rounded-md 
          ${darkMode ? "text-white" : "text-black-800"}
          px-4 
          py-2 
          focus:outline-none
          placeholder:text-3xl
          ${darkMode ? "placeholder:opacity-50" : "placeholder:opacity-95"}
          text-3xl
          font-semibold
          w-full
      `}
    />
  );
};