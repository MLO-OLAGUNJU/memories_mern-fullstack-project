import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import useStyles from "./styles";
import { MdLockOutline } from "react-icons/md";
import Input from "./Input";
import Icon from "./icon";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import { signin, signup } from "../../actions/auth";
import { AUTH } from "../../constants/actionTypes";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();
  // const isSignup = true;
  const [isSignup, setIsSignUp] = useState(false);

  const [formData, setFormData] = useState(initialState);

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const HandleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const googleSucess = async (res) => {
    const result = jwtDecode(res?.credential);
    const tokenId = res?.tokenId || (res?.tokenObj && res?.tokenObj.id_token);
    console.log("tokenId", tokenId);
    try {
      // const result = jwtDecode(tokenId);
      dispatch({ type: AUTH, data: { result, token: tokenId } });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sign In was unsuccessful, Try Again Later!");
  };

  const SwitchMode = () => {
    // isSignup ? setIsSignUp(false) : setIsSignUp(true);
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    setShowPassword(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <MdLockOutline />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={HandleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />

                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label={"Password"}
              handleChange={handleChange}
              type={!showPassword ? "password" : "text"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name={"confirmPassword"}
                label="Repeat Password"
                handleChange={handleChange}
                type={"password"}
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>

          <Button
            style={{ background: "transparent" }}
            className={classes.googleButton}
            color="secondary"
            fullWidth
            // startIcon={<Icon />}
            variant="contained"
          >
            <GoogleLogin
              style={{ width: "100%" }}
              clientId="649637207925-uoousgrg8ev0tgcdk614fhfd1phob6rb.apps.googleusercontent.com"
              onSuccess={googleSucess}
              onFailure={googleFailure}
              cookiePolicy={"single_host_origin"}
              responseType="token id_token"
            />
          </Button>

          <Grid container justify="center">
            <Grid item>
              <Button
                style={{ textDecoration: "underline" }}
                onClick={SwitchMode}
              >
                {!isSignup
                  ? "New to Memories? Sign Up"
                  : "Have a Memories Account already?"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
