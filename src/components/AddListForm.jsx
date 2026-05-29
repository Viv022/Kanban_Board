import { useEffect, useRef, useState } from "react";
import { useKanbanStore } from "../store/useKanbanStore";
import { FaPlus } from "react-icons/fa6";

function AddListForm({ boardId }) {
  const [listTitle, setListTitle] = useState("");
  const [addingList, setAddingList] = useState(false);

  const addList = useKanbanStore((state) => state.addList);

  const formRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) {
        setAddingList(false);
      }
    };

    if (addingList) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [addingList]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!listTitle) return;
    addList(boardId, listTitle);
    setListTitle("");
  };

  return (
    <div className="w-70 shrink-0">
      {addingList ? (
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="p-2 bg-gray-100 rounded-lg shadow-sm"
        >
          <input
            autoFocus
            type="text"
            placeholder="Title goes here..."
            value={listTitle}
            onChange={(e) => setListTitle(e.target.value)}
          />
          <div className="flex gap-2 items-center">
            <button
              className="bg-green-400 text-white font-semibold py-2 px-4 rounded-lg"
              type="submit"
            >
              Add list
            </button>

            <button
              className="bg-red-400 text-white font-semibold py-2 px-4 rounded-lg"
              type="button"
              onClick={() => {
                setAddingList(false);
                setListTitle("");
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          className="mt-2 flex items-center gap-1 text-gray-500 hover:bg-gray-200 hover:text-gray-800 w-full text-left px-2 py-1.5 rounded text-sm font-medium transition-colors"
          onClick={() => setAddingList(true)}
        >
          Add a new list
          <FaPlus />
        </button>
      )}
    </div>
  );
}

export default AddListForm;
