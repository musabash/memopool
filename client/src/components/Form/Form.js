import React, { useState, useEffect } from 'react'
import useStyles from './styles';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../actions/posts';
import { updateAppState } from '../../actions/appState';

const validationSchema = yup.object({
  creator: yup
  .string('Creator')
  .min(3, 'Too short')
  .required('Creator name is required'),
  title: yup
  .string('Title')
  .min(3, 'Too short')
  .required('Title is required'),
  message: yup
  .string('Message')
  .min(8, 'Too short')
  .required('Message is required'),
  tags: yup
  .string('Tags')
  .min(3, 'Too short')
  .required('At least one tag is required'),
  selectedFile: yup
  .string('File')
});


const Form = () => {
  const activeId = useSelector((state) => state.appState.activeId);
  const post = useSelector((state) => activeId ? state.posts.find(post => post._id === activeId) : null)
  
    const classes = useStyles();
    const dispatch = useDispatch();
    
    const formik = useFormik({
    initialValues: {
      creator: '', 
      title: '', 
      message: '', 
      tags: '', 
      selectedFile: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      dispatch(createPost(values, formik.resetForm));
    },
  });

  const handleOnDone = ({base64}) => {
    formik.setValues({...formik.values, selectedFile: base64})
    console.log(activeId);
  };

  const handleClearForm = () => {
    dispatch(updateAppState({activeId: null}));
    formik.resetForm();
  }

  useEffect(() => {
    activeId && formik.setValues(post);
  }, [activeId])

  const textFieldProps = (name) => ({
    name: name,
    id: name,
    variant: "outlined",
    label: `${name[0].toUpperCase()}${name.slice(1)}`,
    fullWidth: true,
    value: formik.values[name],
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    error: formik.touched[name] && Boolean(formik.errors[name]),
    helperText: formik.touched[name] && formik.errors[name]
  });

  return (
    <Paper className={classes.paper}>
      <form onSubmit={formik.handleSubmit} className={`${classes.root} ${classes.form}`} autoComplete="off" noValidate >
        <Typography variant="h6">Create a Memo</Typography>
        <TextField {...textFieldProps("creator")} />
        <TextField {...textFieldProps("title")} />
        <TextField {...textFieldProps("message")} />
        <TextField {...textFieldProps("tags")} />
        <div className={classes.fileInput}>
          <FileBase 
            type="file"
            multiple={false} 
            onDone={handleOnDone} />
        </div>
        <Button 
          className={classes.buttonSubmit} 
          variant="contained" 
          color="primary" 
          size="large" 
          fullWidth
          type="submit"
          disabled={!formik.dirty || !formik.isValid || formik.isSubmitting}
        >
          {formik.isSubmitting ? "posting..." : activeId ? "Update Memo" : "Post Memo"}
        </Button>
        <Button 
          variant="contained" 
          color="secondary" 
          size="small" 
          fullWidth
          type="button"
          onClick={handleClearForm}
        >
          Clear
        </Button>
      </form>
    </Paper>
  )
}

export default Form
