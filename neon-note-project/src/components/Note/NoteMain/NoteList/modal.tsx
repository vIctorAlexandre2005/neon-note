import { useState, useEffect } from "react";
import { EditNote } from "@/utils/modals/editNote/modal";
import { Box } from "@chakra-ui/react";
import { PropsEditModal } from "@/utils/interface";

export function ModalIdx({ onClose, open, note, onSave }: PropsEditModal) {
  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);

  useEffect(() => {
    setTitle(note.title);
    setText(note.text);
  }, [note]);

  const handleSave = () => {
    if (title.trim() && text.trim()) {
      onSave({ title, text });
    }
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
