import "./App.css";
import { CounterAsync } from "./counter-async/counter-async";
import { Counter } from "./counter/counter";

function App() {
  console.log("App");
  return (
    <>
      Hello World
      <button className="rounded-full text-red-600">Save Changes</button>
      <Counter />
      <CounterAsync />
    </>
  );
}

export default App;
