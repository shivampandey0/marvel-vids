import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CircleLoader, Error, HorizontalCard } from '../../component';
import { useAuth } from '../../context';
import { getHistory, removeFromHistory, clearHistory } from '../../utils';

export const History = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const {
    authState: {
      token,
      user: { history: historyVideos },
    },
    authDispatch,
    loading: authLoading,
  } = useAuth();

  useEffect(() => {
    if (token) {
      (async () => {
        setLoading(true);
        try {
          await getHistory(token, authDispatch);
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

  return (
    <>
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
    </>
  );
};
