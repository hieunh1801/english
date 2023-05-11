import { useCounterAsyncStore } from "./counter-async.store";

export const CounterAsync = () => {
  console.log("CounterAsync useCounterAsyncStore");
  const { count, countLoading, decreaseCount, increaseCount } =
    useCounterAsyncStore();
  return (
    <div>
      <h1>CounterAsync</h1>
      <h2>
        {count}
        {countLoading ? "Loading..." : ""}
      </h2>
      <div>
        <button onClick={increaseCount}>+</button>
        <button onClick={decreaseCount}>-</button>
      </div>
    </div>
  );
};
