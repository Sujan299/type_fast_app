import React from 'react'
import socket from '../socket/socket'
const JoinRoom = () => {
    let userId = "67a390bf6e717d70a561e660"
    let roomCode = "11X8IO"
    const handleJoinRoom = ()=>{
        socket.emit("joinRoom", {roomCode, userId});
    }
    const handleLeaveRoom = ()=>{
        socket.emit("leaveRoom", {roomCode, userId})
    }
    return (
        <>
            <div>JoinRoom</div>
            <div onClick={handleJoinRoom}>Get In room</div>
            <div onClick={handleLeaveRoom}>Leave room</div>
        </>
    )
}

export default JoinRoom