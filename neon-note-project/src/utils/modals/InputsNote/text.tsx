import { NoteTextareaProps } from "@/utils/interface/inputs";
import { Textarea } from "@chakra-ui/react";

export const NoteTextareaField: React.FC<NoteTextareaProps> = ({ value, onChange, placeholder, darkMode }) => {
    return (
      <Textarea
        border={"none"}
        resize={"none"}
        h={"20rem"}
        color={darkMode ? 'white' : 'black'}
        _focusVisible={"none"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    );
  };