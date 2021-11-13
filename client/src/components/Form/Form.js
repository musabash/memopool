import React, { useState } from 'react'
import useStyles from './styles';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';
import FileBase from 'react-file-base64';
import { useDispatch} from 'react-redux';
import { createPost } from '../../actions/posts';

const validationSchema = yup.object({
  creator: yup
    .string('Creator')
    .min(3, 'Creator name should be of minimum 3 characters length')
    .required('Creator name is required'),
  title: yup
    .string('Title')
    .min(3, 'Title should be of minimum 8 characters length')
    .required('Title is required'),
  message: yup
    .string('Message')
    .min(8, 'Message should be of minimum 8 characters length')
    .required('Message is required'),
  tags: yup
    .string('Tags')
    .min(3, 'Tags should be of minimum 3 characters length')
    .required('Password is required'),
  selectedFile: yup
    .string('File')
});


const Form = () => {
  const formik = useFormik({
    initialValues: {
      creator: '', 
      title: '', 
      message: '', 
      tags: '', 
      selectedFile: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(createPost(values));
    },
  });
  
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleOnDone = ({base64}) => {
    formik.setValues({...formik.values, selectedFile: base64})
    console.log(formik)
  };

  const textFieldProps = (name) => ({
    name: name,
    id: name,
    variant: "outlined",
    label: `${name[0].toUpperCase()}${name.slice(1)}`,
    fullWidth: true,
    value: formik.values[name],
    onChange: formik.handleChange,
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
        >
          Submit
        </Button>
      </form>
    </Paper>
  )
}

export default Form
