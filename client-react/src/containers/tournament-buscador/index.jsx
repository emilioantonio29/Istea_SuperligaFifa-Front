import React, {useState, useContext, useEffect} from "react";
import Swal from "sweetalert2";
import { getOpenTournamentsPlayer, registerPlayerInOpenTournament } from "../../utils/hooks/general-axios";
import '../tournament-admin/containers-tournamentadmin.scss';
import { UserGlobalContextMemorySpace } from "../../contexts/user-contex";
import {BiLabel} from 'react-icons/bi';
import {BiErrorCircle} from 'react-icons/bi';
import {BiFileFind} from 'react-icons/bi';
import CommonSpacer from "../../components/common/spacer";
import { nameValidator, spaceValidator } from "../../utils/hooks/regex-validator";
import Overlay from "../../components/overlay";
import Tooltip from '@mui/material/Tooltip';

const TournamentBuscadorContainer = () => {

    const {logout, user} = useContext(UserGlobalContextMemorySpace);

    const [loader, setLoader] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [tournamentArray, setTournamentArray] = useState([]);
    const [buscador, setBuscador] = useState("");


    const getPlayerOpenTournaments = async (filter) => {
        setBuscador("");

        let token = localStorage.getItem("superligaenc");

        setLoader(true)
        let res = await getOpenTournamentsPlayer(token, filter ? filter : "all")

        // console.log("res", res.data)

        if(res.status == 200){
            setTournamentArray(res.data.tournaments)
            setLoader(false);

        }else if(res.response.data && res.response.data.error && res.response.data.error.expired){
            logout();
            Swal.fire({
                allowOutsideClick: false,
                icon: 'info',
                title: '<h5 style="color: #B88CB8">¡Tu sesión expiró!</h5>',
                text: "Por favor inicia sesión nuevamente.",
                confirmButtonColor: '#B88CB8',
                confirmButtonText: 'Continuar'
            })
        }else{
            setLoader(false);
            setErrorMsg("• Ocurrió un error en la busqueda de torneos, por favor intenta en unos minutos.")
        }

    }

    const handleFindTournament = async (event) =>{
        event.preventDefault();

        getPlayerOpenTournaments(buscador);
    }

    const handleKeyDown = async (event) =>{
        // event.preventDefault();

        if (event.key === 'Enter') {
            handleFindTournament();
        }

    }

    const handlerInscribirse = async (data) =>{
        setBuscador("");

        let token = localStorage.getItem("superligaenc");

        //token = "8deb1d317f53794a53618c6b129156e24f1b23675f343a3a7425c8585d77e851291be1a88e8392678b60e64b76eaa4de2212383eb3b24aa5f1b6f1f3b2974d6b631200832f395e7559057a88da89a07f7a34e8e68a8c85a029389fca0d47d3b781359626de81025ab32196e1ad8be222f3fa54ef2920864c5fee426b4daf0a03601b483c2bc55d1745a06cb1d90c8c5efccd07eb9bc16431cfc0260496877f161d13e1ae5f65bd43f0505721d2501338cb1364a1e3863f8eda6f36524cd4c5af99d5e7a63a43e7d999bdc3506d817abd1c12428157224b3d26991083c9b435e0|5cc563e26cfc6395dd21af85ee21c77c"

        setLoader(true)
        let res = await registerPlayerInOpenTournament(token, data._id)
        // console.log("res", res)
        if(res.status == 200){
            
            setTournamentArray(res.data.tournaments)
            setLoader(false);

            Swal.fire({
                allowOutsideClick: false,
                icon: 'success',
                title: '<h5 style="color: #B88CB8">¡Inscripción realizada con éxito!</h5>',
                text: "Ya puedes ir a la seccion de Torneos Jugador para verificar tu inscripción. Te llegará una notificación cuando el administrador inicie el torneo.",
                confirmButtonColor: '#B88CB8',
                confirmButtonText: 'Continuar'
            })

        }else if(res.response.data && res.response.data.error && res.response.data.error.expired){
            logout();
            Swal.fire({
                allowOutsideClick: false,
                icon: 'info',
                title: '<h5 style="color: #B88CB8">¡Tu sesión expiró!</h5>',
                text: "Por favor inicia sesión nuevamente.",
                confirmButtonColor: '#B88CB8',
                confirmButtonText: 'Continuar'
            })
        }else{

            let msg = res.response.data ? `• ${Object.values(res.response.data)[0]}` : "• Ocurrió un error en la inscripción, por favor intenta en unos minutos."

            setLoader(false);
            // console.log(res)
            setErrorMsg(`${msg}`)
            Swal.fire({
                allowOutsideClick: false,
                icon: 'info',
                title: '<h5 style="color: #B88CB8">¡Opps!</h5>',
                text:  msg,
                confirmButtonColor: '#B88CB8',
                confirmButtonText: 'Continuar'
            })
        }

    }

    useEffect(()=>{
        //Mount: 

        getPlayerOpenTournaments("all")
    
        return () =>{
        //Unmount
    
        }
    }, [])

    return (  
        <>
            {loader ? <Overlay/>:null}
            <div className="d-flex flex-column align-items-center" style={{minHeight: "40vh", marginTop: "10vh", marginBottom: "5vh"}}>
                <form className="" onSubmit={handleFindTournament} style={{width: "50vw"}}>
                    <div className="form-group form-group-login d-flex justify-content-center">
                        {/* <input 
                            maxLength={15}
                            onChange={(e)=> 
                                setBuscador((!nombre ? nameValidator(e.target.value)  
                                : spaceValidator(e.target.value)))}  
                            value={buscador} 
                            type="text" 
                            className="form-control input-login" 
                            placeholder="Busca un torneo por nombre"
                        /> */}
                        <div className="input-group mb-3">
                            <input 
                                maxLength={15}
                                onChange={(e)=> 
                                    setBuscador((!buscador ? nameValidator(e.target.value)  
                                    : spaceValidator(e.target.value)))}  
                                type="text" 
                                className="form-control" 
                                placeholder="Busca un torneo por nombre" 
                                aria-label="Busca un torneo por nombre" 
                                aria-describedby="basic-addon2"
                                value={buscador} 
                            />
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary" type="submit" onKeyDown={handleKeyDown}><BiFileFind size='35px' style={{color: "purple", fontWeight: "bolder"}}/></button>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="d-flex flex-column">
                    <CommonSpacer marginBottom="40px"/>
                    {loader ? 
                        <div style={{paddingTop: "10vh"}} className="d-flex flex-row justify-content-center">
                            <span style={{height: "25px", width: "25px"}} className="spinner-grow spinner-grow-sm"></span>
                            <span style={{height: "25px", width: "25px"}} className="spinner-grow spinner-grow-sm"></span>
                            <span style={{height: "25px", width: "25px"}} className="spinner-grow spinner-grow-sm"></span>
                        </div>
                    :
                        <>
                            {errorMsg ? 
                                <>
                                    <div style={{paddingTop: "10vh"}}>
                                        <p style={{color: "#B88CB8", textAlign:"center", fontSize: "18px", fontWeight: "bold"}}>{errorMsg}</p>
                                    </div>
                                </>
                                :
                                <>
                                    {tournamentArray ? 
                                    <>
                                        <div className="d-flex row justify-content-center" style={{paddingLeft: "20px", paddingRight: "20px"}}>
                                            {tournamentArray.length > 0 ? 
                                            <>
                                                {tournamentArray.map((data, index)=>{
                                                    return(
                                                        <div className="card card-tournamentadmin" key={index}>
                                                            <div className="card-body">
                                                                <div className="d-flex flex-column" style={{width: "100%"}}>
                                                                    <h5 className="card-title">{data.nombre} </h5>
                                                                    <h6 className="card-subtitle mb-2 text-muted">{data.owner}</h6>
                                                                    {data.cerrado ?
                                                                        <p><span><BiLabel size='14px' style={{color: "red", fontWeight: "bolder"}}/></span> cerrado</p>
                                                                        :
                                                                        data.cerrado == false && data.torneoid == "" ?
                                                                        <p><span><BiLabel size='14px' style={{color: "purple", fontWeight: "bolder"}}/></span> pendiente</p>
                                                                        :
                                                                        data.cerrado == false && data.torneoid !== "" ?
                                                                        <p><span><BiLabel size='14px' style={{color: "green", fontWeight: "bolder"}}/></span> en curso</p>
                                                                        :
                                                                        <p><span><BiErrorCircle size='14px' style={{color: "red", fontWeight: "bolder"}}/></span> error</p>
                                                                    }
                                                                </div>
                                                                <h6 className="card-subtitle mb-2 text-muted"><span style={{fontWeight: "bolder"}}>Liga: </span>{data.liga}</h6>
                                                                <h6 className="card-subtitle mb-2 text-muted"><span style={{fontWeight: "bolder"}}>Jugadores: </span>{data.cantidadjugadores}</h6>
                                                                {/* <p className="card-text">Lorem Ipsum description.</p> */}
                                                                <CommonSpacer marginBottom="20px"/>

                                                                {/* <Tooltip title="Ya no hay cupo en este torneo.">
                                                                    <div className="d-flex justify-content-center">
                                                                        <button onClick={()=>console.log(data)} className="btn btn-cardtournament">Inscribirse</button>
                                                                    </div>
                                                                </Tooltip> */}

                                                                {data.jugadores.indexOf(user.user.username) > -1 ?
                                                                    <>
                                                                        <Tooltip title="Ya te encuentras incripto en este torneo.">
                                                                            <div className="d-flex justify-content-center">
                                                                                <button disabled onClick={()=>{handlerInscribirse(data)}} className="btn btn-cardtournament">Inscribirse</button>
                                                                            </div>
                                                                        </Tooltip>
                                                                    </>
                                                                    :
                                                                    data.jugadores.length == data.cantidadjugadores ?
                                                                    <>
                                                                        <Tooltip title="Ya no hay cupo en este torneo.">
                                                                            <div className="d-flex justify-content-center">
                                                                                <button disabled onClick={()=>console.log(data)} className="btn btn-cardtournament">Inscribirse</button>
                                                                            </div>
                                                                        </Tooltip>
                                                                    </>
                                                                    :
                                                                    <>
                                                                        <div className="d-flex justify-content-center">
                                                                            <button onClick={()=>{handlerInscribirse(data)}} className="btn btn-cardtournament">Inscribirse</button>
                                                                        </div>
                                                                    </>
                                                                }

                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </>
                                            :
                                            <>
                                                <div style={{paddingTop: "10vh"}}>
                                                    <p style={{color: "#B88CB8", textAlign:"center", fontSize: "18px", fontWeight: "bold"}}>• No se encontraron torneos disponibles para inscripción.</p>
                                                </div>
                                            </>
                                            }
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div style={{paddingTop: "10vh"}}>
                                            <p style={{color: "#B88CB8", textAlign:"center", fontSize: "18px", fontWeight: "bold"}}>• Ocurrió un error al crear el torneo, por favor intenta en unos minutos.</p>
                                        </div>
                                    </>
                                    }
                                </>
                            }
                        </>
                    }
                </div>
            </div>
        </>
    );
}

export default TournamentBuscadorContainer;