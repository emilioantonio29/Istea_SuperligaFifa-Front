import React, {useState, useContext, useEffect} from "react";
import Swal from "sweetalert2";
import { getTournamentsAdmin } from "../../utils/hooks/general-axios";

const TournamentAdminContainer = () => {

    const getTournaments = async (token) =>{

        let data = await getTournamentsAdmin(token)

        console.log(data)


    }

    useEffect(()=>{

        let token = localStorage.getItem("superligaenc");

        getTournaments(token)

        //Mount: 
    
        return () =>{
        //Unmount
    
        }
    }, [])

    return (  
        <>
            TOURNAMENT ADMIN
        </>
    );
}

export default TournamentAdminContainer;