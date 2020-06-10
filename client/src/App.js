import React from 'react';
import './App.css';
import Header from './components/layout/Header';
import Home from './components/pages';
import AppState from './context/app/AppState';

const App = () => {
  return (
    <AppState>
      <main>
        <Header />
        <Home />
      </main>
    </AppState>
  );
};

export default App;
