import React from 'react';
import './App.scss';
import MovieSection from '../MovieSection';
import Search from '../Search';


const App = () => {
  return (
    <div className="app">
      <Search />
      <MovieSection />
    </div>
  );
}

export default App;
