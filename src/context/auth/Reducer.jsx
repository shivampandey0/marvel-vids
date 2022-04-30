import { ACTION_TYPES } from '../../utils';

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
      return {};

    case ACTION_TYPES.LIKED:
      return {
        ...state,
        user: {
          ...state?.user,
          liked: action.payload,
        },
      };

    default:
      return state;
  }
};
