import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CircleLoader, Error, HorizontalCard } from '../../component';
import { useAuth } from '../../context';
import { getLiked, likeVideo } from '../../utils';
import { toast } from 'react-toastify';

export const Liked = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const {
    authState: {
      token,
      user: { liked: likedVideos },
    },
    authDispatch,
    loading: authLoading,
  } = useAuth();

  useEffect(() => {
    if (token) {
      (async () => {
        setLoading(true);
        try {
          await getLiked(token, authDispatch);
        } catch (error) {
          setError(true);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [token]);

  if (authLoading || loading) {
    return <CircleLoader />;
  }

  if (error) {
    return <Error />;
  }

  const notify = (msg) => toast(msg);

  return (
    <div className='flex-column justify-cntr gap-1 px-4 py-4'>
      {likedVideos.length ? (
        likedVideos.map((video) => (
          <HorizontalCard
            key={video._id}
            video={video}
            onDeleteClick={() =>
              likeVideo(token, video._id, authDispatch, notify)
            }
          />
        ))
      ) : (
        <div className='flex-column gap-1 flex-center container'>
          <h3>No Liked Videos Found!</h3>
          <Link className='primary-link' to={'/'}>
            Watch Videos Now!
          </Link>
        </div>
      )}
    </div>
  );
};
