import React, {useState, useContext, useEffect} from "react";
import Swal from "sweetalert2";
import { getTournamentsPlayer } from "../../utils/hooks/general-axios";
import '../tournament-admin/containers-tournamentadmin.scss';
import { UserGlobalContextMemorySpace } from "../../contexts/user-contex";
import {BiLabel} from 'react-icons/bi';
import {BiErrorCircle} from 'react-icons/bi';
import CommonSpacer from "../../components/common/spacer";
import Overlay from "../../components/overlay";
import DrawerPlayerComponent from "../../components/drawer-player";

const TournamentJugadorContainer = () => {

    const {logout} = useContext(UserGlobalContextMemorySpace);

    const [loader, setLoader] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [tournamentArray, setTournamentArray] = useState([]);


    const getPlayerTournaments = async (token) => {

        setLoader(true)
        let res = await getTournamentsPlayer(token)

        // console.log("res", res.data)

        if(res.status == 200){
            setTournamentArray(res.data.tournaments)
            setLoader(false);

        }else if(res.response && res.response.data && res.response.data.error && res.response.data.error.expired){
            logout();
            await Swal.fire({
                allowOutsideClick: false,
                icon: 'info',
                title: '<h5 style="color: #B88CB8">¡Tu sesión expiró!</h5>',
                text: "Por favor inicia sesión nuevamente.",
                confirmButtonColor: '#B88CB8',
                confirmButtonText: 'Continuar'
            })
        }else{
            setLoader(false);
            setErrorMsg("• Ocurrió un error al crear el torneo, por favor intenta en unos minutos.")
        }

    }

    useEffect(()=>{
        //Mount: 
        let token = localStorage.getItem("superligaenc");

        getPlayerTournaments(token)
    
        return () =>{
        //Unmount
    
        }
    }, [])

    return (  
        <>
            {loader ? <Overlay/>:null}
            <div className="d-flex flex-column align-items-center" style={{minHeight: "40vh", marginTop: "10vh", marginBottom: "5vh"}}>
                <div className="d-flex flex-column">
                    {loader ? 
                        <div style={{paddingTop: "10vh"}}>
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
                                                                <h6 className="card-subtitle mb-2 text-muted"><span style={{fontWeight: "bolder"}}>Cupos: </span>{data.cantidadjugadores}</h6>
                                                                <h6 className="card-subtitle mb-2 text-muted"><span style={{fontWeight: "bolder"}}>Inscriptos: </span>{data.jugadores.length}</h6>
                                                                {/* <p className="card-text">Lorem Ipsum description.</p> */}
                                                                <CommonSpacer marginBottom="20px"/>
                                                                <div className="d-flex justify-content-center">
                                                                    <DrawerPlayerComponent data={data}/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </>
                                            :
                                            <>
                                                <div style={{paddingTop: "10vh"}}>
                                                    <p style={{color: "#B88CB8", textAlign:"center", fontSize: "18px", fontWeight: "bold"}}>• No te encuentras inscripto en ningun torneo.</p>
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

export default TournamentJugadorContainer;