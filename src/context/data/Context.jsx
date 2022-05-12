import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import { getVideos } from "../../utils";
import { dataReducer } from "./Reducer";

const DataContext = createContext();
const useData = () => useContext(DataContext);

const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, {});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const filterVideos = (category) => {
    switch (category) {
      case "All":
        return state?.videos;

      default:
        return state?.videos.filter((video) => video.category === category);
    }
  };

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
