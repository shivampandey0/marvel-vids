import {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from 'react';
import { authReducer } from './Reducer';
import {
  ACTION_TYPES,
  axios,
  getHistory,
  getLiked,
  requests,
} from '../../utils';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, {
    token: localStorage.getItem('token'),
    user: {
      liked: [],
      history: [],
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (data, path, route) => {
    setLoading(true);
    try {
      const res = await axios.post(route, data);
      if (res.status === 200 || res.status === 201) {
        authDispatch({ type: ACTION_TYPES.LOGIN, payload: res.data });
        localStorage.setItem('token', res.data.token);
      }
      navigate(path, { replace: true });
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    authDispatch({ type: 'LOGOUT' });
  };

  useEffect(() => {
    if (authState.token) {
      (async () => {
        setLoading(true);
        try {
          const res = await axios.get(requests.self, {
            headers: { authorization: authState.token },
          });

          if (res.status === 200) {
            authDispatch({ type: ACTION_TYPES.USER_DATA, payload: res.data });
            getLiked(authState.token, authDispatch);
            getHistory(authState.token, authDispatch);
          }
        } catch (error) {
          if (error) handleLogout();
        } finally {
          setLoading(false);
        }
      })();
    }
  }, []);

  const isLiked = (_id) => {
    return authState?.user?.liked?.some((vid) => vid._id === _id);
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        handleSubmit,
        handleLogout,
        authDispatch,
        loading,
        error,
        isLiked,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
