import "./App.css";
import { listStore } from "./store/listStore";

function App() {
  console.log(listStore.getState());
  return <h1>Hello World!</h1>;
}

export default App;
