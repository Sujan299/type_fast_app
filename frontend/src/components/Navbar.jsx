import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        <ul>
            <li>
                <Link to='/multiplayer'>Go to multiplayer</Link>
                <Link to='/'>Home</Link>
                <Link to='/start_typing'>Start typing</Link>
            </li>
        </ul>
    </div>
  )
}

export default Navbar