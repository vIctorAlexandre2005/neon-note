import { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Card = {
  id: string;
  title: string;
};

const initialCards: Card[] = [
  { id: "1", title: "Card 1" },
  { id: "2", title: "Card 2" },
  { id: "3", title: "Card 3" },
];

export function TestComponent() {
  const [cards, setCards] = useState(initialCards);

  // Sensores para melhor experiência de arraste
  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd(event: any) {
    const { active, over } = event;
  
    if (active.id !== over.id) {
      setCards((prev) => {
        const oldIndex = prev.findIndex((card) => card.id === active.id);
        const newIndex = prev.findIndex((card) => card.id === over.id);
        const newOrder = arrayMove(prev, oldIndex, newIndex);
  
        // 🔥 Salvar no localStorage
        localStorage.setItem("cards", JSON.stringify(newOrder));
  
        return newOrder;
      });
    }
  }

  useEffect(() => {
    const storedCards = localStorage.getItem("cards");
    if (storedCards) {
      setCards(JSON.parse(storedCards));
    }
  }, []);
  
  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <SortableContext items={cards} strategy={verticalListSortingStrategy}>
        <div className="space-y-4 p-4">
          {cards.map((card) => (
            <DraggableCard key={card.id} id={card.id} title={card.title} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

function DraggableCard({ id, title }: { id: string; title: string }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="p-4 bg-white w-3/6 text-black-900 shadow-lg rounded-lg cursor-grab active:cursor-grabbing"
    >
      {title}
    </div>
  );
}
