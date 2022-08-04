import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import { useNavigate, useParams } from 'react-router-dom';
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
import {
  CircleLoader,
  Error,
  IconText,
  PlaylistPopup,
  VideoCard,
} from '../../component';
import { useAuth, useData } from '../../context';
import { toast } from 'react-toastify';

export const Watch = () => {
  const { id } = useParams();
  const [video, setVideo] = useState();
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const {
    state: { videos },
    loading: dataLoading,
  } = useData();

  const {
    authState: {
      token,
      user: { playlists },
    },
    authDispatch,
    isInWatchLater,
    isLiked,
    loading: authLoading,
  } = useAuth();

  const watchLaterId = playlists[0]?._id;

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await getVideo(id);
        setVideo(() => res);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const notify = (msg) => toast(msg);

  const getRelatedVideos = (video) =>
    videos?.reduce((acc, curr) => {
      (curr?.category === video?.category) & (curr._id !== video?._id) &&
        acc.push(curr);
      return acc;
    }, []);

  const relatedVideos = getRelatedVideos(video);
  const isVideoLiked = isLiked(video?._id);

  if (authLoading || loading || dataLoading) {
    return <CircleLoader />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <>
      {modal && (
        <PlaylistPopup
          vid={video?._id}
          onClose={() => setModal(false)}
          onAddClick={(name) =>
            createPlaylist(name, video?._id, token, authDispatch, notify)
          }
          onPlaylistCheck={(playlistId) =>
            updatePlaylist(playlistId, video?._id, token, authDispatch, notify)
          }
        />
      )}

      <div className='watch-container'>
        <section className='video-section'>
          <h3>{video?.title}</h3>
          <h4 className='txt-grey'>By {video?.creator}</h4>
          <div className='player-wrapper'>
            <ReactPlayer
              className='react-player'
              url={`https://www.youtube.com/watch?v=${video?.vid}`}
              controls={true}
              onStart={() => {
                if (token) addToHistory(id, token, authDispatch);
              }}
              width={`100%`}
              height={`100%`}
            />
          </div>
          <div>
            <div className='flex-row gap-05'>
              <IconText
                title={'Like'}
                onClick={() =>
                  token
                    ? likeVideo(token, video?._id, authDispatch, notify)
                    : navigate('/login')
                }
              >
                {isVideoLiked ? (
                  <AiTwotoneLike className='icon txt-primary' />
                ) : (
                  <AiOutlineLike className='icon' />
                )}
              </IconText>
              <IconText
                title={'Watch Later'}
                onClick={() => {
                  token
                    ? updatePlaylist(
                        watchLaterId,
                        video?._id,
                        token,
                        authDispatch,
                        notify
                      )
                    : navigate('/login');
                }}
              >
                {isInWatchLater(video?._id) ? (
                  <BsStopwatchFill
                    title='Remove from WatchLater'
                    className='icon txt-primary'
                  />
                ) : (
                  <BsStopwatch title='Add to WatchLater' className='icon' />
                )}
              </IconText>
              <IconText
                onClick={() => (token ? setModal(true) : navigate('/login'))}
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
                    token
                      ? updatePlaylist(
                          watchLaterId,
                          video?._id,
                          token,
                          authDispatch,
                          notify
                        )
                      : navigate('/login')
                  }
                />
              ))}
          </div>
        </section>
      </div>
    </>
  );
};
