import './VideoCard.css';
import { FaEllipsisV } from 'react-icons/fa';
import { useState } from 'react';

export const VideoCard = ({ video }) => {
  const { title, vid, creator } = video;

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleShowDropdown = () => setShowDropdown((prev) => !prev);

  return (
    <div className='card flex-row flex-wrap justify-sb'>
      <figure className='card-image'>
        <img
          className='img-responsive'
          src={`https://img.youtube.com/vi/${vid}/mqdefault.jpg`}
          alt='nike'
        />
      </figure>
      <div className='card-body'>
        <p className='card-title h4 txt-semibold'>{title}</p>
        <small className='card-subtitle txt-grey'>{creator}</small>
      </div>
      <div className='card-icons'>
        <button onClick={toggleShowDropdown}>
          <FaEllipsisV />
        </button>
        {showDropdown && (
          <div className='dropdown'>
            <div className='dropdown-item'>Add to Watchlist</div>
            <div className='dropdown-item'>Save to Playlist</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCard;
