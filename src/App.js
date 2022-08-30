//import logo from './logo.svg';
import { useState, useEffect } from "react";
import Home from "./components/Home";
import Sign from "./components/Sign";
import { auth } from "./components/firebase.js";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);
  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        //console.log("Sign-out successful");
      })
      .catch((error) => {
        // An error happened.
        console.log("Error: " + error.message);
      });
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: 420,
          alignItems: "center",
        }}
      >
        <Typography variant="h3" gutterBottom>
          To do
        </Typography>
        <Typography variant="caption" gutterBottom>
          {user ? user.email.toLocaleLowerCase() : ""}
          <br />
          {user && (
            <span>
              <IconButton onClick={handleLogOut}>
                <LogoutIcon fontSize="small" />
              </IconButton>
              Logout
            </span>
          )}
        </Typography>
      </Box>
      <Box>{user ? <Home userId={user.uid} /> : <Sign />}</Box>
    </>
  );
}

export default App;