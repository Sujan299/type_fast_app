import React, { useState, useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import PlayGround from './pages/PlayGround'
import Multiplayer from './pages/Multiplayer'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Achievement from './pages/Achievement'
import History from './pages/History'



const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/multiplayer' element={<Multiplayer />} />
        <Route path='/achievement' element={<Achievement />} />
        <Route path='/history' element={<History />} />
        <Route path='/playground' element={<PlayGround />} />
        <Route path='/play' element={<TypingBox />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App


const TypingBox = () => {
  const sentence = "Hello world, this is a typing test to check speed and accuracy.";
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-2xl font-bold mb-4">Type the sentence:</h2>
      <div className="relative w-full max-w-xl p-2 text-lg overflow-hidden whitespace-nowrap border-b-2 border-gray-300">
        {sentence.split("").map((char, index) => {
          let color = "text-gray-500";
          if (index < inputValue.length) {
            color = inputValue[index] === char ? "text-white" : "text-red-500";
          }
          return (
            <span key={index} className={`${color} transition-all duration-150`}>{char}</span>
          );
        })}
      </div>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className="mt-4 p-2 border-2 border-gray-300 rounded-md w-full max-w-xl bg-transparent caret-white"
        autoFocus
      />
    </div>
  );
};

