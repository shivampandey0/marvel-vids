import React from 'react';
import { useLocation } from 'react-router-dom';
import { CircleLoader, Error, VideoCard } from '../../component';
import { useAuth, useData } from '../../context';
import { updatePlaylist } from '../../utils';

export const SearchResults = () => {
  const {
    authState: {
      token,
      user: { playlists },
    },
    authDispatch,
    loading: authLoading,
    isInWatchLater,
  } = useAuth();

  const {
    state: { videos },
    loading,
    error,
  } = useData();

  const watchLaterId = playlists[0]?._id;

  if (authLoading || loading) {
    return <CircleLoader />;
  }

  if (error) {
    return <Error />;
  }

  const query = new URLSearchParams(useLocation().search);
  const searchTerm = query.get('search_query');

  const searchResults = videos?.filter((video) =>
    video.title.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  return (
    <>
      {
        <p className='h3 px-2 py-2 txt-center'>{`Search Results for "${searchTerm}" - ${searchResults?.length} items`}</p>
      }
      {searchResults && (
        <div className='grid-4 gap-05 mx-2 my-2'>
          {searchResults?.map((video) => (
            <VideoCard
              key={video._id}
              video={video}
              isInWatchLater={isInWatchLater}
              onWatchLaterClick={() =>
                updatePlaylist(watchLaterId, video._id, token, authDispatch)
              }
            />
          ))}
        </div>
      )}
    </>
  );
};
