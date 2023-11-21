import React from 'react'
import { Link } from 'react-router-dom'


export default function UserPage() {
  

  async function getCharacters() {

  }
  
  return (
    <div>
      <h2> WELCOME </h2>
    <br />
    <Link to="/createCharacter">create new character</Link>

    

    </div>
  )
}
