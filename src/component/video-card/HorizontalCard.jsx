import { useNavigate } from 'react-router-dom';

export const HorizontalCard = ({ video }) => {
  const { title, vid, creator, _id } = video;

  const navigate = useNavigate();

  return (
    <div className='card card-h' onClick={() => navigate(`/watch/${_id}`)}>
      <figure className='card-image'>
        <img
          width={'200'}
          src={`https://img.youtube.com/vi/${vid}/mqdefault.jpg`}
          alt={title}
        />
      </figure>
      <div className='card-body flex-column justify-cntr'>
        <p className='card-title h4 txt-semibold'>{title}</p>
        <small className='card-subtitle txt-grey'>{creator}</small>
      </div>
    </div>
  );
};
