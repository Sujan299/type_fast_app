import React,{useState} from 'react'
import socket from '../socket/socket'
import JoinRoom from './JoinRoom';

const Multiplayer = () => {
  const [roomName, setRoomName] = useState("");
  const userId= "67a3906e6e717d70a561e65b";
  const createRoom = ()=>{
    socket.emit("create-room", {roomName, userId})
  }
  return (
    <div>
      <JoinRoom/>
      <form onSubmit={createRoom}>
      <input type="text" onChange={(e)=>{setRoomName(e.target.value)}} />
      <button type="submit">Create Room</button>
      </form>
    </div>
  )
}

export default Multiplayer