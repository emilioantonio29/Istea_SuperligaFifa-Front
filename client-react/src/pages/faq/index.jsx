import React from "react";
import TestCollapseComponent from "../../components/test-collapse"
import CommonSpacer from "../../components/common/spacer";

const FAQPage = () => {
    return (  
        <>
            <div style={{display: "flex", flexDirection: "column", minHeight: "55vh", paddingTop: "100px"}} className='container'>
                <div className="jumbotron bg-light" style={{borderRadius: "20px", marginTop: "20px"}}>
                    <div className="container">
                        <div className="d-flex justify-content-center">
                            <h6 className="display-6" style={{alignText: "center"}}>Preguntas Frecuentes</h6>
                        </div>
                        <CommonSpacer marginTop={"20px"}/>

                        {["0", "1", "2", "3", "4", "5"].map((data, index)=>{
                        return(
                            <div key={index}>
                                <TestCollapseComponent index={index}/>
                            </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default FAQPage;