import { useAuth } from '../../context';

export const Playlists = () => {
  const {
    authState: {
      // token,
      user: { playlists },
    },
    // authDispatch,
  } = useAuth();

  return (
    <>
      <h2 className='mx-2 my-2'>My Playlists</h2>
      <div className='grid-4 gap-05 mx-2 my-2'>
        {playlists &&
          playlists.map((playlist) => (
            <div key={playlist._id} className='card card-h'>
              <div className='card-body'>
                <p className='card-title h3 txt-bold my-2'>{playlist.name}</p>
                <p className='content my-2'>{playlist.videos.length} Videos</p>
              </div>
              <div className='card-icons top-right'>
                <button>
                  <i className='fas fa-close icon'></i>
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
