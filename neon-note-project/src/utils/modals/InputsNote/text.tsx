import { NoteTextareaProps } from "@/utils/interface/inputs";
import { Textarea } from "@chakra-ui/react";

export const NoteTextareaField: React.FC<NoteTextareaProps> = ({ value, onChange, placeholder, darkMode }) => {

  /*
  Necessitei utilizar o Textarea do Chakra, 
  pois o tailwind não estava reconhecendo o resize-none e demais propriedades.
  */

  return (
    <Textarea
      w={"100%"}
      h={"100%"}
      border={"none"}
      resize={"none"}
      _focus={{
        outline: 0,
      }}
      _focusVisible={"none"}
      color={darkMode ? 'white' : 'text-black-700'}
      fontSize={"1rem"}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};