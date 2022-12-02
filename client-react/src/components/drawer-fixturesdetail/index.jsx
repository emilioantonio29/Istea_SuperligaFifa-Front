import React, {useEffect} from "react";
import CommonSpacer from "../common/spacer";
import {BiListPlus} from 'react-icons/bi';
import {BiListMinus} from 'react-icons/bi';
import TestCollapseComponent from "../test-collapse";
import Collapse from "@mui/material/Collapse";
import Divider from '@mui/material/Divider';
import { getFitures } from "../../utils/hooks/general-axios";
import FixtureContainer from "../../containers/fixture";
import Overlay from "../overlay";


const FixturesDetailComponent = (props) => {

    const [checked, setChecked] = React.useState(false);
    const [render, setRender] = React.useState(false);
    const [fixtures, setFixtures] = React.useState(null);
    const [loader, setLoader] = React.useState(false);

    const handleChange = () => {
        setChecked((prev) => !prev);
        setRender(!render)
    };

    const handleFixture = async (token) =>{
        setLoader(true)
        let data = await getFitures(token, props.data.torneoid)
        if(data.data?.tournament){
            setFixtures(data.data.tournament)
        }

        setLoader(false)
    }


    React.useEffect(()=>{
        //Mount: 

        if(checked){
            let token = localStorage.getItem("superligaenc");
    
            handleFixture(token)
        }

    
        return () =>{
        //Unmount
    
        }
    }, [checked])

    return (  
        <>
            {loader ? <Overlay/>:<></>}
            <Divider>
                <button className='btn btn-actions' onClick={handleChange}><span style={{fontWeight: "bold"}}>FIXTURES</span></button>
            </Divider>
            <Collapse in={checked}>
                {loader ?
                <>
                    <div style={{paddingTop: "5vh", height: "10vh"}} className="d-flex flex-row justify-content-center">
                        <span style={{height: "25px", width: "25px"}} className="spinner-grow spinner-grow-sm"></span>
                        <span style={{height: "25px", width: "25px"}} className="spinner-grow spinner-grow-sm"></span>
                        <span style={{height: "25px", width: "25px"}} className="spinner-grow spinner-grow-sm"></span>
                    </div>
                </>
                :
                <>
                    {fixtures ? 
                        <>
                            {fixtures.fechas.map((data, index)=>{
                                // console.log("MAP", fixtures)
                                return(
                                    <div key={index}>
                                        <CommonSpacer marginTop={"20px"}/>

                                        <FixtureContainer fixture={data} fixtureId={fixtures._id} index={index} admin={props.admin}/>

                                        {/* {["0", "1"].map((data, index)=>{
                                            console.log("DATA", data)
                                            return(
                                                <div key={index}>
                                                    DATO  {index}
                                                </div>
                                            )})
                                        } */}

                                    </div>
                                )})
                            }
                        </> 
                        : 
                        <>
                            <div style={{paddingTop: "4vh"}}>
                                <p style={{color: "#B88CB8", textAlign:"center", fontSize: "18px", fontWeight: "bold"}}>• No se encontraron fixtures disponibles.</p>
                            </div>
                        </>
                    }
                </>}
            </Collapse>
        </>
    );
}

export default FixturesDetailComponent;