import "./App.css";
import Cell from "./Components/Cell";
import { useState } from "react";

function App() {
  const [order, setOrder] = useState([]);

  const pattern = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ];

  const deactivateCells = () => {
    let timer = setInterval(() => {
      setOrder((originalOrder) => {
        const newOrder = originalOrder.slice();
        newOrder.pop();

        if (!newOrder.length) {
          clearInterval(timer);
        }

        return newOrder;
      });
    }, 300);
  };
  const activateCells = (index) => {
     
    const newOrder = [...order, index];
    setOrder(newOrder);

    if (newOrder.length === pattern.flat(1).filter(Boolean).length) {
      deactivateCells();
    }
  };

  return (
    <div className="wrapper">
      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${pattern[0].length},1fr)` }}
      >
        {pattern
          .flat(1)
          .map((value, index) =>
            value === 1 ? (
              <Cell
              label={`Cell ${index}`}
                filled={order.includes(index)}
                key={index}
                onClick={
                   () => activateCells(index)
                }
                isDisabled={order.includes(index)}
              />
            ) : (
              <span key={index}></span>
            )
          )}
      </div>
    </div>
  );
}

export default App;
