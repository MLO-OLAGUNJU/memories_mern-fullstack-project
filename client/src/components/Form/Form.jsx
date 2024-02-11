import React from "react";
import useStyles from "./styles";
import { TextField, Button, Typography, Paper } from "@material-ui/core";

const Form = () => {
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  return (
    <>
      <Paper className={classes.paper}>
        <form
          autoComplete="off"
          noValidate
          className={classes.form}
          onSubmit={handleSubmit}
        ></form>
      </Paper>
    </>
  );
};

export default Form;
