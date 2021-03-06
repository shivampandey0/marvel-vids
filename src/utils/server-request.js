import { ACTION_TYPES, requests } from './constants';
import { axios } from './index';

const getVideos = async (dispatch) => {
  try {
    const res = await axios.get(requests.videos);
    if (res.status === 200) {
      dispatch({ type: ACTION_TYPES.VIDEOS, payload: res?.data?.videos });
    }
  } catch (error) {
    throw new Error(error);
  }
};

const getVideo = async (id) => {
  try {
    const res = await axios.get(`${requests.videos}/${id}`);
    if (res.status === 200) {
      return res?.data?.video;
    }
  } catch (error) {
    throw new Error(error);
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
    throw new Error(error);
  }
};

const likeVideo = async (token, _id, dispatch, notify) => {
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
      const exists = res?.data?.likedVideo?.some((list) => list._id === _id);
      notify(exists ? 'Added to Likes' : 'Removed from Likes');
    }
  } catch (error) {
    notify('Some error occured');
    throw new Error(error);
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
    throw new Error(error);
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
    throw new Error(error);
  }
};

const removeFromHistory = async (_id, token, dispatch, notify) => {
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
      notify('Removed from History');
    }
  } catch (error) {
    notify('Some Error occured');
    throw new Error(error);
  }
};

const clearHistory = async (token, dispatch, notify) => {
  try {
    const res = await axios.delete(requests.history, {
      headers: { authorization: token },
    });

    if (res.status === 201 || res.status === 200) {
      dispatch({
        type: ACTION_TYPES.HISTORY,
        payload: res?.data?.history,
      });
      notify('History cleared');
    }
  } catch (error) {
    notify('Some Error occured');
    throw new Error(error);
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
    throw new Error(error);
  }
};

const updatePlaylist = async (playlistId, _id, token, dispatch, notify) => {
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
      const exists = res?.data?.playlist?.some((list) => list._id === _id);
      notify(exists ? 'Added to Playlist' : 'Removed from Playlist');
    }
  } catch (error) {
    notify('Some Error occured');
    throw new Error(error);
  }
};

const renamePlaylist = async (playlistId, name, token, dispatch, notify) => {
  try {
    const res = await axios.put(
      `${requests.playlist}/${playlistId}`,
      { name },
      {
        headers: { authorization: token },
      }
    );

    if (res.status === 200) {
      dispatch({
        type: ACTION_TYPES.PLAYLIST,
        payload: res?.data?.playlist,
      });
      notify('Playlist renamed');
    }
  } catch (error) {
    notify('Some Error occured');
    throw new Error(error);
  }
};

const deletePlaylist = async (playlistId, token, dispatch, notify) => {
  try {
    const res = await axios.delete(`${requests.playlist}/${playlistId}`, {
      headers: { authorization: token },
    });
    if (res.status === 200) {
      dispatch({
        type: ACTION_TYPES.PLAYLIST,
        payload: res?.data?.playlist,
      });
      notify('Playlist Deleted');
    }
  } catch (error) {
    notify('Some error occured');
    throw new Error(error);
  }
};

const createPlaylist = async (name, _id, token, dispatch, notify) => {
  try {
    const res = await axios.post(
      requests.playlist,
      { name, _id },
      {
        headers: { authorization: token },
      }
    );

    if (res.status === 201) {
      dispatch({
        type: ACTION_TYPES.ADD_PLAYLIST,
        payload: res?.data?.playlist,
      });
      notify(`Added to ${name} playlist`);
    }
  } catch (error) {
    notify('Some error occured');
    throw new Error(error);
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
  updatePlaylist,
  createPlaylist,
  deletePlaylist,
  renamePlaylist,
};
