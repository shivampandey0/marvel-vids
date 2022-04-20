import { ACTION_TYPES } from '../../utils';

export const authReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN:
      return {
        ...state,
        token: action.payload.token ?? state.token,
        user: { firstname: action.payload.firstname },
      };

    case ACTION_TYPES.LOGOUT:
      return {};

    default:
      return state;
  }
};
