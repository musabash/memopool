import * as api from '../api';
import * as actions from "../constants/actionTypes";

export const getPosts = () => async (dispatch) => {

  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: actions.FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
}

export const createPost = (post, reset) => async (dispatch) => {

  try {
    const res = await api.createPost(post);
    dispatch({ type: actions.CREATE, payload: res.data });
    if (res.status === 201) {
      reset();
    } 
  } catch (error) {
    console.log(error.message);
  }
}

export const updatePost = ( id, post, reset ) => async (dispatch) => {

  try {
    const {data, status} = await api.updatePost(id, post);
    dispatch({ type: actions.UPDATE, payload: data });
    if (status === 201) {
      reset();
    } 
  } catch (error) {
    console.log(error);
  }
}

export const deletePost = ( id ) => async (dispatch) => {

  try {
    const { status } = await api.deletePost(id);
    dispatch({ type: actions.DELETE, payload: id });
    // if (status === 200) {
    //   reset();
    // } 
  } catch (error) {
    console.log(error);
  }
}

export const likePost = (id) => async (dispatch) => {

  try {
    const { data } = await api.likePost(id);
    dispatch({ type: actions.LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
}