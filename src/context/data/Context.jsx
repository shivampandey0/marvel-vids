import { createContext, useContext, useReducer, useEffect } from 'react';
import { getVideos } from '../../utils';
import { dataReducer } from './Reducer';

const DataContext = createContext();
const useData = () => useContext(DataContext);

const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, {});

  const filterVideos = (category) => {
    switch (category) {
      case 'All':
        return state?.videos;

      default:
        return state?.videos.filter((video) => video.category === category);
    }
  };

  useEffect(() => {
    getVideos(dispatch);
  }, []);

  return (
    <DataContext.Provider value={{ state, dispatch, filterVideos }}>
      {children}
    </DataContext.Provider>
  );
};

export { useData, DataProvider };
