import React, { useState, useEffect } from 'react'
import Card from '../components/Card'
import StatsCard from '../components/StatsCard'
import './Home.css'
import $, { data } from 'jquery';
import { isCompositeComponent } from 'react-dom/test-utils';
import { FormControl } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';

let arr = [[[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
  [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
  [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []]];

let isLoaded = false;
  
function Home() {

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

  let [team1, setTeam1] = useState(null)
  let [team2, setTeam2] = useState(null)

  let [team1h2h, setTeam1h2h] = useState(0)
  let [team2h2h, setTeam2h2h] = useState(0)

  let [team1wp, setTeam1wp] = useState(null)
  let [team2wp, setTeam2wp] = useState(null)

  let [season, setSeason] = useState(2)

  let [team1Record, setTeam1Record] = useState(null)
  let [team2Record, setTeam2Record] = useState(null)

  useEffect(() => {
    if (team1 !== null && team2 !== null) {
      document.getElementById('stats-wrapper').style.display = 'grid'
      if(!isLoaded){
        loadTeams()
        isLoaded = true
        console.log(arr)
      }
      expectedWin()
      setSeasonRecord()
    }
  })

  useEffect(() => {
    if (team1 === null || team2 === null) {
      document.getElementById('stats-wrapper').style.display = 'none'
    }
  })


  function imageSetter(team) {
    if(team === '' || team === null){
      return 'white'
    }
    return team
  }

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
    setTeam1h2h(team1win + ' - ' + team2win)
    setTeam2h2h(team2win + ' - ' + team1win)
    setTeam1wp(team1win / totalgamestogether * 100)
    setTeam2wp(100 - team1win / totalgamestogether * 100)
  }


  function setSeasonRecord(){
    const id1 = teamtoid.get(team1)
    const id2 = teamtoid.get(team2)
    let team1totalwin = 0, team2totalwin = 0, team1totalgames = 0, team2totalgames = 0;
    for (let game = 0; game < arr[season][id1].length; ++game) {
      if (arr[season][id1][game].home_team.id === id1) {
        if (arr[season][id1][game].home_team_score > arr[season][id1][game].visitor_team_score) {
          ++team1totalwin
        }
      }
      if (arr[season][id1][game].visitor_team.id === id1) {
        if (arr[season][id1][game].home_team_score < arr[season][id1][game].visitor_team_score) {
          ++team1totalwin
        }
      }
      ++team1totalgames
    }

    for (let game = 0; game < arr[season][id2].length; ++game) {
      if (arr[season][id2][game].home_team.id === id2) {
        if (arr[season][id2][game].home_team_score > arr[season][id2][game].visitor_team_score) {
          ++team2totalwin
        }
      }
      if (arr[season][id2][game].visitor_team.id === id2) {
        if (arr[season][id2][game].home_team_score < arr[season][id2][game].visitor_team_score) {
          ++team2totalwin
        }
      }
      ++team2totalgames
    }

    setTeam1Record(team1totalwin + ' - ' + (team1totalgames-team1totalwin))
    setTeam2Record(team2totalwin + ' - ' + (team2totalgames-team2totalwin))
  }

  return (
    <div className='home-container'>
      <div className='season-selector-container'>
        <FormControl className='season-selector'>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Season
          </InputLabel>
          <NativeSelect
            defaultValue={2}
            inputProps={{
              name: 'season',
              id: 'uncontrolled-native',
            }}
            onChange={(event, value) => setSeason(value)}
          >
            <option value={0}>2019-2020</option>
            <option value={1}>2020-2021</option>
            <option value={2}>2021-2022</option>
          </NativeSelect>
        </FormControl>
      </div>
      <div className='team-picker-wrapper'>
        <Card
          key='team1'
          onChange={value => setTeam1(value)}
          src={'/images/' + imageSetter(team1) + '.png'}
        />
        <Card
          key='team2'
          onChange={val => setTeam2(val)}
          src={'/images/' + imageSetter(team2) + '.png'}
        />
      </div>
      <div id='stats-wrapper'>
        <div className='stats-card-container'>
          <StatsCard
            name={team1}
            h2h={team1h2h}
            winPercent={Math.round(team1wp * 100) / 100}
            seasonRecord={team1Record}
          />
        </div>
        <div className='stats-card-container'>
          <StatsCard
            name={team2}
            h2h={team2h2h}
            winPercent={Math.round(team2wp * 100) / 100}
            seasonRecord={team2Record}
          />
        </div>
      </div>
    </div>
  )
}

export default Home