import React, {useContext, useState, useEffect} from "react";
import CommonSpacer from "../../components/common/spacer";
import {BiUserCircle} from 'react-icons/bi'
import { UserGlobalContextMemorySpace } from "../../contexts/user-contex";
import Tooltip from '@mui/material/Tooltip';


const ProfilePage = () => {
    const {user, setUser} = React.useContext(UserGlobalContextMemorySpace);
    console.log(user.user)
    return (  
        <>
            <div style={{display: "flex", flexDirection: "column", minHeight: "55vh", paddingTop: "100px"}} className='container'>
                <div className="jumbotron bg-light" style={{borderRadius: "20px", marginTop: "20px"}}>
                    <div className="container">
                        <div className="d-flex justify-content-center">
                            <h6 className="display-6" style={{alignText: "center"}}>PERFIL</h6>
                        </div>
                        <CommonSpacer marginTop={"20px"}/>
                        <div className="d-flex justify-content-center">
                            <BiUserCircle size='100px' style={{color: "purple"}}/>
                        </div>
                        <CommonSpacer marginTop={"20px"}/>
                        <div className="d-flex justify-content-center">
                            <div className="card" style={{width:"30vw"}}>
                                <div className="card-body">
                                    <h5 className="card-title">{user.user.name} {user.user.lastname}</h5>
                                    <p style={{marginTop: "20px"}} className="card-text">Perfil: <i>{user.user.admin ? "Administrador": "Jugador"}</i></p>
                                    <p className="card-text">Usuario: <i>{user.user.username}</i></p>
                                    <p className="card-text">Fecha de creación: <i>{user.user.createddate}</i></p>
                                    <p className="card-text">Torneos en curso: <i>-</i></p>
                                </div>

                                {user.user.admin ? 
                                <>
                                    <Tooltip title="Ya eres administrador.">
                                        <div className="d-flex justify-content-center">
                                            <div className="card-body d-flex justify-content-center">
                                                <button disabled className="btn btn-actions">Cambiar a Admin</button>
                                            </div>
                                        </div>                            
                                    </Tooltip>
                                </>
                                :
                                <>
                                    <div className="card-body d-flex justify-content-center">
                                        <button className="btn btn-actions">Cambiar a Admin</button>
                                    </div>
                                </>
                                }

                            </div>

                        </div>
                        <CommonSpacer marginBottom={"40px"}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfilePage;