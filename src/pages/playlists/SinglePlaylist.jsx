import { Link, useParams } from 'react-router-dom';
import { HorizontalCard } from '../../component';
import { useAuth, useData } from '../../context';
import { FaTrash } from 'react-icons/fa';
import { AiFillEdit } from 'react-icons/ai';
import { deletePlaylist, updatePlaylist } from '../../utils';

export const SinglePlaylist = () => {
  const { id } = useParams();
  const {
    authState: {
      token,
      user: { playlists },
    },
    authDispatch,
    loading,
  } = useAuth();

  const {
    state: { videos },
    loading: dataLoader,
  } = useData();

  const currentPlaylist = playlists?.find((playlist) => playlist._id === id);
  const playlistVideos = currentPlaylist?.videos;

  if (loading || dataLoader) {
    return (
      <div className='flex-row flex-center container'>
        <i className='fas fa-circle-notch fa-spin fa-4x'></i>
      </div>
    );
  }

  return (
    <>
      {
        <div className='flex-column justify-cntr gap-1 px-4 py-4'>
          {playlistVideos?.length > 0 && (
            <div className='flex-row justify-sb gap-05'>
              <div className='h3 grow-1'>{currentPlaylist.name}</div>
              <button title='Edit' onClick={() => {}} className='btn btn-fab'>
                <AiFillEdit />
              </button>
              <button
                title='Delete'
                onClick={() =>
                  deletePlaylist(currentPlaylist._id, token, authDispatch)
                }
                className='btn btn-fab dnd'
              >
                <FaTrash />
              </button>
            </div>
          )}
          {playlistVideos?.length ? (
            playlistVideos.map(({ _id }) => {
              const video = videos?.find((video) => video._id === _id);
              return (
                <HorizontalCard
                  key={video._id}
                  video={video}
                  onDeleteClick={() =>
                    updatePlaylist(
                      currentPlaylist._id,
                      video?._id,
                      token,
                      authDispatch
                    )
                  }
                />
              );
            })
          ) : (
            <div className='flex-column gap-1 flex-center container'>
              <h3>No Videos Found!</h3>
              <Link className='primary-link' to={'/'}>
                Watch Videos Now!
              </Link>
            </div>
          )}
        </div>
      }
    </>
  );
};
