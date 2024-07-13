import { NoteInputProps } from "@/utils/interface/inputs";

export const NoteInputField: React.FC<NoteInputProps> = ({ value, onChange, placeholder, darkMode }) => {
    return (
      <input
        className={`
          border-none
          rounded-md 
          ${darkMode ? "bg-black-950" : "bg-white"} 
          ${darkMode ? "text-white" : "text-black-700"} 
          ${darkMode ? "placeholder:text-neon-100" : "placeholder:text-black"} 
          px-4 
          py-2 
          focus:outline-none
          placeholder:text-8xl
          text-8xl
          w-full
        `}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    );
  };