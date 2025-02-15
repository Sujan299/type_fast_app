import React, { useEffect, useState } from 'react'
import useAccess from '../utils/accessComp';
import socket from '../socket/socket'
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
const Multiplayer = () => {
  const navigate = useNavigate()
  const [access] = useAccess("http://localhost:3000/room");
  const user = useSelector((state) => state.userInformation.user);
  const [roomName, setRoomName] = useState("");
  const [roomCode, setRoomCode] = useState()
  const userId = user ? user.id : null;
  const handleCreateRoom = (e) => {
    e.preventDefault();
    socket.emit("create-room", { roomName, userId })
    setRoomName("")
    document.getElementById('my_modal_1').close();
    navigate("/playground");
  }
  const handleRoomCode =(e)=>{
    e.preventDefault();
    socket.emit("joinRoom", {roomCode, userId});
    setRoomCode("")
    document.getElementById('my_modal_2').close();
    navigate("/playground");
  }
  return (
    <div className='h-[50vh]'>
      {
        access && <div className=''>
          <div className='flex justify-between py-20 px-10'>
            <h2 className='text-3xl'>Multiplayer</h2>
            <button className="btn btn-wide bg-green-600" onClick={() => document.getElementById('my_modal_2').showModal()}>Join Room</button>
            <button className="btn btn-wide bg-green-600" onClick={() => document.getElementById('my_modal_1').showModal()}>Create Room</button>
            <dialog id="my_modal_2" className="modal">
              <div className="modal-box flex flex-col gap-4">
                <h3 className="font-bold text-lg">Join Room</h3>
                {/* <p className="py-4">Press ESC key or click the button below to close</p> */}
                <form method="dialog" className='flex flex-col gap-4 justify-center items-center' onSubmit={handleRoomCode}>
                  <input
                    type="text"
                    placeholder="Room Code"
                    className="input input-bordered input-primary w-full text-lg"
                    onChange={(e) => { setRoomCode(e.target.value) }}
                    value={roomCode}
                  />
                  <button className="btn btn-wide bg-green-600" type='submit'>Join Room</button>
                </form>
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_1" className="modal">
              <div className="modal-box flex flex-col gap-4">
                <h3 className="font-bold text-lg">Create room</h3>
                {/* <p className="py-4">Press ESC key or click the button below to close</p> */}
                <form method="dialog" className='flex flex-col gap-4 justify-center items-center' onSubmit={handleCreateRoom}>
                  <input
                    type="text"
                    placeholder="Room Name"
                    className="input input-bordered input-primary w-full text-lg"
                    onChange={(e) => { setRoomName(e.target.value) }}
                    value={roomName}
                  />
                  <button className="btn btn-wide bg-green-600" type='submit'>Create Room</button>
                </form>
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>

          </div>
        </div>
      }
    </div>
  )
}

export default Multiplayer