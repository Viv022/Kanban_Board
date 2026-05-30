import { useMemo } from "react";
import { useKanbanStore } from "../store/useKanbanStore";
import Card from "./Card";
import AddCardForm from "./AddCardForm";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

function List({ listId }) {
  const list = useKanbanStore((state) =>
    state.lists.find((l) => l.id === listId),
  );

  const allCards = useKanbanStore((state) => state.cards);

  const { setNodeRef } = useDroppable({ id: listId });

  const cards = useMemo(() => {
    return allCards
      .filter((card) => card.listId === listId)
      .sort((a, b) => a.order - b.order);
  }, [allCards, listId]); //array of cards matching listId

  if (!list) return null;
  const { title } = list;
  console.log(list);

  console.log(cards);

  const cardIds = cards.map((card) => card.id);

  return (
    <div
      ref={setNodeRef}
      className="flex flex-col gap-3 p-2 bg-gray-100 rounded-lg min-w-70 w-70 shrink-0"
    >
      <h2 className="font-bold text-gray-700 px-2">{title}</h2>
      <SortableContext items={cardIds} strategy={verticalListSortingStrategy}>
        {cards.map((card) => (
          <Card key={card.id} cardId={card.id} />
        ))}
      </SortableContext>

      <AddCardForm listId={listId} />
    </div>
  );
}

export default List;
