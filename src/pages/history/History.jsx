import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HorizontalCard } from '../../component';
import { useAuth } from '../../context';
import { getHistory, removeFromHistory, clearHistory } from '../../utils';

export const History = () => {
  const {
    authState: {
      token,
      user: { history: historyVideos },
    },
    authDispatch,
  } = useAuth();

  useEffect(() => {
    if (token) {
      getHistory(token, authDispatch);
    }
  }, [token]);

  return (
    <>
      {historyVideos ? (
        <div className='flex-column justify-cntr gap-1 px-4 py-4'>
          {historyVideos.length > 0 && (
            <div>
              <button
                onClick={() => clearHistory(token, authDispatch)}
                className='btn btn-secondary'
              >
                Clear History
              </button>
            </div>
          )}
          {historyVideos.length ? (
            historyVideos.map((video) => (
              <HorizontalCard
                key={video._id}
                video={video}
                onDeleteClick={() =>
                  removeFromHistory(video._id, token, authDispatch)
                }
              />
            ))
          ) : (
            <div className='flex-column gap-1 flex-center container'>
              <h3>No history Videos Found!</h3>
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
