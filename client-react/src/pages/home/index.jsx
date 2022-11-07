import React, {useState, useContext} from "react";
import { UserGlobalContextMemorySpace } from "../../contexts/user-contex";

const HomePage = () => {

    const {user, setUser} = useContext(UserGlobalContextMemorySpace);

    return (  
        <>
            HOME PAGE
            <button onClick={()=>{console.log(user)}}>testing</button>
        </>
    );
}

export default HomePage;