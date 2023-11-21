import React from 'react'
import {Link, useNavigate, Outlet} from 'react-router-dom'
import ViewStoryPoint from '../components/ViewStoryPoint';
import CreateStoryPoint from './CreateStoryPoint';
import {useEffect, useState} from 'react'

export default function StoryMap() {
  const [storypoint, setStorypoint] = useState()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  
  
  async function handleClick(e) {
    e.preventDefault()
    getStorypoint()
  }

  async function getStorypoint() {
    try {
      const response = await fetch("api/storypoints/2");
      if (!response.ok) throw new Error(`Oops! error ${response.status}!`);
      const focuspoint = await response.json();
      setStorypoint(focuspoint);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <img src="mapa.png" onClick={(e) => handleClick(e)}></img>
      <br /><br /><br />
      {error && error.message}
  
      <ViewStoryPoint storypoint={storypoint}/>
      

    </div>
  )
}
