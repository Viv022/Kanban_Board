import { useMemo } from "react";
import { useKanbanStore } from "../store/useKanbanStore";
import List from "./List";
import AddListForm from "./AddListForm";
import { DndContext, closestCorners } from "@dnd-kit/core";

function Board({ boardId }) {
  //the board knows only about lists!

  const allLists = useKanbanStore((state) => state.lists);

  console.log(allLists);

  const moveCard = useKanbanStore((state) => state.moveCard);

  const handleDragOver = (event) => {
    console.log(event);
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    if (!activeData) return;

    const activeListId = activeData.listId;
    //which column card actually belongs to??

    const isOverCard = overData && overData.listId != undefined;
    //how to know if it is over a card ?

    const overListId = isOverCard ? overData.listId : overId;

    if (activeListId !== overListId) {
      const newOrder = isOverCard ? overData.order : 0;
      moveCard(activeId, overListId, newOrder);
    }
  };

  const handleDragEnd = (event) => {
    //only handle same list movement
    const { active, over } = event;
    if (!over) return;

    const cardId = active.id;

    const activeData = active.data.current;
    const overData = over.data.current;

    if (activeData && overData && activeData.listId === overData.listId) {
      if (cardId !== over.id) {
        moveCard(cardId, overData.listId, overData.order);
      }
    }
  };

  const lists = useMemo(() => {
    return allLists
      .filter((list) => list.boardId === boardId)
      .sort((a, b) => a.order - b.order);
  }, [allLists, boardId]);

  if (!lists) return null;

  console.log(lists);

  //now render each list
  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      collisionDetection={closestCorners}
    >
      <div className="p-8 h-screen flex gap-4 overflow-x-auto items-start">
        {lists.map((list) => (
          <List key={list.id} listId={list.id} />
        ))}

        <AddListForm boardId={boardId} />
      </div>
    </DndContext>
  );
}

export default Board;
