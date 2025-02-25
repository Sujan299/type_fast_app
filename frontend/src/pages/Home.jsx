import React, {useState, useEffect, useMemo} from 'react'
import {io} from 'socket.io-client';


const Home = () => {
  const [typedText, setTypedText] = useState("")
  const [liveResults, setLiveResults] = useState({})
  const [testContent, setTestContent] = useState("")
  useEffect(() => { 
    const socket = io("https://type-fast-backend.onrender.com")
    socket.on("connect", () => {
      console.log(`User: ${socket.id} connected successfully!`);
      socket.emit("askingForTest")
    });
  
    // Fetch test content
    socket.on("testContent", (content) => {
      console.log("Received test content:", content);
      setTestContent(content);
    });
  
    socket.on("liveResults", (data) => {
      setLiveResults(prev => ({ ...prev, [data.userId]: data }));
    });
  
    return () => {
      socket.off("testContent"); // Cleanup the listener
      socket.off("liveResults");
      socket.disconnect();
    };
  }, []);
  
  const startTyping = ()=>{
    socket.emit("startTime", "Start time")
  }
  const typing = (e)=>{
    setTypedText(e.target.value)
    socket.emit("typing", typedText)
  }
  
  return (
    <div>
        <p>Input here !</p>
        <p>content: {testContent}</p>
      <input type="text" onChange={typing} value={typedText} />
      <button onClick={startTyping}>Start test</button>
      <p>
       {Object.entries(liveResults).map(([userId, data]) => (
          <div key={userId}>
            User {userId.slice(0, 5)}: {data.wpm} WPM, {data.accuracy}%
          </div>
        ))}
      </p>

    </div>
  )
}

export default Home