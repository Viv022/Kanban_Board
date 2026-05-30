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
          priority: "default",
          order: state.cards.filter((c) => c.listId === listId).length,
        },
      ],
    })),

  removeCard: (cardId) =>
    set((state) => {
      const cardToDelete = state.cards.find((c) => c.id === cardId);

      if (!cardToDelete) return state;

      const { listId, order } = cardToDelete;

      return {
        cards: state.cards
          .filter((card) => card.id != cardId)
          .map((card) => {
            if (card.listId !== listId || card.order < order) return card;

            return { ...card, order: card.order - 1 };
          }),
      };
    }),

  updateCard: (cardId, content) =>
    set((state) => {
      //find card by Id then update the card content

      return {
        cards: state.cards.map((card) => {
          if (cardId !== card.id) return card;

          return { ...card, content: content };
        }),
      };
    }),

  moveCard: (cardId, newListId, newOrder) =>
    set((state) => {
      const cardToMove = state.cards.find((card) => card.id == cardId);

      if (!cardToMove) return state;

      const { listId: oldListId, order: oldOrder } = cardToMove;

      if (oldListId !== newListId) {
        //moving to different lists!
        return {
          cards: state.cards.map((card) => {
            if (card.listId === oldListId && card.order > oldOrder)
              return { ...card, order: card.order - 1 };

            if (card.listId === newListId && card.order >= newOrder)
              return { ...card, order: card.order + 1 };

            if (card.id === cardId) {
              return { ...card, listId: newListId, order: newOrder };
            }

            return card;
          }),
        };
      }

      return {
        //moving to same list!
        cards: state.cards.map((card) => {
          if (card.listId !== newListId) return card;
          if (card.id === cardId) {
            return { ...card, order: newOrder };
          }
          if (
            // 1 -> 4
            oldOrder < newOrder &&
            card.order > oldOrder &&
            card.order <= newOrder
          ) {
            return { ...card, order: card.order - 1 };
          }
          if (
            //7 -> 5
            oldOrder > newOrder &&
            card.order < oldOrder &&
            card.order >= newOrder
          ) {
            return { ...card, order: card.order + 1 };
          }
          return card;
        }),
      };
    }),

  addList: (boardId, title) =>
    set((state) => ({
      lists: [
        ...state.lists,
        {
          id: crypto.randomUUID(),
          boardId,
          title,
          order: state.lists.filter((l) => l.boardId === boardId).length,
        },
      ],
    })),
}));
