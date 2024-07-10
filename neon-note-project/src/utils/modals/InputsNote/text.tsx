import { NoteTextareaProps } from "@/utils/interface/inputs";

export const NoteTextareaField: React.FC<NoteTextareaProps> = ({ value, onChange, placeholder, darkMode }) => {
    return (
      <textarea
        className={`
          border-none
          rounded-md 
          ${darkMode ? "bg-black-950" : "bg-white"} 
          ${darkMode ? "text-white" : "text-black-700"} 
          ${darkMode ? "placeholder:text-neon-100" : "placeholder:text-black"} 
          px-4 
          py-2 
          focus:outline-none
          w-full
          resize-none
          h-60
        `}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    );
  };