import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

const root = ReactDOM.createRoot(document.getElementById("root"));

const myTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#3451a1", //page background
      paper: "#051956", //card's background
    },
    text: {
      primary: "#fefefc", //white's
    },
    primary: {
      main: "#eb06ff", //Fav bg and checkbox - pink
    },
    secondary: {
      main: "#F6ECBF", //pail yellow
    },
  },
});

root.render(
  <ThemeProvider theme={myTheme}>
    <CssBaseline />
    <Container maxWidth="sm">
      <App />
    </Container>
  </ThemeProvider>
);
