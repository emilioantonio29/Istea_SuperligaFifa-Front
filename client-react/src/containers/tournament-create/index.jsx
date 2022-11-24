import React, {useState, useContext, useEffect} from "react";
import Swal from "sweetalert2";
import { getTournamentsAdmin } from "../../utils/hooks/general-axios";
import CommonSpacer from "../../components/common/spacer";
import { spaceValidator } from "../../utils/hooks/regex-validator";
import { nameValidator } from "../../utils/hooks/regex-validator";
import { createTournament } from "../../utils/hooks/general-axios";
import { UserGlobalContextMemorySpace } from "../../contexts/user-contex";
import Overlay from "../../components/overlay";

const TournamentCreateContainer = () => {

    const {logout} = useContext(UserGlobalContextMemorySpace);

    const [nombre, setNombre] = useState("");
    const [liga, setLiga] = useState("");
    const [cantidadJugadores, setCantidadJugadores] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [loader, setLoader] = useState("");

    const cleanForm = () =>{
        setNombre("");
        setLiga("");
        setCantidadJugadores("");
    }

    const handleCreateTournament = async (event) =>{

        event.preventDefault();

        if(!nombre || !liga || !cantidadJugadores){
            setErrorMsg("• Por favor ingresa los datos solicitados.")
        }else{

            setErrorMsg("")
            setLoader(true);

            let token = localStorage.getItem("superligaenc");

            let res = await createTournament(token, cantidadJugadores, liga, nombre)
            // console.log(res.response.data.error.expired)
            if(res.status ==200){
                await Swal.fire({
                    allowOutsideClick: false,
                    icon: 'success',
                    title: '<h5 style="color: #B88CB8">¡Torneo creado exitosamente!</h5>',
                    text: "Ahora solo falta que los jugadores se inscriban para realizar la asignación de fechas.",
                    confirmButtonColor: '#B88CB8',
                    confirmButtonText: 'Continuar'
                })
                setLoader(false);
                event.target.reset();
                cleanForm();

            }else if(res.response.data.error.expired){
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
    }
    
    useEffect(()=>{

        //Mount: 
    
        return () =>{
        //Unmount
    
        }
    }, [])

    return (  
        <>
            {loader?<Overlay/>:null}
            <div className="d-flex flex-column align-items-center" style={{minHeight: "40vh", marginTop: "10vh"}}>
                <div className="d-flex flex-column">
                    <form className="d-flex flex-column justify-content-center form-login" onSubmit={handleCreateTournament}>
                        <div className="form-group form-group-login d-flex justify-content-center">
                            <input 
                                maxLength={15}
                                onChange={(e)=> 
                                    setNombre((!nombre ? nameValidator(e.target.value)  
                                    : spaceValidator(e.target.value)))}  
                                value={nombre} 
                                type="text" 
                                className="form-control input-login" 
                                placeholder="Nombre del torneo"/>
                        </div>
                        <CommonSpacer marginBottom="20px"/>
                        <div className="form-group form-group-login d-flex justify-content-center">
                            <select 
                                onChange={(e)=> setLiga(e.target.value)} 
                                className={`form-control input-login input-login`}
                            >
                                <option className='option-default-size' value=""  hidden>Liga</option>
                                <option value="LaLiga">LaLiga - España</option>
                                <option value="Serie A">Serie A - Italia</option>
                                <option value="Premier League">Premier League - Inglaterra</option>
                            </select>
                        </div>
                        <CommonSpacer marginBottom="20px"/>
                        <div className="form-group form-group-login d-flex justify-content-center">
                            <select 
                                onChange={(e)=> setCantidadJugadores(e.target.value)} 
                                className={`form-control input-login input-login`}
                            >
                                <option className='option-default-size' value=""  hidden>Cantidad de Jugadores</option>
                                <option value="4">4</option>
                                <option value="6">6</option>
                                <option value="8">8</option>
                                <option value="10">10</option>
                                <option value="12">12</option>
                                <option value="14">14</option>
                                <option value="16">16</option>
                                <option value="18">18</option>
                                <option value="20">20</option>
                            </select>
                        </div>
                        <CommonSpacer marginBottom="20px"/>
                        {loader ? 
                        <>
                            <button className="btn">
                                <span className="spinner-grow spinner-grow-sm"></span>
                                <span className="spinner-grow spinner-grow-sm"></span>
                                <span className="spinner-grow spinner-grow-sm"></span>
                            </button>
                        </> 
                        : 
                        <>
                            <div className="form-group form-group-login d-flex justify-content-center">
                                <input type="submit" className="btn btn-primary input-login input-submit" value="Crear Torneo"/>
                            </div>
                        </>
                        }
                        <CommonSpacer marginBottom="20px"/>
                        <p style={{color: "#B88CB8", textAlign:"center"}}>{errorMsg}</p>
                    </form>
                </div>
            </div>
        </>
    );
}

export default TournamentCreateContainer;