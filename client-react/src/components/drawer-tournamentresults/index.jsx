import React, {useEffect} from "react";
import CommonSpacer from "../common/spacer";
import {BiListPlus} from 'react-icons/bi';
import {BiListMinus} from 'react-icons/bi';
import TestCollapseComponent from "../test-collapse";
import Collapse from "@mui/material/Collapse";
import Divider from '@mui/material/Divider';
import { getFitures } from "../../utils/hooks/general-axios";
import FixtureContainer from "../../containers/fixture";


const ResultsDetailComponent = (props) => {

    const [checked, setChecked] = React.useState(false);
    const [render, setRender] = React.useState(false);
    const [fixtures, setFixtures] = React.useState();

    const handleChange = () => {
        setChecked((prev) => !prev);
    };



    React.useEffect(()=>{
        //Mount: 
    
        return () =>{
        //Unmount
    
        }
    }, [render])

    return (  
        <>
            <Divider>
                <button className='btn btn-actions' onClick={handleChange}><span style={{fontWeight: "bold"}}>POSICIONES</span></button>
            </Divider>
            <Collapse in={checked}>
                <div className="d-flex flex-column">
                    {/* <div style={{paddingTop: "10vh"}} className="d-flex flex-row justify-content-center">
                        <span style={{height: "25px", width: "25px"}} className="spinner-grow spinner-grow-sm"></span>
                        <span style={{height: "25px", width: "25px"}} className="spinner-grow spinner-grow-sm"></span>
                        <span style={{height: "25px", width: "25px"}} className="spinner-grow spinner-grow-sm"></span>
                    </div> */}
                    <>POSICIONES</>
                </div>
            </Collapse>
        </>
    );
}

export default ResultsDetailComponent;