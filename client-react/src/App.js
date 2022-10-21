import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {useState} from 'react'
import HomePage from './pages/home';
import NotFoundPage from './pages/not-found';
import RegisterPage from './pages/register';
import PassRecoveryPage from './pages/password-recovery';
import LoginPage from './pages/login';
import { UserGlobalContext } from './contexts/user-contex';
import { UserGlobalContextMemorySpace } from './contexts/user-contex';

const App = () => {

  const {user} = useContext(UserGlobalContextMemorySpace);

  console.log(process.env.NODE_ENV)

  useEffect(()=>{

    //Mount:  

    return () =>{
    //Unmount

    }
  }, [])

  return (
    <>
      <BrowserRouter>
        {
          !user ?
          /* STACK NOT LOGGED IN */
          <Routes>
            <Route path='/' element={<LoginPage/>}/>
            <Route path='/register' element={<RegisterPage/>}/>
            <Route path='/password-recovery' element={<PassRecoveryPage/>}/>
            <Route path='*' element={<NotFoundPage/>}/>
          </Routes>

          :

          /* STACK USER LOGGED IN */
          <Routes>
            <Route path='/' element={<HomePage/>}/>
          </Routes>
        }
      </BrowserRouter>
    </>
  );
}

export default App;
