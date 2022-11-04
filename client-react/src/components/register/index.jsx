import React from "react";
import './components-register.scss'
import logo from '../../logo.svg'
// import LoginContainer from "../../containers/login";
import CommonSpacer from "../common/spacer";
import { Link, useSearchParams } from "react-router-dom";
import SideRightImage from "../common/side-right-image";
import {BiJoystick} from 'react-icons/bi'
import RegisterContainer from "../../containers/register";
import RegisterConfirmationContainer from "../../containers/register-confirmation";


const RegisterComponent = () => {

    const [searchParams, setSearchParams] = useSearchParams({});
    const id = searchParams.get("id")
    const user = searchParams.get("user")

    return (
        <>
            <section className="section-login d-flex align-items-center">
                <div className="d-flex align-items-center" style={{width:"100%"}}>
                    <div className="login-box d-flex justify-content-center">
                        <div className="jumbotron bg-light jumbotron-login d-flex flex-column justify-content-center">
                            <div className="d-flex justify-content-center">
                                <BiJoystick size='50px' style={{color: "purple"}}/>
                            </div>
                            <CommonSpacer marginBottom="20px"/>
                            <div className="d-flex justify-content-center">
                                <h3>Superliga FIFA</h3>
                            </div>
                            <CommonSpacer marginBottom="20px"/>
                            <p style={{textAlign: "center"}}>{id && user ? "Confirmar Registro" : "Registro"}</p>
                            <CommonSpacer marginBottom="20px"/>
                            <div className="d-flex justify-content-center">
                                {/* <LoginContainer/> */}
                                {id && user ? <RegisterConfirmationContainer id={id} user={user}/> : <RegisterContainer/>}
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

export default RegisterComponent;