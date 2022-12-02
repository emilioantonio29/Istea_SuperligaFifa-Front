import React, {useEffect} from "react";
import CommonSpacer from "../common/spacer";
import {BiListPlus} from 'react-icons/bi';
import {BiListMinus} from 'react-icons/bi';
import TestCollapseComponent from "../test-collapse";
import Collapse from "@mui/material/Collapse";
import Divider from '@mui/material/Divider';
import { getFitures } from "../../utils/hooks/general-axios";
import FixtureContainer from "../../containers/fixture";
import { getTable } from "../../utils/hooks/general-axios";
import Overlay from "../overlay";

const ResultsDetailComponent = (props) => {

    const [checked, setChecked] = React.useState(false);
    const [render, setRender] = React.useState(false);
    const [fixtures, setFixtures] = React.useState();
    const [loader, setLoader] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [tabla, setTabla] = React.useState([]);

    const handleChange = () => {
        setChecked((prev) => !prev);
    };

    // console.log("propsTABLA", props.data._id)

    const Table = async () =>{

        setLoader(true)

        try {
            let res = await getTable(props.data._id)
            
            // console.log("RES", res)

            if(res.data.sortTable){
                setTabla(res.data.sortTable)
                setLoader(false)
            }else{
                setError(res)
                setLoader(false)
            }
            
        } catch (error) {
            setError(error)
            setLoader(false)
        }

    }

    React.useEffect(()=>{
        //Mount: 

        if(checked){
            Table()
        }
    
        return () =>{
        //Unmount
    
        }
    }, [checked])

    return (  
        <>
            {loader ? <Overlay/> : null}
            <Divider>
                <button className='btn btn-actions' onClick={handleChange}><span style={{fontWeight: "bold"}}>POSICIONES</span></button>
            </Divider>
            <Collapse in={checked}>
                {loader ? 
                <>
                    <div className="d-flex flex-column">
                        <div style={{paddingTop: "10vh"}} className="d-flex flex-row justify-content-center">
                            <span style={{height: "25px", width: "25px"}} className="spinner-grow spinner-grow-sm"></span>
                            <span style={{height: "25px", width: "25px"}} className="spinner-grow spinner-grow-sm"></span>
                            <span style={{height: "25px", width: "25px"}} className="spinner-grow spinner-grow-sm"></span>
                        </div>
                    </div>
                </>
                :
                <>

                    {error ? 
                    <>
                        <div style={{paddingTop: "4vh"}}>
                            <p style={{color: "#B88CB8", textAlign:"center", fontSize: "18px", fontWeight: "bold"}}>• Detectamos un problema al cargar la tabla, por favor intentanuevamente en unos minutos.</p>
                        </div>
                    </>
                    :
                    <>
                        <table class="table" style={{paddinLeft: "50px"}}>
                            <thead>
                            <tr>
                                <th scope="col">CLUB</th>
                                <th scope="col">PJ</th>
                                <th scope="col">G</th>
                                <th scope="col">E</th>
                                <th scope="col">P</th>
                                <th scope="col">GF</th>
                                <th scope="col">GC</th>
                                <th scope="col">PTS</th>
                            </tr>
                            </thead>
                            <tbody>
                            {tabla.map((data, index)=>{
                                return(
                                <tr key={index} style={index == 0 ? {backgroundColor: "#DCEEE6"} : null}>
                                    <th scope="col">{data.jugador}</th>
                                    <th scope="col">{data.jugados}</th>
                                    <th scope="col">{data.ganados}</th>
                                    <th scope="col">{data.empatados}</th>
                                    <th scope="col">{data.perdidos}</th>
                                    <th scope="col">{data.golesafavor}</th>
                                    <th scope="col">{data.golesencontra}</th>
                                    <th scope="col">{data.puntos}</th>
                                </tr>
                                )})
                            }
                            </tbody>
                        </table>
                    </>
                    }

                </>
                }
            </Collapse>
        </>
    );
}

export default ResultsDetailComponent;