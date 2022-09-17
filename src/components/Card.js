import React from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import { TextField } from '@mui/material'
import './Card.css'

function Card(props, {setTeam}) {

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

  function setTeam(value) {
    setTeam(value)
  }

  return (
    <div className='card-container'>
        <div className='team-logo-container'>
            <img className='team-logo' src={props.img} />
        </div>
        <div className='searchbar-container'>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={teams}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Team" />}
            onChange={(event, value) => setTeam(value)}
          />
        </div>
    </div>
  )
}

export default Card