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
import CommonMainLoader from './components/common/main-loader';
import NavBarComponent from './components/navbar';
import FAQPage from './pages/faq';
import ProfilePage from './pages/profile';
import FooterComponent from './components/footer';

const App = () => {

  const {user, mainLoader} = useContext(UserGlobalContextMemorySpace);

  // console.log(process.env.NODE_ENV)

  useEffect(()=>{

    //Mount:  

    return () =>{
    //Unmount

    }
  }, [])

  return (
    <>

      {mainLoader ? <CommonMainLoader/>
      
      :

      <BrowserRouter>
        {
          !user ?
          /* STACK NOT LOGGED IN */
          <>
            <Routes>
              <Route path='/' element={<LoginPage/>}/>
              <Route path='/register' element={<RegisterPage/>}/>
              <Route path='/passwordrecovery' element={<PassRecoveryPage/>}/>
              <Route path='*' element={<LoginPage redirect={true}/>}/>
            </Routes>      
          </>
          :
          /* STACK USER LOGGED IN */
          <>
            <NavBarComponent/>
            <Routes>
              <Route path='/home' element={<HomePage/>}/>
              <Route path='/faq' element={<FAQPage/>}/>
              <Route path='/profile' element={<ProfilePage/>}/>
              <Route path='*' element={<HomePage redirect={true}/>}/>
            </Routes>
            <FooterComponent/>
          </>
        }
      </BrowserRouter>

      }


    </>
  );
}

export default App;
