import { auth, db } from '@/services/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

/* const ItemType = {
  NOTE: 'note',
}; */

export function TestComponent() {

  /* const [notes, setNotes] = useState([
    { id: '1', title: 'Nota 1', text: 'Conteúdo da nota 1' },
    { id: '2', title: 'Nota 2', text: 'Conteúdo da nota 2' },
    { id: '3', title: 'Nota 3', text: 'Conteúdo da nota 3' },
    { id: '4', title: 'Nota 4', text: 'Conteúdo da nota 4' },
  ]);

  const moveNote = (fromIndex: any, toIndex: any) => {
    const updatedNotes = Array.from(notes);
    const [movedNote] = updatedNotes.splice(fromIndex, 1);
    updatedNotes.splice(toIndex, 0, movedNote);
    setNotes(updatedNotes);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-lg">
          {notes.map((note, index) => (
            <NoteCard key={note.id} index={index} note={note} moveNote={moveNote} />
          ))}
        </div>
      </div>
    </DndProvider>
  );
  
  // Componente de um único card de nota
  function NoteCard({ note, index, moveNote }) {
    const [, ref] = useDrag({
      type: ItemType.NOTE,
      item: { index },
    });
  
    const [, drop] = useDrop({
      accept: ItemType.NOTE,
      hover: (draggedItem: any) => {
        if (draggedItem.index !== index) {
          moveNote(draggedItem.index, index);
          draggedItem.index = index;
        }
      },
    });
  
    return (
      <div
        ref={(node) => ref(drop(node))}
        className="p-4 mb-2 bg-white rounded-lg shadow-md cursor-pointer hover:bg-blue-100"
      >
        <h3 className="text-lg font-semibold text-gray-800">{note.title}</h3>
        <p className="text-gray-600">{note.text}</p>
      </div>
    );
  } // Componente principal com a lista de notas */

  return <></>
}
