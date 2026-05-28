import { create } from "zustand"; //it's a hook

export const useKanbanStore = create((set) => ({
  boards: [
    {
      id: "board-1",
      title: "Solana yooo",
    },
    // { id: "board-2", title: "Personal works" },
  ],
  lists: [
    { id: "list-1", boardId: "board-1", title: "Mario Kart", order: 0 },
    { id: "list-2", boardId: "board-1", title: "Rocket League", order: 0 },
  ],

  cards: [
    {
      id: "card-1",
      listId: "list-1",
      title: "Go Vivek rawr",
      content: "#Notes",
      priority: "low",
      order: 0,
    },
    {
      id: "card-2",
      listId: "list-2",
      title: "Best day ever",
      content: "Too good to be true",
      priority: "high",
      order: 0,
    },
    {
      id: "card-3",
      listId: "list-1",
      title: "Go Viv rawr",
      content: "There we go",
      priority: "low",
      order: 0,
    },
    {
      id: "card-4",
      listId: "list-2",
      title: "Good time",
      content: "Too good to be true",
      priority: "medium",
      order: 0,
    },
  ],

  addBoard: (title) =>
    set((state) => ({
      boards: [
        ...state.boards,
        {
          id: crypto.randomUUID(),
          title,
        },
      ],
    })),

  addCard: (listId, title) =>
    set((state) => ({
      cards: [
        ...state.cards,
        {
          id: crypto.randomUUID(),
          listId,
          title: title,
          content: "",
          order: state.cards.filter((c) => c.listId === listId).length,
        },
      ],
    })),

  removeCard: (cardId) =>
    set((state) => {
      const cardToDelete = state.cards.find((c) => c.cardId == cardId);

      if (!cardToDelete) return state;

      const { listId, order } = cardToDelete;

      return {
        cards: state.cards
          .filter((card) => card.cardId != cardId)
          .map((card) => {
            if (card.listId !== listId || card.order < order) return card;

            return { ...card, order: card.order - 1 };
          }),
      };
    }),

  upDateCard: (cardId, content) =>
    set((state) => {
      //find card by Id then update the card content

      return {
        cards: state.cards.map((card) => {
          if (cardId !== card.cardId) return card;

          return { ...card, content: content };
        }),
      };
    }),

  moveCard: (cardId, newListId) =>
    set((state) => {
      const cardToMove = state.cards.find((card) => card.cardId == cardId);

      if (!cardToMove) return state;

      const { listId: oldListId, order } = cardToMove;

      if (newListId === oldListId) return state;

      const newOrder = state.cards.filter(
        (card) => card.listId == newListId,
      ).length;

      return {
        cards: state.cards.map((card) => {
          if (card.cardId === cardId)
            return { ...card, listId: newListId, order: newOrder };

          if (card.listId == oldListId && card.order > order)
            return { ...card, order: card.order - 1 };

          return card;
        }),
      };
    }),
}));
