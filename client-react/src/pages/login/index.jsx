import React, { useEffect } from "react";
import LoginComponent from "../../components/login";
import { useNavigate } from 'react-router-dom';

const LoginPage = (props) => {

    const navigate = useNavigate();

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
        <LoginComponent/>
    );
}

export default LoginPage;