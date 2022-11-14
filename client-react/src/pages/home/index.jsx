import React, {useState, useContext, useEffect} from "react";
import { UserGlobalContextMemorySpace } from "../../contexts/user-contex";
import { useNavigate } from 'react-router-dom';

const HomePage = (props) => {

    const navigate = useNavigate();

    const {user, setUser} = useContext(UserGlobalContextMemorySpace);

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
            <div style={{display: "flex", flexDirection: "column", minHeight: "85vh"}} className='container'>
                <div className="jumbotron bg-light" style={{borderRadius: "20px", marginTop: "20px"}}>
                    <div className="container">
                        <h1 className="display-4">TORNEOS</h1>
                        <br/>
                        <p><i className="bi bi-dot"></i> NEXT SOON</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomePage;