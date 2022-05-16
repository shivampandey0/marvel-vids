import { ACTION_TYPES } from '../../utils';
import { SORT_OPTIONS } from '../../utils/constants';

export const dataReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.VIDEOS:
      return { ...state, videos: action.payload };
    case ACTION_TYPES.CATEGORY:
      return { ...state, category: action.payload };
    case ACTION_TYPES.SORT:
      return { ...state, sortBy: action.payload };
    default:
      state;
  }
};

export const sortBy = (state, data) => {
  switch (state.sortBy) {
    case SORT_OPTIONS.LATEST:
      return [...data].sort(
        (prev, curr) => Date.parse(prev.date) - Date.parse(curr.date)
      );

    case SORT_OPTIONS.OLDEST:
      return [...data].sort(
        (prev, curr) => Date.parse(curr.date) - Date.parse(prev.date)
      );

    default:
      return data;
  }
};

export const filterCategory = (state, data) => {
  switch (state.category) {
    case 'All':
      return data;

    default:
      return data.filter((video) => video.category === state.category);
  }
};
