import './App.css';
import React from 'react'
import $, { data } from 'jquery';

function App() {

  // {team, [games]}
  const team_info = new Map();

  // stores all information about teams for a certain season in a map
  function loadTeams() {

    let totalpages = 0;
    // 2 dimensional array storing team information (indexed by team id)
    const arr = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [] ];
    // get total number of pages
    $.ajax ({
      async: false,
      url: 'https://www.balldontlie.io/api/v1/games?seasons[]=2021&per_page=100',
      success: function(games) {
        totalpages = games.meta.total_pages;
        console.log(games);
      }
    })
    // loop through total number of pages of times
    for (let i = 0; i < totalpages; ++i) {
      $.ajax ({
        async: false,
        url: 'https://www.balldontlie.io/api/v1/games?seasons[]=2021&per_page=100&page=' + i,
        success: function(games) {
          // loop through all game id's on the page and put them into their respective arrays
          for (let game = 0; game < 100; ++game) {
            arr[games.data[game].home_team.id].push(games.data[game]);
            arr[games.data[game].visitor_team.id].push(games.data[game]);
          }
        }
      })
    }
    for (let team = 1; team <= 30; ++team) {
      team_info.set(team, arr[team]);
    }
    console.log(team_info);
  }

  return (
    <>
      <button onClick={loadTeams}>click</button>
    </>
  );
}

export default App;
