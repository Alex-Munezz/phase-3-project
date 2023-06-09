import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './Home'
import Admin from './Admin'
import LoginAdmin from './LoginAdmin'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
   

    setUsername('');
    setPassword('');

    navigate('/Home');
  };

  return (
    <div className='login'>
      <fieldset>
        <h1>Hello.</h1>
        <br />
        <p>
          Welcome to book bloom. Please enter your username and password to continue:
        </p>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <input type="submit" value="Login" />
        </form>
        </fieldset>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/LoginAdmin" element={<LoginAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;
