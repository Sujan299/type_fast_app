import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Navbar = () => {
    // state is entire store of redux and userInformation is name of reducer
    const user = useSelector((state) => state.userInformation.user);
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><Link to='/'>Home</Link></li>
                        {/* <li>
                            <a>Parent</a>
                            <ul className="p-2">
                                <li><a>Submenu 1</a></li>
                                <li><a>Submenu 2</a></li>
                            </ul>
                        </li> */}
                        <li><a>Multiplayer</a></li>
                        <li><a>Leaderboard</a></li>
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost text-xl">Typing.fast</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><Link to='/'>Home</Link></li>
                    {/* <li>
                        <details>
                            <summary>Parent</summary>
                            <ul className="p-2">
                                <li><a>Submenu 1</a></li>
                                <li><a>Submenu 2</a></li>
                            </ul>
                        </details>
                    </li> */}
                    <li><Link to='multiplayer'>Multiplayer</Link></li>
                    <li><Link to='achievement'>Achievements</Link></li>
                    <li><Link to='history'>History</Link></li>
                </ul>
            </div>
            {
                user ? <div className="avatar navbar-end">
                    <div className="ring-primary ring-offset-base-100 w-8 rounded-full ring ring-offset-2">
                        <img src={user.image} />
                    </div>
                </div> : <div className="navbar-end">
                    <Link to='/signup' className="btn">Signup</Link>
                </div>
            }
        </div>
    )
}

export default Navbar