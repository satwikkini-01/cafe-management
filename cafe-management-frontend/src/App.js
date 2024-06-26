import React from 'react';
import Menu from './components/Menu';
import Order from './components/Order';
import Inventory from './components/Inventory';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Cafe Management System</h1>
      </header>
      <main>
        <Menu />
        <Order />
        <Inventory />
      </main>
    </div>
  );
};

export default App;