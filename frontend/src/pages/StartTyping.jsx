import React,{useEffect, useState} from 'react'
import socket from '../socket/socket'
const StartTyping = () => {
    const [content, setContent] = useState("");
    const [userText, setUserText] = useState("");
    const [room, setRoom] = useState();
    const [status, setStatus] = useState(true);
    console.log(status)
    useEffect(()=>{
        socket.on("connect", ()=>{
            console.log(`A user get connected : ${socket.id}`);
        })
        socket.emit("askForContent");
        socket.on("send-sentence", (data)=>{
            setContent(data)
        })
    },[]);
    useEffect(()=>{
      let progress;
            const calculateProgress = () => {
                const correctChars = content.split('').filter((c, i) => c === userText[i]).length;
                progress = (correctChars / content.length) * 100;
                const timeTaken = (Date.now() - 1738985074211) / 1000;
                const wpm = (correctChars / 5) / (timeTaken / 60);
                socket.emit('userProgress', { roomCode :"11X8IO",userId: "67a390bf6e717d70a561e660", progress, wpm });
              };
              userText.length > 0 && calculateProgress();
              if(progress === 100){
                // send here again roomCode
                socket.emit("endOfRace",  "11X8IO");
              }
              socket.on('leaderBoardResult', (data)=>{
                const participants = data;
                setRoom(participants);
              });
              socket.on("statusOfRoom", (data)=>{
                const status = data;
                if(!status){
                  setStatus(status)
                }
              })
    },[userText]);
    const handleText = (e)=>{
        setUserText(e.target.value)
    }
  return (
    <div>
        {/* <TypingBox/>*/}
        {content}
        <input type="text" value={userText} onChange={handleText} disabled={!status}/>

        <button>Start</button>
    </div>
  )
}

export default StartTyping