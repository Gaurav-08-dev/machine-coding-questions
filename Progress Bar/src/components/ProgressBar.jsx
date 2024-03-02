/* eslint-disable react/prop-types */

import { useEffect } from "react";
import { useState } from "react";
import { MAX_VALUE, MIN_VALUE } from "../constants";

const ProgressBar = ({ value = 0 }) => {
  const [currentPercent, setCurrentPercent] = useState(value);

  useEffect(() => {
    setCurrentPercent(Math.min(MAX_VALUE, Math.max(value, MIN_VALUE)));
  }, [value]);

  return (
    <div className="progress">
      <span style={{ color: currentPercent > 49 ? "#fff" : "" }}>
        {currentPercent.toFixed()}%
      </span>
      <div
        className="fill"
        // style={{ width: `${currentPercent}%` }}
        style={{
          transform: `scaleX(${currentPercent / MAX_VALUE})`,
          transformOrigin: "left",
        }}
        role="progressbar"
        aria-valuemin={MIN_VALUE}
        aria-valuemax={MAX_VALUE}
        aria-valuenow={currentPercent.toFixed()}
      />
    </div>
  );
};

export default ProgressBar;
