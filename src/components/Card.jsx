import { useKanbanStore } from "../store/useKanbanStore";
import { FaRegTrashCan } from "react-icons/fa6";

function Card({ cardId }) {
  const card = useKanbanStore((state) =>
    state.cards.find((card) => card.id === cardId),
  );

  const removeCard = useKanbanStore((state) => state.removeCard);

  if (!card) return null;

  const { title, priority, content } = card;

  console.log(title, priority, content);
  console.log("hello \n");

  const priorityStyles = {
    high: "border-l-4 border-red-500 bg-red-50 text-red-700",
    medium: "border-l-4 border-yellow-500 bg-yellow-50 text-yellow-700",
    low: "border-l-4 border-blue-500 bg-blue-50 text-blue-700",
    default: "border-l-4 border-gray-300 bg-gray-50 text-gray-600",
  };

  function getPriorityStyle() {
    const normalizedPriority = priority?.toLowerCase();
    return priorityStyles[normalizedPriority] || priorityStyles.default;
  }

  return (
    <div
      className={`card-container relative group p-4 mb-3 bg-white rounded shadow-sm ${getPriorityStyle()}`}
    >
      <div>
        <span className="text-xs font-bold uppercase tracking-wider">
          {priority}
        </span>
      </div>

      <button
        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 hidden group-hover:block text-xs font-bold p-1"
        onClick={(e) => {
          e.stopPropagation();
          removeCard(cardId);
        }}
      >
        <FaRegTrashCan />
      </button>

      <div className="card-body">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-500 line-clamp-3">{content}</p>
      </div>
    </div>
  );
}

export default Card;
