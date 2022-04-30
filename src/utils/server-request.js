import { ACTION_TYPES, requests } from './constants';
import { axios } from './index';

const getVideos = async (dispatch) => {
  try {
    const res = await axios.get(requests.videos);
    if (res.status === 200) {
      dispatch({ type: ACTION_TYPES.VIDEOS, payload: res?.data?.videos });
    }
  } catch (error) {
    throw Error(error);
  }
};

const getVideo = async (id) => {
  try {
    const res = await axios.get(`${requests.videos}/${id}`);
    if (res.status === 200) {
      return res?.data?.video;
    }
  } catch (error) {
    throw Error(error);
  }
};

const getLiked = async (token, dispatch) => {
  try {
    const res = await axios.get(requests.liked, {
      headers: { authorization: token },
    });

    if (res.status === 200) {
      dispatch({
        type: ACTION_TYPES.LIKED,
        payload: res?.data?.likedVideoItems,
      });
    }
  } catch (error) {
     throw Error(error);
  }
};

const likeVideo = async (token, _id, dispatch) => {
  try {
    const res = await axios.post(
      requests.liked,
      {
        _id,
      },
      {
        headers: { authorization: token },
      }
    );

    if (res.status === 200 || res.status === 201) {
      dispatch({ type: ACTION_TYPES.LIKED, payload: res?.data?.likedVideo });
    }
  } catch (error) {
     throw Error(error);
  }
};

export { getVideos, getVideo, getLiked, likeVideo };
