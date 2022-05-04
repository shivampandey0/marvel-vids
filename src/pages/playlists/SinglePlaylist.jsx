import { Link, useNavigate, useParams } from 'react-router-dom';
import { HorizontalCard } from '../../component';
import { useAuth, useData } from '../../context';
import { FaTrash, FaCheck } from 'react-icons/fa';
import { AiFillEdit } from 'react-icons/ai';
import { deletePlaylist, renamePlaylist, updatePlaylist } from '../../utils';
import { useRef, useState } from 'react';

export const SinglePlaylist = () => {
  const { id } = useParams();
  const [editable, setEditable] = useState(false);
  const titleRef = useRef(null);
  const navigate = useNavigate();
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

  if (editable) {
    setTimeout(() => {
      titleRef.current.focus();
    }, 0);
  }

  return (
    <>
      {
        <div className='flex-column justify-cntr gap-1 px-4 py-4'>
          {playlistVideos && (
            <div className='flex-row justify-sb gap-05'>
              <div
                contentEditable={editable}
                ref={titleRef}
                className='h3 grow-1'
              >
                {currentPlaylist.name}
              </div>
              {editable ? (
                <button
                  title='Done'
                  onClick={async () => {
                    await renamePlaylist(
                      currentPlaylist._id,
                      titleRef.current.innerText,
                      token,
                      authDispatch
                    );
                    setEditable(false);
                  }}
                  className='btn btn-fab'
                >
                  <FaCheck />
                </button>
              ) : (
                <button
                  title='Edit'
                  onClick={() => {
                    setEditable(true);
                  }}
                  className='btn btn-fab'
                >
                  <AiFillEdit />
                </button>
              )}
              <button
                title='Delete'
                onClick={async () => {
                  await navigate(-1);
                  deletePlaylist(currentPlaylist._id, token, authDispatch);
                }}
                className='btn btn-fab dnd'
              >
                <FaTrash />
              </button>
            </div>
          )}
          {playlistVideos?.length > 0 ? (
            playlistVideos.map(({ _id }) => {
              const video = videos?.find((video) => video?._id === _id);
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
