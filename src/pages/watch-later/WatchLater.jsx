import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CircleLoader, Error, VideoCard } from '../../component';
import { useData } from '../../context';
import { useAuth } from '../../context/auth/Context';
import { getPlaylists, updatePlaylist } from '../../utils';
import { toast } from 'react-toastify';

export const WatchLater = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
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
    loading: dataLoading,
  } = useData();

  const watchLaterId = playlists[0]?._id;

  const notify = (msg) => toast(msg);

  useEffect(() => {
    if (token) {
      (async () => {
        setLoading(true);
        try {
          if (!playlists.length) await getPlaylists(token, authDispatch);
        } catch (error) {
          setError(true);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, []);

  if (loading || authLoading || dataLoading) {
    return <CircleLoader />;
  }

  if (error) {
    return <Error />;
  }

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

  return (
    <div className='grid-4 gap-05 mx-2 my-2'>
      {playlists[0]?.videos.map(({ _id }) => {
        const video = videos?.find((video) => video._id === _id);
        return (
          <VideoCard
            key={_id}
            video={video}
            isInWatchLater={isInWatchLater}
            onWatchLaterClick={() =>
              updatePlaylist(
                watchLaterId,
                video?._id,
                token,
                authDispatch,
                notify
              )
            }
          />
        );
      })}
    </div>
  );
};
