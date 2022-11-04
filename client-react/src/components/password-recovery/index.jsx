import React from "react";
import './components-passwordrecovery.scss'
import logo from '../../logo.svg'
import LoginContainer from "../../containers/login";
import CommonSpacer from "../common/spacer";
import { Link, useSearchParams } from "react-router-dom";
import SideRightImage from "../common/side-right-image";
import {BiJoystick} from 'react-icons/bi'
import PasswordRecoveryContainer from "../../containers/passwordrecovery";
import PasswordRecoveryConfirmationContainer from "../../containers/passwordrecovery-confirmation";


const PasswordRecoveryComponent = () => {

    const [searchParams, setSearchParams] = useSearchParams({});
    const token = searchParams.get("token")
    const user = searchParams.get("user")

    return (
        <>
            <section className="section-login d-flex align-items-center">
                <div className="d-flex align-items-center" style={{width:"100%"}}>
                    <div className="login-box d-flex justify-content-center">
                        <div className="jumbotron bg-light jumbotron-login d-flex flex-column justify-content-center">
                            <div className="d-flex justify-content-center">
                                {/* <img src={logo} className="App-logo" alt="logo" /> */}
                                <BiJoystick size='50px' style={{color: "purple"}}/>
                            </div>
                            <CommonSpacer marginBottom="20px"/>
                            <div className="d-flex justify-content-center">
                                <h3>Superliga FIFA</h3>
                            </div>
                            <CommonSpacer marginBottom="20px"/>
                            <p style={{textAlign: "center"}}>
                                {token && user ? "Cambiar contraseña" : "Recuperar contraseña"}
                            </p>
                            <CommonSpacer marginBottom="20px"/>
                            <div className="d-flex justify-content-center">
                                {token && user ? <PasswordRecoveryConfirmationContainer token={token} user={user}/> : <PasswordRecoveryContainer/>}
                            </div>
                            <CommonSpacer marginBottom="20px"/>
                        </div>
                    </div>
                    <SideRightImage/>
                </div>
            </section>
        </>
    );
}

export default PasswordRecoveryComponent;