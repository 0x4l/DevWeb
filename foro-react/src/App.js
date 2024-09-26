// App.js
import React from 'react';
import './App.css';
import AuthForm from './components/AuthForm';
import Forum from './components/Forum';
import newLogo from './components/assets/logo.png';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="header-left">
          <img src={newLogo} className="App-logo" alt="logo" />
          <h1>ConnecTdea</h1>
        </div>
        <div className="header-right">
          <AuthForm />
        </div>
      </header>
      
      <div className="forum-container">
        <Forum />
      </div>

      <footer>
        <p>&copy; 2024 ForoTech. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default App;