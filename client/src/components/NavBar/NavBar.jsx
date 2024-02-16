import React, { useState, useEffect } from "react";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import { useNavigate, useLocation } from "react-router-dom";
import memoriesLogo from "../../images/memoriesLogo.png";
import memoriesText from "../../images/memoriesText.png";
import * as actionType from "../../constants/actionTypes";
import useStyles from "./styles";

const Navbar = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }

    //JWT ...
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/auth");
  };

  /////////////
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Load selected image from local storage based on the user's ID
    const storedImage = localStorage.getItem(
      `selectedImage_${user?.result?._id}`
    );
    if (storedImage) {
      setSelectedImage(storedImage);
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataURL = reader.result;
        setSelectedImage(imageDataURL);

        // Save selected image URL to local storage with the user's ID
        localStorage.setItem(
          `selectedImage_${user?.result?._id}`,
          imageDataURL
        );

        // Make API call to save selected image URL to backend
        // saveProfileImage(user?.result?._id, imageDataURL)
        //   .then((response) => {
        //     // Handle the response if needed
        //     console.log("Image saved to backend:", response.data);
        //   })
        //   .catch((error) => {
        //     // Handle the error if needed
        //     console.error("Error saving image to backend:", error);
        //   });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = () => {
    document.getElementById("avatar-upload").click();
  };

  /////////////
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img src={memoriesText} alt="icon" height="45px" />
        <img className={classes.image} src={memoriesLogo} height="40" />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            {/* Updated Avatar with image upload */}
            <input
              accept="image/*"
              className={classes.input}
              id="avatar-upload"
              type="file"
              onChange={handleImageChange}
            />
            <Avatar
              className={classes.purple}
              alt={user?.result.name}
              src={selectedImage || user?.result.picture}
              onClick={handleAvatarClick}
            >
              {user?.result.name.charAt(0)}
            </Avatar>

            <Typography className={classes.userName} variant="h6">
              {user?.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
