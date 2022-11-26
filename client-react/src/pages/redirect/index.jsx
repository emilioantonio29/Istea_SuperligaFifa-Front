import React, {useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";

const RedirectPage = () => {

    const navigate = useNavigate();

    useEffect(()=>{

        navigate("/home")

        //Mount: 
    
        return () =>{
        //Unmount
    
        }
    }, [])

    return (  
        <>
        </>
    );
}

export default RedirectPage;