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

const getHistory = async (token, dispatch) => {
  try {
    const res = await axios.get(requests.history, {
      headers: { authorization: token },
    });

    if (res.status === 200) {
      dispatch({
        type: ACTION_TYPES.HISTORY,
        payload: res?.data?.historyItems,
      });
    }
  } catch (error) {
    throw Error(error);
  }
};

const addToHistory = async (_id, token, dispatch) => {
  try {
    const res = await axios.post(
      requests.history,
      { _id },
      {
        headers: { authorization: token },
      }
    );

    if (res.status === 201) {
      dispatch({
        type: ACTION_TYPES.HISTORY,
        payload: res?.data?.historyItems,
      });
    }
  } catch (error) {
    throw Error(error);
  }
};

const removeFromHistory = async (_id, token, dispatch) => {
  try {
    const res = await axios.put(
      requests.history,
      { _id },
      {
        headers: { authorization: token },
      }
    );

    if (res.status === 201 || res.status === 200) {
      dispatch({
        type: ACTION_TYPES.HISTORY,
        payload: res?.data?.history,
      });
    }
  } catch (error) {
    throw Error(error);
  }
};

const clearHistory = async (token, dispatch) => {
  try {
    const res = await axios.delete(requests.history, {
      headers: { authorization: token },
    });

    if (res.status === 201 || res.status === 200) {
      dispatch({
        type: ACTION_TYPES.HISTORY,
        payload: res?.data?.history,
      });
    }
  } catch (error) {
    throw Error(error);
  }
};

const getPlaylists = async (token, dispatch) => {
  try {
    const res = await axios.get(requests.playlist, {
      headers: { authorization: token },
    });

    if (res.status === 200) {
      dispatch({
        type: ACTION_TYPES.PLAYLIST,
        payload: res?.data?.playlist,
      });
    }
  } catch (error) {
    throw Error(error);
  }
};

const getPlaylistVideos = async (playlistId, token, dispatch) => {
  try {
    const res = await axios.get(`${requests.playlist}/${playlistId}`, {
      headers: { authorization: token },
    });

    if (res.status === 300) {
      dispatch({
        type: ACTION_TYPES.PLAYLIST,
        payload: res?.data?.playlist,
      });
    }
  } catch (error) {
    throw Error(error);
  }
};

const updatePlaylist = async (playlistId, _id, token, dispatch) => {
  try {
    const res = await axios.post(
      `${requests.playlist}/${playlistId}`,
      { _id },
      {
        headers: { authorization: token },
      }
    );
    if (res.status === 200) {
      dispatch({
        type: ACTION_TYPES.UPDATE_PLAYLIST,
        payload: { playlistId, videos: res?.data?.playlist },
      });
    }
  } catch (error) {
    throw Error(error);
  }
};

export {
  getVideos,
  getVideo,
  getLiked,
  likeVideo,
  getHistory,
  addToHistory,
  removeFromHistory,
  clearHistory,
  getPlaylists,
  getPlaylistVideos,
  updatePlaylist,
};
