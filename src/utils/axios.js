import axios from 'axios';

/**
 * backend hosted on heroku and cyclic.
 * adding both here to switch quickly in case of down time of another
 */

export const instance = axios.create({
  baseURL: 'https://smoggy-rose-goose.cyclic.app/',
  // baseURL: 'https://marvel-vids.herokuapp.com',
});
