import React, { useEffect, useState } from 'react'
import useAccess from '../utils/accessComp'
import socket from '../socket/socket'
import { io } from "socket.io-client";
const PlayGround = () => {
    const [access] = useAccess("https://type-fast-backend.onrender.com/room/playground");
    const [data, setData] = useState({});
    const [users, setUsers] = useState([]);
    console.log(data)
    useEffect(() => {
        socket.on("sendingRoom", (obj) => {
            console.log(obj)
            setData(obj);
            console.log(obj)
            socket.emit("getAllUsers", obj.roomCode);
        })
        socket.on("sendAuser", (objUser) => {
            console.log(objUser);
            setUsers(objUser);
        });
        socket.on("updateInterface", (data)=>{
            console.log(data)
            socket.emit("getAllUsers", data.roomCode);
        })
        // Cleanup function to prevent duplicate listeners
        return () => {
            socket.off("sendingRoom");
            socket.off("sendAuser");
            socket.off("updateInterface")
        };
    }, [])
    const handleStart = ()=>{
        
    }
    return (
        <div>
            {
                access && <div className='py-10 px-10'>
                    <div>
                        <textarea class="w-full h-[20vh] p-3 bg-gray-900 focus:outline-none focus:ring-2 rounded-md shadow-sm resize-none" placeholder="Type here..."></textarea>
                    </div>
                    <div className="flex w-full flex-col lg:flex-row mt-10 h-[55vh]">
                        <div className="card bg-base-300 rounded-box grid h-full flex-1">
                            {/* If start button clicks hide it and render race component to see live winning */}
                            <div className='p-6'>
                                <span>Players</span> | <span>{data.name}</span> | <span>{data.roomCode}</span>
                                <div className='bg-black h-[300px] mt-8 rounded-md overflow-y-auto p-5'>
                                    {/* Your content goes here */}
                                    <ul className='flex flex-col gap-2'>
                                        {
                                            users.map((i, index) => {
                                                return <li className='text-2xl bg-gray-800 px-3 rounded-md h-12 flex items-center'>
                                                    <div className="avatar online">
                                                        <div className="w-8 rounded-full mr-5">
                                                            <img src={i.image} />
                                                        </div>
                                                    </div>
                                                    <div className='flex flex-col ml-2'>
                                                        <span className='text-xl font-semibold'>{i.username}</span>
                                                        <span className='text-sm'>Range</span>
                                                    </div>
                                                </li>
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="divider lg:divider-horizontal"></div>
                        <div className="card bg-base-300 rounded-box grid h-full flex-1 place-items-center grid-cols-2 gap-4">
                            <div className='text-4xl flex flex-col gap-4 items-center'>
                                <h2 className="underline">Accuracy</h2>
                                <p>80%</p>
                            </div>
                            <div className='text-4xl flex flex-col gap-4 items-center'>
                                <h2 className="underline">WPM</h2>
                                <p>2.045554343</p>
                            </div>
                            <div className='text-4xl flex flex-col gap-4 items-center'>
                                <h2 className="underline">Rank</h2>
                                <p>3</p>
                            </div>
                            <div>
                                <button type="submit" className='btn btn-wide bg-green-600' onClick={handleStart}>Start</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default PlayGround