import '../App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import React, { useState } from 'react'
import $ from 'jquery';

function Home() {
    let arrTeams = [];

    $.ajax({
      async: false,
      url: 'https://www.balldontlie.io/api/v1/teams',
      success: function(teams) {
        for(let i = 0; i < teams.data.length; i++){
          arrTeams.push(teams.data[i].full_name)
        }
      }
    });
  
    console.log(arrTeams)
  
    return (
      <>
        <div>Teams:</div>
        <div>
          {arrTeams.map((team) => (
              <p>{team}</p>
          ))}
        </div>
      </>
    );
}

export default Home