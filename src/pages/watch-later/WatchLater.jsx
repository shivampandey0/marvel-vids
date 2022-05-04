import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { VideoCard } from '../../component';
import { useData } from '../../context';
import { useAuth } from '../../context/auth/Context';
import { getPlaylists, updatePlaylist } from '../../utils';

export const WatchLater = () => {
  const {
    authState: {
      token,
      user: { playlists },
    },
    isInWatchLater,
    authDispatch,
    loading: authLoading,
  } = useAuth();

  const {
    state: { videos },
    loading,
  } = useData();

  const watchLaterId = playlists[0]?._id;

  useEffect(() => {
    if (token) {
      (async () => {
        if (!playlists.length) await getPlaylists(token, authDispatch);
      })();
    }
  }, []);

  if (playlists[0]?.videos?.length === 0) {
    return (
      <div className='flex-column gap-1 flex-center container'>
        <h3>No Videos Found!</h3>
        <Link className='primary-link' to={'/'}>
          Watch Videos Now!
        </Link>
      </div>
    );
  }

  if (loading || authLoading) {
    return (
      <div className='flex-row flex-center container'>
        <i className='fas fa-circle-notch fa-spin fa-4x'></i>
      </div>
    );
  }

  return (
    <>
      <div className='grid-4 gap-05 mx-2 my-2'>
        {playlists[0]?.videos.map(({ _id }) => {
          const video = videos?.find((video) => video._id === _id);
          return (
            <VideoCard
              key={_id}
              video={video}
              isInWatchLater={isInWatchLater}
              onWatchLaterClick={() =>
                updatePlaylist(watchLaterId, video?._id, token, authDispatch)
              }
            />
          );
        })}
      </div>
    </>
  );
};
