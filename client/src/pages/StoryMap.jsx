import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import ViewStoryPoint from '../components/ViewStoryPoint';
import CreateStoryPoint from './CreateStoryPoint';
import {useEffect, useState} from 'react'

export default function StoryMap() {
  const [storypoint, setStorypoint] = useState()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState("")
  
  
  async function handleClick(e) {
    e.preventDefault()
    getStorypoint()
  }

  async function getStorypoint() {
    try {
      const response = await fetch("storypoints/1");
      if (!response.ok) throw new Error(`Oops! error ${response.status}!`);
      console.log('line 16')
      console.log(response)
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
      <ViewStoryPoint storypoint={storypoint} />

    </div>
  )
}
