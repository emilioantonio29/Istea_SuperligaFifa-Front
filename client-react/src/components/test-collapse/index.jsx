import * as React from "react";
import Collapse from "@mui/material/Collapse";
import { Divider } from "@mui/material";
import CommonSpacer from "../common/spacer";


const TestCollapseComponent = (props) => {
    
    const [test, setTest] = React.useState(false)
    const [checked, setChecked] = React.useState(false);

    const handleChange = () => {
      setChecked((prev) => !prev);
    };

    React.useEffect(()=>{
        //Mount: 
    
        return () =>{
        //Unmount
    
        }
    }, [test])

    return (
        <>
            <Divider>
                <button className='btn btn-actions' onClick={handleChange}><span style={{fontWeight: "bold"}}>TEST {props.index+1}</span></button>
            </Divider>
            <Collapse in={checked}>
                <CommonSpacer marginTop={"20px"}/>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </Collapse>
            <CommonSpacer marginBottom={"20px"}/>
        </>
    );
}

export default TestCollapseComponent;