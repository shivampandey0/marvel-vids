import {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from 'react';
import { authReducer } from './Reducer';
import { ACTION_TYPES, axios, requests } from '../../utils';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, {
    token: localStorage.getItem('token'),
    user: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const navigate = useNavigate();

  const handleSubmit = async (data, path, route) => {
    setLoading(true);
    try {
      const res = await axios.post(route, data);
      if (res.status === 200) {
        authDispatch({ type: ACTION_TYPES.LOGIN, payload: res.data });
        localStorage.setItem('token', res.data.token);
      }
      navigate(path, { replace: true });
    } catch (error) {
      console.log(error);
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
          }
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authState,
        handleSubmit,
        handleLogout,
        authDispatch,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
