import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from 'react';
import { getVideos } from '../../utils';
import { dataReducer } from './Reducer';

const DataContext = createContext();
const useData = () => useContext(DataContext);

const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, {});
  const [loading, setLoading] = useState(false);

  const filterVideos = (category) => {
    switch (category) {
      case 'All':
        return state?.videos;

      default:
        return state?.videos.filter((video) => video.category === category);
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await getVideos(dispatch);
      setLoading(false);
    })();
  }, []);

  return (
    <DataContext.Provider value={{ state, dispatch, filterVideos, loading }}>
      {children}
    </DataContext.Provider>
  );
};

export { useData, DataProvider };
