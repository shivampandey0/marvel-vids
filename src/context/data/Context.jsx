import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from 'react';
import { getVideos } from '../../utils';
import { dataReducer, filterCategory, sortBy } from './Reducer';

const initialState = {
  category: 'All',
  sortBy: null,
};

const DataContext = createContext();
const useData = () => useContext(DataContext);

const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  let filterVideos = filterCategory(state, state.videos);
  filterVideos = sortBy(state, filterVideos);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        await getVideos(dispatch);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <DataContext.Provider
      value={{ state, dispatch, filterVideos, loading, error }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { useData, DataProvider };
