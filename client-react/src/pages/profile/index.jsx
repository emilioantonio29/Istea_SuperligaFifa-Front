import React from "react";
import CommonSpacer from "../../components/common/spacer";
import {BiUserCircle} from 'react-icons/bi'


const ProfilePage = () => {
    return (  
        <>
            <div style={{display: "flex", flexDirection: "column", minHeight: "55vh", paddingTop: "100px"}} className='container'>
                <div className="jumbotron bg-light" style={{borderRadius: "20px", marginTop: "20px"}}>
                    <div className="container">
                        <div className="d-flex justify-content-center">
                            <h6 className="display-6" style={{alignText: "center"}}>PERFIL</h6>
                        </div>
                        <CommonSpacer marginTop={"20px"}/>
                        <div className="d-flex justify-content-center">
                            <BiUserCircle size='100px' style={{color: "purple"}}/>
                        </div>
                        <CommonSpacer marginTop={"20px"}/>
                        <div className="d-flex justify-content-center">
                            <div className="card" style={{width:"30vw"}}>
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                                <div className="card-body">
                                    <a href="#" className="card-link">Card link</a>
                                    <a href="#" className="card-link">Another link</a>
                                </div>
                            </div>

                        </div>
                        <CommonSpacer marginBottom={"40px"}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfilePage;