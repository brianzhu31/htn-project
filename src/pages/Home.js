import React, {useState, useEffect} from 'react'
import Card from '../components/Card'
import StatsCard from '../components/StatsCard'
import './Home.css'
import $, { data } from 'jquery';
import { isCompositeComponent } from 'react-dom/test-utils';


function Home() {

  const arr = [[[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
  [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
  [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []]];

  const teams = [
    'Atlanta Hawks',
    'Boston Celtics',
    'Brooklyn Nets',
    'Charlotte Hornets',
    'Chicago Bulls',
    'Cleveland Cavaliers',
    'Dallas Mavericks',
    'Denver Nuggets',
    'Detroit Pistons',
    'Golden State Warriors',
    'Houston Rockets',
    'Indiana Pacers',
    'LA Clippers',
    'LA Lakers',
    'Memphis Grizzlies',
    'Miami Heat',
    'Milwaukee Bucks',
    'Minnesota Timberwolves',
    'New Orleans Hornets',
    'New York Knicks',
    'Oklahoma City Thunder',
    'Orlando Magic',
    'Philadelphia Sixers',
    'Phoenix Suns',
    'Portland Trail Blazers',
    'Sacramento Kings',
    'San Antonio Spurs',
    'Toronto Raptors',
    'Utah Jazz',
    'Washington Wizards'
  ]
  
  const teamtoid = new Map();
  for (let i = 0; i < 30; ++i) {
      teamtoid.set(teams[i], i + 1);
  }

  let [team1, setTeam1] = useState('')
  let [team2, setTeam2] = useState('')
  
  let [team1wp, setTeam1wp] = useState()
  let [team2wp, setTeam2wp] = useState()

  let [season, setSeason] = useState(2021-2019)


  useEffect(() => {
    if(team1 !== '' && team2 !== ''){
      document.getElementById('stats-wrapper').style.display = 'grid'
    }
  })

  useEffect(() => {
    if(team1 === null || team2 === null){
      document.getElementById('stats-wrapper').style.display = 'none'
    }
  })

  // stores all information about teams for a certain season in a map
  function loadTeams() {


    // already has data
    // if (arr[season][1].length !== 0) return;

    let totalpages = 0;
    // get total number of pages
    $.ajax({
      async: false,
      url: 'https://www.balldontlie.io/api/v1/games?seasons[]=' + (season + 2019) + '&per_page=100',
      success: function (games) {
        totalpages = games.meta.total_pages;
      }
    })
    // loop through total number of pages of times
    for (let i = 0; i < totalpages; ++i) {
      $.ajax({
        async: false,
        url: 'https://www.balldontlie.io/api/v1/games?seasons[]=' + (season + 2019) + '&per_page=100&page=' + i,
        success: function (games) {
          // loop through all game id's on the page and put them into their respective arrays
          for (let game = 0; game < 100; ++game) {
            arr[season][games.data[game].home_team.id].push(games.data[game]);
            arr[season][games.data[game].visitor_team.id].push(games.data[game]);
          }
        }
      })
    }
  }

  // calculates the expected win% of team1
  // data has to be calculated based on season
  function expectedWin() {

    loadTeams(season)
    console.log(arr)
    // find all head to head games of team1 against team2
    const id1 = teamtoid.get(team1)
    const id2 = teamtoid.get(team2)
    let team1win = 0, team2win = 0, totalgamestogether = 0;
    for (let game = 0; game < arr[season][id1].length; ++game) {
      // if the home team is team2
      //console.log(data[team1][game].home_team.id);
      if (arr[season][id1][game].home_team.id === id2) {
        console.log(arr[season][id1][game].date);
        // if team2 wins
        if (arr[season][id1][game].home_team_score > arr[season][id1][game].visitor_team_score) {
          ++team2win;
        } else if (arr[season][id1][game].home_team_score < arr[season][id1][game].visitor_team_score) {
          ++team1win;
        }
        ++totalgamestogether;
      }
      // if the visitor team is team 2
      else if (arr[season][id1][game].visitor_team.id === id2) {
        console.log(arr[season][id1][game].date);
        // if team1 wins
        if (arr[season][id1][game].home_team_score > arr[season][id1][game].visitor_team_score) {
          ++team1win;
        } else if (arr[season][id1][game].home_team_score < arr[season][id1][game].visitor_team_score) {
          ++team2win;
        }
        ++totalgamestogether;
      }
    }
    return team1win / totalgamestogether * 100;
  }

  return (
    <div className='home-container'>
      <div className='team-picker-wrapper'>
        <Card 
          key='team1' 
          onChange={value => setTeam1(value)}
          src={'/images/' + team1 + '.png'}
        />
        <Card 
          key='team2' 
          onChange={value => setTeam2(value)}
          src={'/images/' + team2 + '.png'}
        />
      </div>
      <div id='stats-wrapper'>
        <StatsCard 
          name = {team1}
          winPercent = {expectedWin()} 
        />
        <StatsCard 
          name = {team2}
          winPercent = {expectedWin()}
        />
      </div>
    </div>
  )
}

export default Home
