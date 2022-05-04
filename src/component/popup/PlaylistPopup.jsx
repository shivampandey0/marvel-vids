import { useAuth } from '../../context';
import './PlaylistPopup.css';
import { AiOutlineClose } from 'react-icons/ai';
import { useState } from 'react';

export const PlaylistPopup = ({
  vid,
  onClose,
  onAddClick,
  onPlaylistCheck,
}) => {
  const [playlistName, setPlaylistName] = useState('');

  const {
    authState: {
      user: { playlists },
    },
  } = useAuth();
  return (
    <div className='modal'>
      <div className='modal-container'>
        <div className='flex-row justify-sb align-cntr'>
          <p>Save to...</p>
          <button className='btn' onClick={onClose}>
            <AiOutlineClose />
          </button>
        </div>
        <hr />
        <div className='modal-options'>
          {playlists &&
            playlists.map((playlist) => (
              <div key={playlist._id}>
                <label className='modal-item'>
                  <input
                    type='checkbox'
                    name={playlist.name}
                    id={playlist.name}
                    checked={playlist.videos.some(({ _id }) => _id === vid)}
                    onChange={() => {
                      onPlaylistCheck(playlist._id);
                      onClose();
                    }}
                  />
                  {playlist.name}
                </label>
              </div>
            ))}
        </div>

        <div className='flex-row align-cntr gap-05'>
          <input
            className='input'
            type='text'
            placeholder='Enter playlist name...'
            onChange={(e) => setPlaylistName(e.target.value)}
          />
          <button
            disabled={playlistName === ''}
            className='btn btn-primary'
            onClick={() => {
              onClose();
              onAddClick(playlistName);
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
