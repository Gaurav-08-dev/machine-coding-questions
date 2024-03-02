/* eslint-disable react/prop-types */
const Checkbox = ({ state, title, onChange }) => {
  return (
    <div>
      <input type="checkbox" onChange={onChange} checked={state} />
      <label>{title}</label>
    </div>
  );
};

export default Checkbox;
