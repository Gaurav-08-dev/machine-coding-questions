type pillProps = {
  image: string;
  text: string;
  onClick: () => void;
};
const Pill = ({ image, text, onClick }: pillProps) => {
  return (
    <span className="user-pill" onClick={onClick}>
      <img src={image} alt={text} />
      <span>{text} &times;</span>
    </span>
  );
};

export default Pill;
