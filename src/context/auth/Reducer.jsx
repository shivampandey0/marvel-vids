import { ACTION_TYPES } from '../../utils';

export const initialState = {
  token: localStorage.getItem('token'),
  user: {
    liked: [],
    history: [],
    playlists: [],
  },
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN:
      return {
        ...state,
        token: action.payload.token,
        user: { ...state.user, firstname: action.payload.firstname },
      };

    case ACTION_TYPES.USER_DATA:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };

    case ACTION_TYPES.LOGOUT:
      return { ...initialState, token: null };

    case ACTION_TYPES.LIKED:
      return {
        ...state,
        user: {
          ...state?.user,
          liked: action.payload,
        },
      };

    case ACTION_TYPES.HISTORY:
      return {
        ...state,
        user: {
          ...state?.user,
          history: action.payload,
        },
      };
    case ACTION_TYPES.PLAYLIST:
      return {
        ...state,
        user: {
          ...state?.user,
          playlists: action.payload,
        },
      };

    case ACTION_TYPES.UPDATE_PLAYLIST: {
      const updatedLists = state.user.playlists.map((playlist) => {
        if (playlist._id === action.payload.playlistId) {
          return { ...playlist, videos: action.payload.videos };
        }
        return playlist;
      });

      return {
        ...state,
        user: {
          ...state?.user,
          playlists: updatedLists,
        },
      };
    }
    default:
      return state;
  }
};
