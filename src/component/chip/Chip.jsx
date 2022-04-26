import './Chip.css';

export const Chip = ({ title, onClick, selected }) => {
  return (
    <div
      className={selected === title ? 'chip selected' : 'chip'}
      onClick={onClick}
    >
      {title}
    </div>
  );
};
