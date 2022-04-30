import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HorizontalCard } from '../../component';
import { useAuth } from '../../context';
import { getLiked } from '../../utils';

export const Liked = () => {
  const {
    authState: {
      token,
      user: { liked: likedVideos },
    },
    authDispatch,
  } = useAuth();

  useEffect(() => {
    if (token) {
      getLiked(token, authDispatch);
    }
  }, [token]);

  return (
    <>
      {likedVideos ? (
        <div className='flex-column justify-cntr gap-1 px-4 py-4'>
          {likedVideos.length ? (
            likedVideos.map((video) => (
              <HorizontalCard key={video._id} video={video} />
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
      ) : (
        <div className='flex-row flex-center container'>
          <i className='fas fa-circle-notch fa-spin fa-4x'></i>
        </div>
      )}
    </>
  );
};
