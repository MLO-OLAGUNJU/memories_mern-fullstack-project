import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/NavBar/NavBar";
import Auth from "./components/Auth/Auth";
import { GoogleOAuthProvider } from "@react-oauth/google";
import PostDetails from "./components/PostDetails/PostDetails";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <GoogleOAuthProvider clientId="649637207925-uoousgrg8ev0tgcdk614fhfd1phob6rb.apps.googleusercontent.com">
      <BrowserRouter>
        <Container maxWidth="xl">
          <Navbar />
          <Routes>
            <Route path="/" exact Component={() => <Navigate to="/posts" />} />
            <Route path="/posts" exact element={<Home />} />
            <Route path="/posts/search" exact element={<Home />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            <Route
              path="/auth"
              exact
              Component={() => (!user ? <Auth /> : <Navigate to="/posts" />)}
            />
          </Routes>
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;
