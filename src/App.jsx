import "./App.css";
import Board from "./components/Board";
import { useKanbanStore } from "./store/useKanbanStore";

function App() {
  console.log(useKanbanStore.getState());
  return <Board boardId="board-1" />;
}

export default App;
