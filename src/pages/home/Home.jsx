import { useState, useEffect } from 'react';
import { Chip, VideoCard, VideoLoader } from '../../component';
import { useData } from '../../context';
import { categories } from '../../utils';
import './Home.css';

export const Home = () => {
  const { state, filterVideos } = useData();
  const [category, setCategory] = useState('All');
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    setVideos(() => filterVideos(category));
  }, [category, state]);

  return (
    <>
      <div className='flex-row gap-1 px-2 py-2 pos-sticky categories'>
        {categories.map((_category) => (
          <Chip
            onClick={(e) => setCategory(e.target.innerText)}
            key={_category}
            title={_category}
            selected={category}
          />
        ))}
      </div>
      <div className='grid-4 gap-05 mx-2 my-2'>
        {videos?.length
          ? videos?.map((video) => <VideoCard key={video._id} video={video} />)
          : [1, 2, 3].map((num) => <VideoLoader key={num} />)}
      </div>
    </>
  );
};
