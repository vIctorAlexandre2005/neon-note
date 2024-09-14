import { NoteInputProps } from "@/utils/interface/inputs";

export const NoteInputField: React.FC<NoteInputProps> = ({ value, onChange, placeholder, darkMode }) => {
  return (
    <input
      data-testid="my-input"
      className={`
          border-none
          rounded-md 
          ${darkMode ? "bg-black-950" : "bg-white"} 
          ${darkMode ? "text-white" : "text-black-700"}
          ${darkMode ? "placeholder:text-neon-100" : "placeholder:text-black"} 
          px-4 
          py-2 
          focus:outline-none
          placeholder:text-2xl
          placeholder:text-black-400
          text-2xl
          w-full
        `}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};