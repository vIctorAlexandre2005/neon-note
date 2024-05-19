/* import React, { useState } from 'react';
import { useTheme } from "@/components/ThemeDark";
import { BiSolidTrash } from "react-icons/bi";
import { ModalIdx } from "./modal";



interface NoteListProps {
    noteList: [string, string][];
    handleDeleteNote: (index: number) => void;
    handleUpdateNote: (index: number, newTitle: string, newText: string) => void;
}

export function NoteList({ noteList, handleDeleteNote, handleUpdateNote }: NoteListProps) {
    const { darkMode } = useTheme();
    const [open, setOpen] = useState(false);
    const [selectedNoteIndex, setSelectedNoteIndex] = useState<number | null>(null);

    function onClose() {
        setOpen(false);
    }

    function handleOpenModal(idx: number | null) {
        setSelectedNoteIndex(idx);
        setOpen(true);
    }

    const truncateText = (text: string, maxLength: number) => {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    return (
        <div className="p-4 xs:flex-col md:flex-row grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 justify-center gap-4">
            {noteList.map((item, idx) => (
                <div
                    key={idx}
                    className={`
                        xs:w-full sm:w-full md:w-full
                        md:max-w-2/6
                        border
                        ${darkMode ? 'bg-neon-600' : 'bg-neon-400'}
                        rounded-lg
                        ${darkMode ? 'border-neon-600' : 'border-neon-200'}
                        flex
                        flex-col
                        mt-10
                        p-2
                        transition ease-in-out hover:-translate-y-1 hover:bg-neon-700 duration-300
                    `}
                    onClick={() => handleOpenModal(idx)}
                >
                    <div className="max-w-1/6">
                        <h1 className="text-neon-50 break-words text-2xl mb-4">
                            {truncateText(item[0], 100)}
                        </h1>
                        <h1 className="text-neon-50 break-words">
                            {truncateText(item[1], 250)}
                        </h1>
                        <div className="flex justify-end">
                            <button
                                className="
                                    hover:bg-white
                                    hover:rounded-full
                                    transition
                                    hover:text-red-500
                                    text-white
                                    hover:p-2
                                "
                                onClick={(e) => { e.stopPropagation(); handleDeleteNote(idx); }}
                            >
                                <BiSolidTrash />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            {open && selectedNoteIndex !== null && (
                <ModalIdx
                    open={open}
                    onClose={onClose}
                    item={noteList[selectedNoteIndex][0]}
                    item2={noteList[selectedNoteIndex][1]}
                    onSave={(newTitle: string, newText: string) => {
                        handleUpdateNote(selectedNoteIndex, newTitle, newText);
                        onClose();
                    }}
                />
            )}
        </div>
    );
}
 */