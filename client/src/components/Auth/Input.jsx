import React from "react";
import { TextField, Grid, InputAdornment, IconButton } from "@material-ui/core";

import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
const Input = ({
  name,
  half,
  handleChange,
  label,
  autoFocus,
  type,
  handleShowPassword,
}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        onChange={handleChange}
        variant="outlined"
        required
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
        inputProps={
          name === "password" && {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword}>
                  {type === "password" ? <MdVisibility /> : <MdVisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }
        }
      />
    </Grid>
  );
};

export default Input;
