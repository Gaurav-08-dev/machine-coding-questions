/* eslint-disable react/prop-types */

const Cell = ({ filled, onClick, isDiabled, label }) => {
  return (
    <button
      type="button"
      className={filled ? "cell cell-activated" : "cell"}
      onClick={onClick}
      disabled={isDiabled}
      aria-label={label}
    />
  );
};

export default Cell;
