import { useState, useEffect } from "react";
import {
  Chip,
  CircleLoader,
  EmptyCategory,
  Error,
  VideoCard,
} from "../../component";
import { useAuth, useData } from "../../context";
import { categories, updatePlaylist } from "../../utils";
import "./Home.css";

export const Home = () => {
  const { state, filterVideos, loading, error } = useData();
  const [category, setCategory] = useState("All");
  const [videos, setVideos] = useState([]);

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

  useEffect(() => {
    setVideos(() => filterVideos(category));
  }, [category, state]);

  if (authLoading || loading) {
    return <CircleLoader />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <>
      <div className="flex-row gap-1 px-2 py-2 pos-sticky categories">
        {categories.map((_category) => (
          <Chip
            onClick={(e) => setCategory(e.target.innerText)}
            key={_category}
            title={_category}
            selected={category}
          />
        ))}
      </div>

      {videos?.length > 0 ? (
        <div className="grid-4 gap-05 mx-2 my-2">
          {videos?.map((video) => (
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
      ) : (
        <EmptyCategory />
      )}
    </>
  );
};
