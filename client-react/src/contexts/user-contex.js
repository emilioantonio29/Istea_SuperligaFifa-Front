import { createContext, useState, useEffect } from "react";

// memory space created
export const UserGlobalContextMemorySpace = createContext();

export const UserGlobalContext = ({children}) =>{

    const [user, setUser] = useState(null);

    useEffect(()=>{
        //Mount: 

        
        return () =>{
        //Unmount

        }
      }, [])

    return(
        <UserGlobalContextMemorySpace.Provider 
            value={
                {
                    user, setUser
                }}>
            {children}
        </UserGlobalContextMemorySpace.Provider>
    );
}