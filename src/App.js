import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import React, { useState } from 'react'
import $ from 'jquery';
import Home from './pages/Home.js';
import Card from './components/Card';
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

function App() {

  const theme = createTheme({
    typography: {
      fontFamily: 'IBM Plex Mono'
    }
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
    </>
  )
}

export default App;
