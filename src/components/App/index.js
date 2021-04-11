import React from 'react';
import './App.scss';
import MovieSection from '../MovieSection';
import Search from '../Search';


const App = () => {
  return (
    <div className="app">
      <div className="titles">
      <h1 className="muvie-title">MUVIE</h1>
      <h2 className="muvie-subtitle">The Movie Database</h2>
      </div>
      <Search />
      <MovieSection />
      <div className="button-up"><i class="fas fa-arrow-up"></i><div>up to top</div></div>
    </div>
  );
}

export default App;
