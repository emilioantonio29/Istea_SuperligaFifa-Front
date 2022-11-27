import * as React from "react";
import Collapse from "@mui/material/Collapse";
import {BiListPlus} from 'react-icons/bi';
import {BiListMinus} from 'react-icons/bi';
import Divider from '@mui/material/Divider';
import { Tooltip } from "@mui/material";


const FixtureContainer = (props) => {
    
    const [checked, setChecked] = React.useState(false);
    const [local, setLocal] = React.useState({});
    const [visitante, setVisitante] = React.useState({});
    const [localResult, setLocalResult] = React.useState("");
    const [visitanteResult, setVisitanteResult] = React.useState("");

    console.log("FixtureContainer", props)

    const handleChange = () => {
      setChecked((prev) => !prev);
    };

    const handleLocal = (data) =>{
        let json = JSON.parse(data)
        return json.fullplayer
    }

    const handleVisitante = (data) =>{
        let json = JSON.parse(data)
        return json.fullplayer
    }

    const handleLocalResult = (data) =>{
        let json = JSON.parse(data)
        return json.resultado
    }

    const handleVisitanteResult = (data) =>{
        let json = JSON.parse(data)
        return json.resultado
    }

    React.useEffect(()=>{
        //Mount: 
    
        return () =>{
        //Unmount
    
        }
    }, [])

    return (
        <>
            {/* <button onClick={handleChange}>tesst</button> */}
            <div className="d-flex" style={{marginLeft: "60px"}}>
                <h5>{props.fixture.titulo} </h5>
                {!checked ? 
                <>
                    <button onClick={handleChange} style={{background: "none", color: "inherit", font: "font", outline:"outline", border:"none", marginBottom: "7px"}}>
                        <BiListPlus size='25px' style={{color: "green"}}/>
                    </button>
                </> 
                : 
                <>
                    <button onClick={handleChange} style={{background: "none", color: "inherit", font: "font", outline:"outline", border:"none", marginBottom: "7px"}}>
                        <BiListMinus size='25px' style={{color: "red"}}/>
                    </button>
                </>
                }
            </div>
            {/* <button onClick={()=>{console.log(props.fixture)}}>test</button> */}
            
            {props.fixture.partidos.map((data, index)=>{

                // setLocal(JSON.parse(data.local))
                // setVisitante(JSON.parse(data.local))

                return(
                    <div key={index}>
                        {/* <button onClick={()=>{console.log(data)}}>test</button>
                        <button onClick={()=>{console.log(JSON.parse(data.local))}}>test</button> */}

                        <Collapse in={checked}>
                            <div style={{marginBotton: "30px"}}>
                                <Divider style={{marginRight: "100px", marginLeft: "50px"}}/>
                                <div className="d-flex flex-row">
                                    <div className="d-flex flex-column col-md-8" style={{paddingRight: "90px", marginTop: "11px", marginBottom: "10px"}}>
                                        <div className="d-flex flex-row justify-content-between" style={{paddingLeft: "95px"}}>
                                            <p><span style={{fontWeight: "bold"}}>LOCAL:</span> {handleLocal(data.local)}</p>

                                            {handleLocalResult(data.local) !== "" ? 
                                            <>
                                                <input 
                                                    maxLength={2} 
                                                    type="text" 
                                                    className="form-control" 
                                                    placeholder={localResult ? "" : handleLocalResult(data.local)} 
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
                                                    placeholder={localResult ? "" : handleLocalResult(data.local)} 
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
                                            <p><span style={{fontWeight: "bold"}}>VISITANTE:</span> {handleVisitante(data.visitante)}</p>
                                            {handleVisitanteResult(data.visitante) ?
                                            <>
                                                <input 
                                                    maxLength={2} 
                                                    type="text" 
                                                    className="form-control" 
                                                    placeholder={visitanteResult ? "" : handleVisitanteResult(data.visitante)}  
                                                    aria-label="" 
                                                    aria-describedby=""
                                                    value={visitanteResult} 
                                                    style={{width: "40px"}}
                                                    onChange={(e)=> setVisitateResult(e.target.value.replace(/[^0-9]/g, ''))} 
                                                    disabled
                                                />
                                            </>
                                            :
                                            <>
                                                <input 
                                                    maxLength={2} 
                                                    type="text" 
                                                    className="form-control" 
                                                    placeholder={visitanteResult ? "" : handleVisitanteResult(data.visitante)}  
                                                    aria-label="" 
                                                    aria-describedby=""
                                                    value={visitanteResult} 
                                                    style={{width: "40px"}}
                                                    onChange={(e)=> setVisitateResult(e.target.value.replace(/[^0-9]/g, ''))} 
                                                />
                                            </>
                                            }
                                        </div>
                                    </div>
                                    <div className="col-md-4 d-flex justify-content-center align-items-center" style={{borderLeft: "3px solid  #D4BCBC"}}>
                                        {handleVisitanteResult(data.visitante) ? 
                                        <>
                                            <Tooltip title="Ya se encuentra cargada la fecha.">
                                                <div className="d-flex justify-content-center">
                                                    <button disabled className="btn btn-actions">GUARDAR RESULTADO</button>
                                                </div>                            
                                            </Tooltip>
                                        </>
                                        : 
                                        <>
                                            <button className="btn btn-actions">GUARDAR RESULTADO</button>
                                        </>
                                        }
                                    </div>
                                </div>
                                <Divider style={{marginRight: "100px", marginLeft: "50px"}}/>
                            </div>
                        </Collapse>
                    </div>
                )})
            }
        </>
    );
}

export default FixtureContainer;