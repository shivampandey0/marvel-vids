import './IconText.css';

export const IconText = ({ title, children, onClick }) => {
  return (
    <button className='btn icon-btn' onClick={onClick}>
      {children} <span className='title'>{title}</span>
    </button>
  );
};
