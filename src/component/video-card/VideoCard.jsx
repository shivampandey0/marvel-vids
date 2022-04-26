import './VideoCard.css';
import { BsStopwatch } from 'react-icons/bs';

export const VideoCard = ({ video }) => {
  const { title, vid, creator } = video;

  return (
    <div className='card flex-row flex-wrap justify-sb'>
      <figure className='card-image'>
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
        <button >
          <BsStopwatch title='WatchLater' className='icon' />
        </button>
      </div>
    </div>
  );
};

export default VideoCard;
