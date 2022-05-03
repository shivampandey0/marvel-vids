import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context';
import { deletePlaylist } from '../../utils';

export const Playlists = () => {
  const {
    authState: {
      token,
      user: { playlists },
    },
    authDispatch,
  } = useAuth();

  const navigate = useNavigate();

  return (
    <>
      <h2 className='mx-2 my-2'>My Playlists</h2>

      {playlists.length > 0 ? (
        <div className='grid-4 gap-05 mx-2 my-2'>
          {playlists?.slice(1)?.map((playlist) => (
            <div key={playlist._id} className='card card-h'>
              <div
                className='card-body'
                onClick={() => navigate(`/playlists/${playlist._id}`)}
              >
                <p className='card-title h3 txt-bold my-2'>{playlist.name}</p>
                <p className='content my-2'>{playlist.videos.length} Videos</p>
              </div>
              <div className='card-icons top-right'>
                <button
                  onClick={() =>
                    deletePlaylist(playlist._id, token, authDispatch)
                  }
                >
                  <i className='fas fa-close icon'></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='flex-row flex-center container'>
          <i className='fas fa-circle-notch fa-spin fa-4x'></i>
        </div>
      )}
    </>
  );
};
