import { ACTION_TYPES, requests } from './constants';
import { axios } from './index';

const getVideos = async (dispatch) => {
  try {
    const res = await axios.get(requests.videos);
    console.log(res);
    if (res.status === 200) {
      dispatch({ type: ACTION_TYPES.VIDEOS, payload: res?.data?.videos });
    }
  } catch (error) {
    console.log(error);
  }
};

export { getVideos };
