import React, {useEffect} from "react";
import CommonSpacer from "../common/spacer";
import {BiListPlus} from 'react-icons/bi';
import {BiListMinus} from 'react-icons/bi';
import TestCollapseComponent from "../test-collapse";
import Collapse from "@mui/material/Collapse";
import Divider from '@mui/material/Divider';


const TournamentDetailComponent = (props) => {

    const [showJugadores, setShowJugadores] = React.useState(false);
    const [checked, setChecked] = React.useState(false);

    const handleChange = () => {
        setChecked((prev) => !prev);
    };

    return (  
        <>
            <Divider>
                <button className='btn btn-actions' onClick={handleChange}><span style={{fontWeight: "bold"}}>DETALLES</span></button>
            </Divider>
            <Collapse in={checked}>
                <div>
                    <CommonSpacer marginTop={"20px"}/>
                    <p><i className="bi bi-dot"></i> <span style={{fontWeight: "bold"}}>OWNER:</span> {props.data.owner}</p>
                    <p><i className="bi bi-dot"></i> <span style={{fontWeight: "bold"}}>NOMBRE DEL TORNEO:</span> {props.data.nombre}</p>
                    <p><i className="bi bi-dot"></i> <span style={{fontWeight: "bold"}}>ID:</span> {props.data._id}</p>
                    <p><i className="bi bi-dot"></i> <span style={{fontWeight: "bold"}}>ID CALENDARIO DE FECHAS:</span> {props.data.torneoid ? props.data.torneoid : "Aun no hay fechas asignadas."}</p>
                    <p><i className="bi bi-dot"></i> <span style={{fontWeight: "bold"}}>ESTADO DEL TORNEO:</span> {props.data.cerrado ? "Cerrado" : props.data.cerrado == false && props.data.torneoid == "" ? "Pendiente" : props.data.cerrado == false && props.data.torneoid !== "" ? "En curso" : "Error"}</p>
                    <p><i className="bi bi-dot"></i> <span style={{fontWeight: "bold"}}>LIGA:</span> {props.data.liga}</p>
                    <p><i className="bi bi-dot"></i> <span style={{fontWeight: "bold"}}>CUPOS:</span> {props.data.cantidadjugadores}</p>
                    <p><i className="bi bi-dot"></i> <span style={{fontWeight: "bold"}}>INSCRIPTOS:</span> {props.data.jugadores.length}</p>
                    <p><i className="bi bi-dot"></i> <span style={{fontWeight: "bold"}}>DETALLE DE INSCRIPTOS:</span> 
                        {!showJugadores ? 
                        <>
                            <button onClick={()=>{setShowJugadores(true)}} style={{background: "none", color: "inherit", font: "font", outline:"outline", border:"none"}}>
                            <BiListPlus size='30px' style={{color: "green"}}/>
                            </button>
                        </>
                        : 
                        <>
                            <button onClick={()=>{setShowJugadores(false)}} style={{background: "none", color: "inherit", font: "font", outline:"outline", border:"none"}}>
                            <BiListMinus size='30px' style={{color: "red"}}/>
                            </button>
                        </>
                        }
                    </p>
                    {showJugadores ? 
                        <>
                        <table class="table" style={{paddinLeft: "50px"}}>
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Jugador</th>
                            </tr>
                            </thead>
                            <tbody>
                            {props.data.jugadores.map((data, index)=>{
                                return(
                                <tr key={index}>
                                    <th scope="row">{index+1}</th>
                                    <td>{data}</td>
                                </tr>
                                )})
                            }
                            </tbody>
                        </table>
                        {props.data.jugadores.map((data, index)=>{
                            return(
                            null

                        )})}
                        </> 
                        : 
                        <>
                        </>
                    }
                </div>
            </Collapse>
        </>
    );
}

export default TournamentDetailComponent;