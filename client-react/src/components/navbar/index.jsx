import React, {useContext} from "react";
import {BiJoystick} from 'react-icons/bi'
import { NavLink } from "react-router-dom"; 
import './components-navbar.scss';
import { UserGlobalContextMemorySpace } from "../../contexts/user-contex";

const NavBarComponent = () => {

  const {logout} = useContext(UserGlobalContextMemorySpace);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light link-active">
        <div className="d-flex container justify-content-between">
          <div className="navbar-collapse center-box" id="navbarText" style={{width: "100%"}}>
            {/* <img style={{height: "9vh", marginLeft: "-22px"}} src={logo} className="App-logo" alt="logo" /> */}
            <BiJoystick size='100px' style={{color: "purple"}}/>
            <span className="navbar-text my-2 my-sm-0">
              Superliga FIFA
            </span>
          </div>
          <div className="navbar-collapse center-box" id="navbarText" >
            <ul className="navbar-nav ">
              <li className="nav-item">
                <NavLink to="/home" className={({ isActive }) => (isActive ? 'link-active' : 'text-link')} exact activeclassname="link-active">Torneos</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={`/profile`} className={({ isActive }) => (isActive ? 'link-active' : 'text-link')} exact activeclassname="link-active">Perfil</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={`/faq`} className={({ isActive }) => (isActive ? 'link-active' : 'text-link')} exact activeclassname="link-active">FAQ</NavLink>
              </li>
            </ul>
          </div>
          <div className="navbar-collapse center-box" id="navbarText" style={{width: "100%"}}>
            <div style={{width: "100%"}}>
              <ul className="navbar-nav ">
                <li className="nav-item close-session" style={{width: "100%"}}>
                  <NavLink onClick={logout}  className={"text-link"}>Cerrar Sesión</NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className=" navbar-collapse" id="navbarText">
            <span className="navbar-text" style={{alignText: "right"}}>
            </span>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBarComponent;