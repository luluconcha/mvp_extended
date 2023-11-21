import {useEffect, useState} from 'react'
import axios from "axios";
import CreateStoryPoint from '../pages/CreateStoryPoint';
import {useNavigate} from 'react-router-dom'

export default function ViewStoryPoint({storypoint, setID}) {
  const navigate = useNavigate()
  const [children, setChildren] = useState()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getChildren();
  }, [storypoint]);


  async function getChildren(){
    try {
      const response = await fetch(`api/storypoints/${storypoint.id}/children`);
      if (!response.ok) throw new Error(`Oops! error ${response.status}!`);
      const children = await response.json();
      setChildren(children)
      console.log(children)
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
}
  async function handleClick(e) {
    e.preventDefault()
    await getChildren()
  }
  async function changeStoryPoint(e){
    await setID(e.target.value)
  }

   return (
    <div className="viewstorypoint">
      <h2>{storypoint?.title}</h2>
      {storypoint?.content}<br />
      <button onClick={(e) => handleClick(e)}>see options</button><br />
    {children && children.map((c) => <div><button value={c.id} onClick={(e) => changeStoryPoint(e)}>{c.title}</button></div>)}
    <CreateStoryPoint id={storypoint?.id}/>
      
      
    </div>
  )
}
