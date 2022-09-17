import React, {useState} from 'react'
import Card from '../components/Card'
import StatsCard from '../components/StatsCard'
import './Home.css'
import $, { data } from 'jquery';
import { isCompositeComponent } from 'react-dom/test-utils';


function Home() {

  let [team1, setTeam1] = useState('')
  let [team2, setTeam2] = useState('')

  function handleTeam1Change(newTeam1) {
    setTeam1(newTeam1)
  }

  function handleTeam2Change(newTeam2) {
    setTeam2(newTeam2)
  }

  // stores all information about teams for a certain season in a map
  function loadTeams(season) {

    let totalpages = 0;
    // 2 dimensional array storing team information (indexed by team id)
    const arr = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
    // get total number of pages
    console.log('https://www.balldontlie.io/api/v1/games?seasons[]=' + season + '&per_page=100');
    $.ajax({
      async: false,
      url: 'https://www.balldontlie.io/api/v1/games?seasons[]=' + season + '&per_page=100',
      success: function (games) {
        totalpages = games.meta.total_pages;
        console.log(games);
      }
    })
    // loop through total number of pages of times
    for (let i = 0; i < totalpages; ++i) {
      $.ajax({
        async: false,
        url: 'https://www.balldontlie.io/api/v1/games?seasons[]=' + season + '&per_page=100&page=' + i,
        success: function (games) {
          // loop through all game id's on the page and put them into their respective arrays
          for (let game = 0; game < 100; ++game) {
            arr[games.data[game].home_team.id].push(games.data[game]);
            arr[games.data[game].visitor_team.id].push(games.data[game]);
          }
        }
      })
    }
    console.log(arr);
    return arr;
  }

  // calculates the expected win% of team1
  // data has to be calculated based on season
  function expectedWin(team1, team2, data) {
    // find all head to head games of team1 against team2
    let team1win = 0, team2win = 0, totalgamestogether = 0;
    for (let game = 0; game < data[team1].length; ++game) {
      // if the home team is team2
      //console.log(data[team1][game].home_team.id);
      if (data[team1][game].home_team.id === team2) {
        // if team2 wins
        if (data[team1][game].home_team_score > data[team1][game].visitor_team_score) {
          ++team2win;
        } else if (data[team1][game].home_team_score < data[team1][game].visitor_team_score) {
          ++team1win;
        }
        ++totalgamestogether;
      }
      // if the visitor team is team 2
      else if (data[team1][game].visitor_team.id === team2) {
        // if team1 wins
        if (data[team1][game].home_team_score > data[team1][game].visitor_team_score) {
          ++team1win;
        } else if (data[team1][game].home_team_score < data[team1][game].visitor_team_score) {
          ++team2win;
        }
        ++totalgamestogether;
      }
    }
    console.log(team1 / totalgamestogether * 100);
    return team1 / totalgamestogether * 100;
  }

  return (
    <div className='home-container'>
      <h1>Team: {team1}</h1>
      <h1>Team: {team2}</h1>
      <div className='team-picker-wrapper'>
        <Card key='team1' setTeam={handleTeam1Change}/>
        <Card key='team2' setTeam={handleTeam2Change}/>
      </div>
      <div className='stats-wrapper'>
        <StatsCard />
        <StatsCard />
      </div>
    </div>
  )
}

export default Home
