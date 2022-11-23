import React, {useState, useContext, useEffect} from "react";
import { UserGlobalContextMemorySpace } from "../../contexts/user-contex";
import { useNavigate } from 'react-router-dom';
import styles from '../pages.scss'
import { Link } from "react-router-dom";
import CommonSpacer from "../../components/common/spacer";
import TournamentAdminContainer from "../../containers/tournament-admin";
import TournamentCreateContainer from "../../containers/tournament-create";
import TournamentJugadorContainer from "../../containers/tournament-jugador";
import TournamentBuscadorContainer from "../../containers/tournament-buscador";

const HomePage = (props) => {

    const navigate = useNavigate();

    const {user, setUser} = useContext(UserGlobalContextMemorySpace);
    const [activeLink1, setActiveLink1] = useState(false);
    const [activeLink2, setActiveLink2] = useState(user.user.admin ? false: true);
    const [activeLink3, setActiveLink3] = useState(false);
    const [activeLink4, setActiveLink4] = useState(user.user.admin ? true : false);


    const handleLink1 = () =>{
        setActiveLink1(true);
        setActiveLink4(false);
        setActiveLink2(false);
        setActiveLink3(false);
    }
    const handleLink2 = () =>{
        setActiveLink1(false);
        setActiveLink4(false);
        setActiveLink2(true);
        setActiveLink3(false);
    }
    const handleLink3 = () =>{
        setActiveLink1(false);
        setActiveLink4(false);
        setActiveLink2(false);
        setActiveLink3(true);
    }
    const handleLink4 = () =>{
        setActiveLink1(false);
        setActiveLink4(true);
        setActiveLink2(false);
        setActiveLink3(false);
    }

    useEffect(()=>{

        //Mount: 
        if(props.redirect){
            navigate("/home")
        }

    
        return () =>{
        //Unmount
    
        }
      }, [])

    return (  
        <>
            <div style={{display: "flex", flexDirection: "column", minHeight: "85vh", paddingTop: "100px"}} className='container'>
                <div className="jumbotron" style={{borderRadius: "20px", marginTop: "20px"}}>
                    <div className="d-flex flex-column">
                        <div className="submenu">
                            {user.user.admin ? <button className={activeLink4 ? "submenu-link submenu-link-active" : "submenu-link"} onClick={()=>handleLink4()}>Crear Torneo</button> : null }
                            {user.user.admin ? <button className={activeLink1 ? "submenu-link submenu-link-active" : "submenu-link"} onClick={()=>handleLink1()}>Torneos Admin</button> : null }                            
                            <button className={activeLink2 ? "submenu-link submenu-link-active" : "submenu-link"} onClick={()=>handleLink2()}>Torneos Jugador</button>
                            <button className={activeLink3 ? "submenu-link submenu-link-active" : "submenu-link"} onClick={()=>handleLink3()}>Buscar Torneos</button>
                        </div>
                        <CommonSpacer marginBottom="40px"/>
                        <div>

                            { activeLink1 ? <TournamentAdminContainer/> 
                            : activeLink4 ? <TournamentCreateContainer/> 
                            : activeLink2 ? <TournamentJugadorContainer/>
                            : activeLink3 ? <TournamentBuscadorContainer/>
                            : <></>
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomePage;