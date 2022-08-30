import React, { useState } from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, signInWithGoogle } from "./firebase";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

const Sign = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errormsg, setErrormsg] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;
        // console.log("Created new user: " + user.email);
        // ...
      })
      .catch((error) => {
        setErrormsg(error.message);
        // ..
      });
  };
  const handleSignIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        //const user = userCredential.user;
        //console.log("Logged in user: " + user.email);
        // ...
      })
      .catch((error) => {
        setErrormsg(error.message);
      });
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
      Welcome
      </Typography>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSignIn}
      >
        <TextField
          id="email"
          label="Email"
           variant="outlined"
           color="secondary"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          color="secondary"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button variant="contained" onClick={handleSignIn} type="submit">
          Login
        </Button>
        <Button color="secondary" variant="outlined" onClick={signInWithGoogle}>
          Sign-in with Google
        </Button>
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            First Time ?
            <Button
            color="secondary"
              variant="outlined"
              sx={{ marginLeft: "15px" }}
              onClick={handleSignup}
            >
              Sign Up
            </Button>
          </Typography>
        </Box>
      </Box>
      <Typography variant="subtitle1" gutterBottom color="error">
        {`${errormsg}`}
      </Typography>
    </div>
  );
};

export default Sign;
