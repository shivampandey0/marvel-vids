import { useState } from 'react';
import {
  Chip,
  CircleLoader,
  EmptyCategory,
  Error,
  VideoCard,
} from '../../component';
import { useAuth, useData } from '../../context';
import { ACTION_TYPES, categories, updatePlaylist } from '../../utils';
import { SORT_OPTIONS } from '../../utils/constants';
import './Home.css';
import { toast } from 'react-toastify';

export const Home = () => {
  const { state, filterVideos: videos, loading, error, dispatch } = useData();
  const [sortVisible, setSortVisible] = useState(false);

  const {
    authState: {
      token,
      user: { playlists },
    },
    authDispatch,
    loading: authLoading,
    isInWatchLater,
  } = useAuth();

  const watchLaterId = playlists[0]?._id;

  if (authLoading || loading) {
    return <CircleLoader />;
  }

  if (error) {
    return <Error />;
  }

  const notify = (msg) => {
    toast(msg);
  };

  return (
    <>
      <div className='flex-row gap-1 px-2 py-2 pos-sticky categories'>
        {categories.map((_category) => (
          <Chip
            onClick={(e) =>
              dispatch({
                type: ACTION_TYPES.CATEGORY,
                payload: e.target.innerText,
              })
            }
            key={_category}
            title={_category}
            selected={state.category}
          />
        ))}
      </div>

      <div className='py-2 px-2 flex-row align-cntr pos-relative'>
        <button
          className='btn pos-relative'
          onClick={() => setSortVisible((prev) => !prev)}
        >
          {' '}
          Sort <i className='fa-solid fa-sort'></i>
          {sortVisible && (
            <div className='sort-menu'>
              <div
                onClick={() =>
                  dispatch({
                    type: ACTION_TYPES.SORT,
                    payload: SORT_OPTIONS.LATEST,
                  })
                }
                className='btn btn-full'
              >
                Date added (newest)
              </div>
              <div
                onClick={() =>
                  dispatch({
                    type: ACTION_TYPES.SORT,
                    payload: SORT_OPTIONS.OLDEST,
                  })
                }
                className='btn btn-full'
              >
                Date added (oldest)
              </div>
            </div>
          )}
        </button>
        <p>{state?.sortBy}</p>
      </div>

      {videos?.length > 0 ? (
        <div className='grid-4 gap-05 mx-2 my-2'>
          {videos?.map((video) => (
            <VideoCard
              key={video._id}
              video={video}
              isInWatchLater={isInWatchLater}
              onWatchLaterClick={() =>
                token
                  ? updatePlaylist(
                      watchLaterId,
                      video._id,
                      token,
                      authDispatch,
                      notify
                    )
                  : notify('Please Login!')
              }
            />
          ))}
        </div>
      ) : (
        <EmptyCategory />
      )}
    </>
  );
};
