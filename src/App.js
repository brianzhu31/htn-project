import './App.css';
import NewComponent from './newComponent';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import React, { useState } from 'react'
import $ from 'jquery';

function App() {

  function loadTeams() {
    $.getJSON('https://www.balldontlie.io/api/v1/teams', function(data) {
      console.log(data)
    })
  }

  return (
    <>
      <button onClick={loadTeams}>click</button>
    </>
  );
}

export default App;
