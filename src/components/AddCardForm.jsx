import { useEffect, useState } from "react";
import { useKanbanStore } from "../store/useKanbanStore";
import { FaPlus } from "react-icons/fa";
import { useRef } from "react";

function AddCardForm({ listId }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [addingText, setAddingText] = useState(false);

  const addCard = useKanbanStore((state) => state.addCard);

  const formRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) {
        setAddingText(false);
      }
    };

    if (addingText) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [addingText]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit btn clicked");
    if (!title.trim()) {
      setAddingText(false);
      return;
    }
    addCard(listId, title);
    setAddingText(false);
    setTitle("");
    setContent("");
  };

  if (addingText) {
    return (
      <form
        onSubmit={handleSubmit}
        className="mt-2 border-blue-300"
        ref={formRef}
      >
        <div>
          <textarea
            autoFocus
            type="text"
            placeholder="Title goes here..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 mb-2 text-sm rounded shadow-sm border-gray-300 resize-none outline-blue-500"
            rows="2"
          />
        </div>
        <textarea
          type="text"
          placeholder="Content goes here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="flex gap-2 items-center">
          <button
            className="bg-green-400 text-white font-semibold py-2 px-4 rounded-lg"
            type="submit"
          >
            Add card
          </button>

          <button
            className="bg-red-400 text-white font-semibold py-2 px-4 rounded-lg"
            type="button"
            onClick={() => {
              setAddingText(false);
              setTitle("");
              setContent("");
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <button
      className="mt-2 flex items-center gap-1 text-gray-500 hover:bg-gray-200 hover:text-gray-800 w-full text-left px-2 py-1.5 rounded text-sm font-medium transition-colors"
      onClick={() => setAddingText(true)}
    >
      Add a new card
      <FaPlus />
    </button>
  );
}

export default AddCardForm;
