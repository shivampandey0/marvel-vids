import { useNavigate } from 'react-router-dom';
import { MdClear } from 'react-icons/md';

export const HorizontalCard = ({ video, onDeleteClick = null }) => {
  const { title, vid, creator, _id } = video;

  const navigate = useNavigate();

  return (
    <div className='card card-h'>
      <figure className='card-image' onClick={() => navigate(`/watch/${_id}`)}>
        <img
          width={'200'}
          src={`https://img.youtube.com/vi/${vid}/mqdefault.jpg`}
          alt={title}
        />
      </figure>
      <div
        className='card-body flex-column justify-cntr'
        onClick={() => navigate(`/watch/${_id}`)}
      >
        <p className='card-title h4 txt-semibold'>{title}</p>
        <small className='card-subtitle txt-grey'>{creator}</small>
      </div>
      {onDeleteClick && (
        <button title='Remove' className='order-3 btn'>
          <MdClear className='stroke-none' onClick={onDeleteClick} />
        </button>
      )}
    </div>
  );
};
