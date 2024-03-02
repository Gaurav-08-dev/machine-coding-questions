/* eslint-disable react/prop-types */

const Button = ({ title, onClick, customClass }) => {
  return (
    <button className={customClass} onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
