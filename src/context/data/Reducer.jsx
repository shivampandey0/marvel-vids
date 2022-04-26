import { ACTION_TYPES } from '../../utils';

export const dataReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.VIDEOS:
      return { ...state, videos: action.payload };

    default:
      state;
  }
};
