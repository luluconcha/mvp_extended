import React from 'react'
import {Link, useNavigate, Outlet} from 'react-router-dom'
import ViewStoryPoint from '../components/ViewStoryPoint';
import CreateStoryPoint from './CreateStoryPoint';
import {useEffect, useState} from 'react'

export default function StoryMap() {
  const [storypoint, setStorypoint] = useState()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [id, setID] = useState(2)

  useEffect(() => {
    getStorypoint();
  }, [id]);

  async function handleClick() {
    await getStorypoint()
  }

  async function getStorypoint() {
    try {
      const response = await fetch(`api/storypoints/${id}`);
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
      <img src="mapa.png" onClick={() => handleClick()}></img>
      <br /><br /><br />
      
      
      <ViewStoryPoint storypoint={storypoint} setID={setID}/>
      

    </div>
  )
}
