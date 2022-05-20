import { useNavigate } from 'react-router-dom';
import { CircleLoader } from '../../component';
import { useAuth } from '../../context';
import { deletePlaylist } from '../../utils';
import { GrClose } from 'react-icons/gr';
import { toast } from 'react-toastify';

export const Playlists = () => {
  const {
    authState: {
      token,
      user: { playlists },
    },
    authDispatch,
    loading,
  } = useAuth();

  const navigate = useNavigate();

  if (loading) {
    return <CircleLoader />;
  }

  const notify = (msg) => toast(msg);

  return (
    <>
      <h2 className='mx-2 my-2'>My Playlists</h2>

      {playlists?.length > 1 ? (
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
                    deletePlaylist(playlist._id, token, authDispatch, notify)
                  }
                >
                  <GrClose />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='flex-column gap-1 flex-center container'>
          <h3>No Playlists Found!</h3>
        </div>
      )}
    </>
  );
};
