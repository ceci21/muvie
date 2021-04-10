import React from 'react';
import './App.scss';
import MovieSection from '../MovieSection';
import Search from '../Search';
import ScrollToTopBtn from '../ScrollToTopBtn';

const App = () => (
  <div className="app">
    <div className="titles">
      <h1 className="muvie-title">MUVIE</h1>
      <h2 className="muvie-subtitle">The Movie Database</h2>
    </div>
    <Search />
    <MovieSection />
    <ScrollToTopBtn />
  </div>
);

export default App;
