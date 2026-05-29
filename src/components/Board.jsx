import { useMemo } from "react";
import { useKanbanStore } from "../store/useKanbanStore";
import List from "./List";
import AddListForm from "./AddListForm";

function Board({ boardId }) {
  //the board knows only about lists!

  const allLists = useKanbanStore((state) => state.lists);

  console.log(allLists);

  const lists = useMemo(() => {
    return allLists
      .filter((list) => list.boardId === boardId)
      .sort((a, b) => a.order - b.order);
  }, [allLists, boardId]);

  if (!lists) return null;

  console.log(lists);

  //now render each list
  return (
    <div className="p-8 h-screen flex gap-4 overflow-x-auto items-start">
      {lists.map((list) => (
        <List key={list.id} listId={list.id} />
      ))}

      <AddListForm boardId={boardId} />
    </div>
  );
}

export default Board;
