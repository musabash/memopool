import * as api from '../api';

export const getPosts = () => async (dispatch) => {

  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: 'FETCH_ALL', payload: data });
  } catch (error) {
    console.log(error.message);
  }
}

export const createPost = (post, reset) => async (dispatch) => {

  try {
    const res = await api.createPost(post);
    dispatch({ type: 'CREATE', payload: res.data });
    if (res.status === 201) {
      reset();
    } 
  } catch (error) {
    console.log(error.message);
  }
}

export const updatePost = ( id, post, reset ) => async (dispatch) => {

  try {
    const res = await api.updatePost(id, post);
    dispatch({ type: 'UPDATE', payload: res.data });
    if (res.status === 201) {
      reset();
    } 
  } catch (error) {
    console.log(error.message);
  }
}