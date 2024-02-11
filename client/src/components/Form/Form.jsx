import React from "react";
import useStyles from "./styles";
import { TextField, Button, Typography, Paper } from "@material-ui/core";

const Form = () => {
  const classes = useStyles();
  return (
    <>
      <Paper className={classes.paper}>
        <form autoComplete="off"></form>
      </Paper>
    </>
  );
};

export default Form;
