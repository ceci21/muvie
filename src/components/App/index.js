import React from 'react';
import './App.scss';
import MovieSection from '../MovieSection';
import Search from '../Search';


const App = () => {
  return (
    <div className="app">
      <h1 className="muvie-title">MUVIE</h1>
      <h2 className="muvie-subtitle">The Pokedex for movies</h2>
      <Search />
      <MovieSection />
    </div>
  );
}

export default App;
