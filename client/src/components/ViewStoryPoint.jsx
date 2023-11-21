import {useEffect, useState} from 'react'
import axios from "axios";
import CreateStoryPoint from '../pages/CreateStoryPoint';
import {Outlet} from 'react-router-dom'

export default function ViewStoryPoint({storypoint}) {


   return (
    <div className="viewstorypoint">
      <h2>{storypoint?.title}</h2>
      {storypoint?.content}
    {storypoint?.children}
      <CreateStoryPoint id={storypoint?.id}/>
      
      
    </div>
  )
}
