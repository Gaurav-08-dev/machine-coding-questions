import { useState } from "react";
import useMemoHook from "./hooks/useMemoHook";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);

  const squaredValue = () => {
    console.log("Expensive operation");
    return count * count;
  };

  const memoisedValue = useMemoHook(squaredValue, [count]);

  return (
    <>
      <div className="card">
        <h4>normal count: {count}</h4>
        <h3>square memoised: {memoisedValue}</h3>
        <button onClick={() => setCount((count) => count + 1)}>
          Increment
        </button>

        <h1>{count2}</h1>
        <button onClick={() => setCount2((count) => count - 1)}>
          Decrement
        </button>
      </div>
    </>
  );
}

export default App;
