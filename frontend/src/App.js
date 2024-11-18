import React from 'react';
import MapApp from './Components/MapApp'
import ShowPath from "./ShowPath"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div>
      <Router>
        <div className='App'>
          <Routes>
            <Route path='/showpath' element={<ShowPath />} />
            <Route path='/' element={<MapApp />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
