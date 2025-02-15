import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Multiplayer from './pages/Multiplayer';
import Navbar from './components/Navbar';
import StartTyping from './pages/StartTyping';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/multiplayer' element={<Multiplayer />} />
        <Route path='/start_typing' element={<StartTyping />} />
      </Routes>
      <div>App</div>
    </Router>
  );
};

export default App;
