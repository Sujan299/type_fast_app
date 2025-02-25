import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const PublicTyping = ({ func }) => {
    const [typedText, setTypedText] = useState("");
    const [liveResults, setLiveResults] = useState({});
    const [testContent, setTestContent] = useState("");
    const [start, setStart] = useState(false)
    const socketRef = useRef(null); // Store socket reference

    useEffect(() => {
        socketRef.current = io("http://localhost:3000");

        socketRef.current.on("connect", () => {
            console.log(`User: ${socketRef.current.id} connected successfully!`);
            socketRef.current.emit("askingForTest");
        });

        socketRef.current.on("testContent", (content) => {
            console.log("Received test content:", content);
            setTestContent(content);
        });

        socketRef.current.on("liveResults", (data) => {
            setLiveResults(prev => ({ ...prev, [data.userId]: data }));
        });

        return () => {
            socketRef.current.off("testContent");
            socketRef.current.off("liveResults");
            socketRef.current.disconnect();
        };
    }, []);

    const startTyping = () => {
        socketRef.current.emit("startTime", "Start time");
        setStart(true)
    };

    const typing = (e) => {
        const newTypedText = e.target.value;
        setTypedText(newTypedText);
        socketRef.current.emit("typing", newTypedText);
    };

    return (
        <div className="h-[100vh] p-10">
            <button className="btn" onClick={() => func(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back
            </button>
            <div className='my-4 text-xl'>{testContent}</div>
            <div className="my-8">
                <textarea
                    onChange={typing}
                    value={typedText}
                    className="w-full h-[20vh] p-3 bg-gray-900 focus:outline-none focus:ring-2 rounded-md shadow-sm resize-none"
                    placeholder="Type here..."
                />
            </div>
            <button className={`btn btn-wide`} onClick={startTyping} disabled={start}>Start</button>

            {Object.entries(liveResults).map(([userId, data]) => (
                <div className="flex w-full flex-col lg:flex-row mt-10 h-[35vh]" key={userId}>
                    <div className="card bg-base-300 rounded-box grid h-full flex-1 place-items-center grid-cols-2 gap-4 p-6 shadow-lg">
                        <div className="text-4xl flex flex-col gap-4 items-center">
                            <h2 className="underline font-semibold text-primary">Accuracy</h2>
                            <p className="text-secondary font-bold">{data.accuracy}%</p>
                        </div>
                        <div className="text-4xl flex flex-col gap-4 items-center">
                            <h2 className="underline font-semibold text-primary">WPM</h2>
                            <p className="text-secondary font-bold">{data.wpm}</p>
                        </div>
                    </div>
                    <div className="divider lg:divider-horizontal">&</div>
                    <div className="card bg-base-300 rounded-box grid h-full flex-1 place-items-center grid-cols-1 gap-4 p-6 shadow-lg">
                        <div className="text-6xl flex flex-col gap-4 items-center">
                            <h2 className="underline font-semibold text-primary">Net Speed</h2>
                            <p className="text-secondary font-bold">{(data.wpm * data.accuracy) / 100}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PublicTyping;
