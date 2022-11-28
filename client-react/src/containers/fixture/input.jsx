import * as React from "react";
import Collapse from "@mui/material/Collapse";
import {BiListPlus} from 'react-icons/bi';
import {BiListMinus} from 'react-icons/bi';
import {BiCheckDouble} from 'react-icons/bi';
import {BiMessageAltError} from 'react-icons/bi';
import Divider from '@mui/material/Divider';
import { Tooltip } from "@mui/material";
import { UserGlobalContextMemorySpace } from "../../contexts/user-contex";
import { updateFixtures } from "../../utils/hooks/general-axios";
import Overlay from "../../components/overlay-loader";
import Swal from 'sweetalert2';
import style from './input.scss'

const FixtureInputContainer = (props) => {

    const {user} = React.useContext(UserGlobalContextMemorySpace);

    const [checked, setChecked] = React.useState(false);
    const [local, setLocal] = React.useState({});
    const [visitante, setVisitante] = React.useState({});
    const [localResult, setLocalResult] = React.useState("");
    const [visitanteResult, setVisitanteResult] = React.useState("");
    const [updateButtonMSG, setUpdateButtonMSG] = React.useState("");
    const [blockInput, setBlockInput] = React.useState(false);
    const [loader, setLoader] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [loaded, setLoaded] = React.useState(false);

    const handleUpdateFixture = async (data) =>{
        // console.log(props)
        if(localResult && visitanteResult){
            setError(false)
            setLoader(true)

            // let localscore = props.local
            // let visitantescore = props.visitante
            // localscore.resultado = localResult
            // visitantescore.resultado = visitanteResult
            // let localString = JSON.stringify(local);
            // let visitanteString = JSON.stringify(visitante);

            let body = {
                idFixture: props.fixtureId,
                idPartido: props.id,
                local: localResult,
                visitante: visitanteResult
            }

            // console.log("body", body)

            let res = await updateFixtures("token", body)

            // console.log("RES", res)

            if(res.data._id){

                setLoader(false)
                setLoaded(true)
                setBlockInput(true)

            }else{

                setLoader(false)
                setError(true)

            }

        }else{
            console.log("missing data")
        }
        
    }

    const handleMSG = () =>{
        return !localResult || !visitanteResult ? setUpdateButtonMSG("Ingresa el resultado del partido antes de avanzar") : setUpdateButtonMSG("")
    }

    React.useEffect(()=>{
        //Mount: 
    
        return () =>{
        //Unmount
    
        }
    }, [])

    return (
        <>
            {loader ? <Overlay/> : <></>}
            <div style={{marginBotton: "30px"}}>
                <Divider style={{marginRight: "100px", marginLeft: "50px"}}/>
                <div className="d-flex flex-row">
                    <div className="d-flex flex-column col-md-8" style={{paddingRight: "90px", marginTop: "11px", marginBottom: "10px"}}>
                        <div className="d-flex flex-row justify-content-between" style={{paddingLeft: "95px"}}>
                            <p><span style={{fontWeight: "bold"}}>LOCAL:</span> {props.local.fullplayer}</p>

                            {/* <input 
                                maxLength={2} 
                                type="text" 
                                className="form-control" 
                                placeholder={localResult} 
                                aria-label="" 
                                aria-describedby=""
                                value={localResult} 
                                style={{width: "40px"}}
                                onChange={(e)=> setLocalResult(e.target.value.replace(/[^0-9]/g, ''))} 
                            />   */}

                            {props.local.resultado || blockInput ? 
                            <>
                                <input 
                                    maxLength={2} 
                                    type="text" 
                                    className="form-control" 
                                    placeholder={localResult ? "" : `${props.local.resultado}`} 
                                    aria-label="" 
                                    aria-describedby=""
                                    value={localResult} 
                                    style={{width: "40px"}}
                                    onChange={(e)=> setLocalResult(e.target.value.replace(/[^0-9]/g, ''))} 
                                    disabled
                                />  
                            </>
                            : 
                            <>
                                <input 
                                    maxLength={2} 
                                    type="text" 
                                    className="form-control" 
                                    placeholder={localResult ? "" : `${props.local.resultado}`} 
                                    aria-label="" 
                                    aria-describedby=""
                                    value={localResult} 
                                    style={{width: "40px"}}
                                    onChange={(e)=> setLocalResult(e.target.value.replace(/[^0-9]/g, ''))} 
                                />  
                            
                            </>
                            }

                        </div>
                        <div className="d-flex flex-row justify-content-between" style={{paddingLeft: "95px"}}>
                            <p><span style={{fontWeight: "bold"}}>VISITANTE:</span> {props.visitante.fullplayer}</p>

                            {/* <input 
                                maxLength={2} 
                                type="text" 
                                className="form-control" 
                                placeholder={visitanteResult}  
                                aria-label="" 
                                aria-describedby=""
                                value={visitanteResult} 
                                style={{width: "40px"}}
                                onChange={(e)=> setVisitanteResult(e.target.value.replace(/[^0-9]/g, ''))} 
                            /> */}

                            {props.visitante.resultado || blockInput ?
                            <>
                                <input 
                                    maxLength={2} 
                                    type="text" 
                                    className="form-control" 
                                    placeholder={visitanteResult ? "" : `${props.visitante.resultado}`}  
                                    aria-label="" 
                                    aria-describedby=""
                                    value={visitanteResult} 
                                    style={{width: "40px"}}
                                    onChange={(e)=> setVisitanteResult(e.target.value.replace(/[^0-9]/g, ''))} 
                                    disabled
                                />
                            </>
                            :
                            <>
                                <input 
                                    maxLength={2} 
                                    type="text" 
                                    className="form-control" 
                                    placeholder={visitanteResult ? "" : `${props.visitante.resultado}`}  
                                    aria-label="" 
                                    aria-describedby=""
                                    value={visitanteResult} 
                                    style={{width: "40px"}}
                                    onChange={(e)=> setVisitanteResult(e.target.value.replace(/[^0-9]/g, ''))} 
                                />

                            </>
                            }

                        </div>
                    </div>
                    <div className="col-md-4 d-flex justify-content-center align-items-center" style={{borderLeft: "3px solid  #D4BCBC"}}>
                        
                        {/* <button onClick={()=>{console.log(props)}} className="btn btn-actions">GUARDAR RESULTADO</button> */}


                        {props.visitante.resultado !== "" || blockInput? 
                        <>
                            <Tooltip title="Ya se encuentra cargada la fecha.">
                                <div className="d-flex justify-content-center" style={{marginLeft: loaded ? "25px": "0px"}}>
                                    <button disabled className="btn btn-actions">GUARDAR RESULTADO</button>
                                </div>              
                            </Tooltip>
                            {loaded ? <><BiCheckDouble size='30px' style={{color: "green"}}/></> : <></>}
                        </>
                        : 
                        <>
                            <Tooltip title={updateButtonMSG}>
                                <div className="d-flex justify-content-center" style={{marginLeft: error ? "25px" : "0px"}}>
                                    <button onMouseEnter={handleMSG} onClick={handleUpdateFixture} className="btn btn-actions">GUARDAR RESULTADO</button>
                                </div> 
                            </Tooltip>
                            {error ? <> <BiMessageAltError size='30px' style={{color: "red"}}/> contact admin </> : <></>}
                        </>
                        }

                    </div>
                </div>
                <Divider style={{marginRight: "100px", marginLeft: "50px"}}/>
            </div>
        </>
    );
}

export default FixtureInputContainer;