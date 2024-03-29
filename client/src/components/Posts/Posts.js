import React, { useEffect } from 'react';
import Post from './Post/Post.js';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';
import useStyles from './styles';

const Posts = () => {
  const posts = useSelector((state) => state.posts)
  const classes = useStyles();
  
  return (
    <>
      {!posts.length ? <CircularProgress /> : (
        <Grid className={classes.container} container alignItems="stretch" spacing={3} >
          {posts.map(post => (
            <Grid item key={post._id} xs={12} sm={6}>
              <Post post={post}/>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  )
}

export default Posts