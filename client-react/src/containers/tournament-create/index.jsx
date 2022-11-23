import React, {useState, useContext, useEffect} from "react";
import Swal from "sweetalert2";
import { getTournamentsAdmin } from "../../utils/hooks/general-axios";
import CommonSpacer from "../../components/common/spacer";
import { spaceValidator } from "../../utils/hooks/regex-validator";
import { nameValidator } from "../../utils/hooks/regex-validator";

const TournamentCreateContainer = () => {

    const [nombre, setNombre] = useState("");
    const [liga, setLiga] = useState("");
    const [cantidadJugadores, setCantidadJugadores] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [loader, setLoader] = useState("");

    const handleCreateTournament = (event) =>{

        event.preventDefault();

        if(!nombre || !liga || !cantidadJugadores){
            setErrorMsg("• Por favor ingresa los datos solicitados.")
        }else{
            setErrorMsg("")

        }

        console.log("create", nombre, liga, cantidadJugadores)
    }
    
    useEffect(()=>{

        //Mount: 
    
        return () =>{
        //Unmount
    
        }
    }, [])

    return (  
        <>
            <div className="d-flex flex-column align-items-center" style={{minHeight: "40vh", marginTop: "10vh"}}>
                <div className="d-flex flex-column">
                    <form className="d-flex flex-column justify-content-center form-login" onSubmit={handleCreateTournament}>
                        <div className="form-group form-group-login d-flex justify-content-center">
                            <input 
                                maxLength={25}
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
                                <input type="submit" className="btn btn-primary input-login input-submit" value="Continuar"/>
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