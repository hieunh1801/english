import { useCounterStore } from "./counter.store";

export const Counter = () => {
  console.log("Counter useCounterStore");
  const { bears, decreasePopulation, increasePopulation, removeAllBears } =
    useCounterStore();

  return (
    <>
      <h1 className="text-emerald-950">Total {bears} around here...</h1>
      <div>
        <button onClick={increasePopulation}>+</button>
        <button onClick={decreasePopulation}>-</button>
      </div>
      <div>
        <button onClick={removeAllBears}>Remove all bear</button>
      </div>
    </>
  );
};
