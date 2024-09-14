import { useState, useEffect } from "react";
import { EditNote } from "@/utils/modals/editNote/modal";
import { Box } from "@chakra-ui/react";
import { PropsEditModal } from "@/utils/interface";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from "@/components/ThemeDark";

export function ModalIdx({ onClose, open, note, onSave }: PropsEditModal) {
  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);
  const { darkMode } = useTheme();

  useEffect(() => {
    setTitle(note.title);
    setText(note.text);
  }, [note]);

  const handleSave = () => {
    if (title.trim() && text.trim()) {
      onSave({ title, text });
      toast.success('Nota editada com sucesso!', {
        autoClose: 2000,
        closeOnClick: true,
        theme: darkMode ? "dark" : "light",
        pauseOnHover: true,
        draggable: true,
        hideProgressBar: true,
      });
    } else {
      toast.error('O campo de título ou texto estão vazios.', {
        autoClose: 2000,
        closeOnClick: true,
        theme: darkMode ? "dark" : "light",
        pauseOnHover: true,
        draggable: true,
        hideProgressBar: true,
      });
    };
  };

  return (
    <Box w={"100%"} h={"100%"} display={"flex"}>
      <EditNote
        handleSave={handleSave}
        open={open}
        setText={setText}
        setTitle={setTitle}
        text={text}
        title={title}
        onClose={onClose}
      />
    </Box>
  );
}
