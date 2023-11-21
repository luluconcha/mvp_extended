import {useEffect, useState} from 'react'
import axios from "axios";
import CreateStoryPoint from '../pages/CreateStoryPoint';


export default function ViewStoryPoint({storypoint}) {

  

 

   return (
    <div>
   {storypoint?.title}
   {storypoint?.content}
   <button>create a new story point</button>
    </div>
  )
}
