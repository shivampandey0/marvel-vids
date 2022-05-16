export const requests = {
  login: '/users/login',
  signup: '/users/signup',
  self: '/users/self',
  videos: '/videos',
  liked: '/liked',
  history: '/history',
  playlist: '/playlist',
};

export const ACTION_TYPES = {
  LOGIN: 'LOGIN',
  USER_DATA: 'USER_DATA',
  LOGOUT: 'LOGOUT',
  VIDEOS: 'VIDEOS',
  CATEGORY: 'CATEGORY',
  SORT: 'SORT',
  LIKED: 'LIKED',
  HISTORY: 'HISTORY',
  UPDATE_PLAYLIST: 'UPDATE_PLAYLIST',
  ADD_PLAYLIST: 'ADD_PLAYLIST',
  PLAYLIST: 'PLAYLIST',
};

export const categories = [
  'All',
  'Ironman',
  'Captain America',
  'Hulk',
  'Thor',
  'Black Widow',
];

export const SORT_OPTIONS = {
  LATEST: 'LATEST',
  OLDEST: 'OLDEST',
};
