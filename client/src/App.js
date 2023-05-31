import React from 'react';
import { Routes, Route } from 'react-router-dom'

import './App.css';
import Signup from './components/signup_component';
import Login from './components/login_component';
import UserDetails from './components/userDetails';

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn")
  return (
    <>
      <div className='App'>
        <div className='auth-wrapper'>
          <div className='auth-inner'>
            <Routes>
              <Route exact path='/' element={ isLoggedIn==='true' ? <UserDetails /> :<Login /> } />
              <Route exact path='/login' element={ <Login /> } />
              <Route exact path='/signup' element={ <Signup /> } />
              <Route exact path='/userDetails' element={ <UserDetails /> } />
            </Routes>
          </div>
        </div>
      </div>
    
    </>
  );
}

export default App;
