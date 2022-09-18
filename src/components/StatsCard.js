import React from 'react'
import './StatsCard.css'

function StatsCard(props) {
  return (
    <div className='stats-card-container'>
      <h2>Team: {props.name}</h2>
      <h2>H2H Record: {props.h2h}</h2>
      <h2>H2H Win%: {props.winPercent}</h2>
      <h2>Season Record: {props.seasonRecord}</h2>
    </div>
  )
}

export default StatsCard