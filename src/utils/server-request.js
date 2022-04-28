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

const getLiked = async (token) => {
  try {
    const res = await axios.get(requests.liked, {
      headers: { authorization: token },
    });

    if (res.status === 200) {
      return res?.data?.likedVideoItems;
    }
  } catch (error) {
    console.log(error);
  }
};

const likeVideo = async (token, _id, dispatch) => {
  console.log(token, _id);
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

    console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch({ type: ACTION_TYPES.LIKED, payload: res?.data?.likedVideo });
    }
  } catch (error) {
    console.log(error);
  }
};

export { getVideos, getVideo, getLiked, likeVideo };
