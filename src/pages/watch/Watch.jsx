import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import { useParams } from 'react-router-dom';
import {
  addToHistory,
  createPlaylist,
  getVideo,
  likeVideo,
  updatePlaylist,
} from '../../utils';
import { AiOutlineLike, AiTwotoneLike } from 'react-icons/ai';
import { BiListPlus } from 'react-icons/bi';
import { BsStopwatch, BsStopwatchFill } from 'react-icons/bs';
import './Watch.css';
import { IconText, PlaylistPopup, VideoCard } from '../../component';
import { useAuth, useData } from '../../context';

export const Watch = () => {
  const { id } = useParams();
  const [video, setVideo] = useState();
  const [modal, setModal] = useState(false);

  const {
    state: { videos },
  } = useData();

  const {
    authState: {
      token,
      user: { playlists },
    },
    authDispatch,
    isInWatchLater,
    isLiked,
  } = useAuth();

  const watchLaterId = playlists[0]?._id;

  useEffect(() => {
    (async () => {
      const res = await getVideo(id);
      if (token) addToHistory(res?._id, token, authDispatch);
      setVideo(() => res);
    })();
  }, [id]);

  const getRelatedVideos = (video) =>
    videos?.reduce((acc, curr) => {
      (curr?.category === video?.category) & (curr._id !== video?._id) &&
        acc.push(curr);
      return acc;
    }, []);

  const relatedVideos = getRelatedVideos(video);
  const isVideoLiked = isLiked(video?._id);

  return (
    <>
      {modal && (
        <PlaylistPopup
          vid={video?._id}
          onClose={() => setModal(false)}
          onAddClick={(name) =>
            createPlaylist(name, video?._id, token, authDispatch)
          }
          onPlaylistCheck={(playlistId) =>
            updatePlaylist(playlistId, video?._id, token, authDispatch)
          }
        />
      )}
      {video ? (
        <div className='watch-container'>
          <section className='video-section'>
            <h3>{video.title}</h3>
            <h4 className='txt-grey'>By {video.creator}</h4>
            <div className='player-wrapper'>
              <ReactPlayer
                className='react-player'
                url={`https://www.youtube.com/watch?v=${video.vid}`}
                controls={true}
                width={`100%`}
                height={`100%`}
              />
            </div>
            <div>
              <div className='flex-row gap-05'>
                <IconText
                  title={'Like'}
                  onClick={() => likeVideo(token, video?._id, authDispatch)}
                >
                  {isVideoLiked ? (
                    <AiTwotoneLike className='icon txt-primary' />
                  ) : (
                    <AiOutlineLike className='icon' />
                  )}
                </IconText>
                <IconText
                  title={
                    isInWatchLater(video._id)
                      ? 'Remove from Watch Later'
                      : 'Add to Watch Later'
                  }
                  onClick={() => {
                    updatePlaylist(
                      watchLaterId,
                      video._id,
                      token,
                      authDispatch
                    );
                  }}
                >
                  {isInWatchLater(video._id) ? (
                    <BsStopwatchFill
                      title='Remove from WatchLater'
                      className='icon txt-primary'
                    />
                  ) : (
                    <BsStopwatch title='Add to WatchLater' className='icon' />
                  )}
                </IconText>
                <IconText
                  onClick={() => setModal(true)}
                  title='Add to Playlist'
                >
                  <BiListPlus />
                </IconText>
              </div>
            </div>
            <hr />
            <div>
              <h3 className='my-2'>Description</h3>
              <p>{video?.description}</p>
            </div>
          </section>
          <section className='suggestions-section'>
            <h2>Must Watch</h2>
            <div className='suggestions'>
              {relatedVideos &&
                relatedVideos.map((video) => (
                  <VideoCard
                    key={video._id}
                    video={video}
                    isInWatchLater={isInWatchLater}
                    onWatchLaterClick={() =>
                      updatePlaylist(
                        watchLaterId,
                        video._id,
                        token,
                        authDispatch
                      )
                    }
                  />
                ))}
            </div>
          </section>
        </div>
      ) : (
        <div className='flex-row flex-center container'>
          <i className='fas fa-circle-notch fa-spin fa-4x'></i>
        </div>
      )}
    </>
  );
};
