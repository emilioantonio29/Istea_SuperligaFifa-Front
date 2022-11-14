import { createContext, useState, useEffect } from "react";
import { loginSession } from "../utils/hooks/general-axios";
import axios from "axios";

// memory space created
export const UserGlobalContextMemorySpace = createContext();

export const UserGlobalContext = ({children}) =>{

    const [user, setUser] = useState(null);
    const [mainLoader, setMainLoader] = useState(true);

    const logout = () =>{
        setUser(null);
        localStorage.clear();
    }

    useEffect(()=>{
        //Mount: 

        let sessionLocal = localStorage.getItem("superligaenc");


        if(sessionLocal){

            loginSession(sessionLocal)
                .then((res)=>{

                    if(res && res.status && res.status == 200 && res.data.user){
                        localStorage.clear();
                        setUser(res.data.user);
                        localStorage.setItem("superligaenc", res.data.user.session);
                        setMainLoader(false);
                    }else{
                        localStorage.clear();
                        setMainLoader(false);
                    }
                    
                })
                .catch((err)=>{
                    localStorage.clear();
                    setMainLoader(false);
                })

        }else{
            setMainLoader(false)
        }

        
        return () =>{
        //Unmount

        }
      }, [])

    return(
        <UserGlobalContextMemorySpace.Provider 
            value={
                {
                    user, setUser, 
                    mainLoader, setMainLoader,
                    logout
                }}>
            {children}
        </UserGlobalContextMemorySpace.Provider>
    );
}