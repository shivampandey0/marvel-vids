import './VideoCard.css';
import { BsStopwatch, BsStopwatchFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

export const VideoCard = ({ video, onWatchLaterClick, isInWatchLater }) => {
  const { title, vid, creator, _id } = video;
  const navigate = useNavigate();

  return (
    <div className='card flex-row flex-wrap justify-sb'>
      <figure className='card-image' onClick={() => navigate(`/watch/${_id}`)}>
        <img
          className='img-responsive'
          src={`https://img.youtube.com/vi/${vid}/mqdefault.jpg`}
          alt={title}
        />
      </figure>
      <div className='card-body'>
        <p className='card-title h4 txt-semibold'>{title}</p>
        <small className='card-subtitle txt-grey'>{creator}</small>
      </div>
      <div className='card-icons'>
        <button onClick={onWatchLaterClick}>
          {isInWatchLater(_id) ? (
            <BsStopwatchFill
              title='Remove from WatchLater'
              className='icon  txt-primary'
            />
          ) : (
            <BsStopwatch title='Add to WatchLater' className='icon' />
          )}
        </button>
      </div>
    </div>
  );
};

export default VideoCard;
