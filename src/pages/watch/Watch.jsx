import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import { useParams } from 'react-router-dom';
import { getVideo } from '../../utils';
import { AiTwotoneLike } from 'react-icons/ai';
import { BiListPlus, BiStopwatch } from 'react-icons/bi';
import { useData } from '../../context/data/Context';
import './Watch.css';
import { IconText, VideoCard } from '../../component';

export const Watch = () => {
  const { id } = useParams();
  const {
    state: { videos },
  } = useData();
  const [video, setVideo] = useState();

  useEffect(() => {
    (async () => {
      const res = await getVideo(id);
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

  return (
    <>
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
                <IconText title='Like'>
                  <AiTwotoneLike />
                </IconText>
                <IconText title='Add to Watch Later'>
                  <BiStopwatch />
                </IconText>
                <IconText title='Add to Playlist'>
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
                  <VideoCard key={video._id} video={video} />
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
