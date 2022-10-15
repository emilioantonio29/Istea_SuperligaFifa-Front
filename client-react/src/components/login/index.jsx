import React from "react";
import './components-login.scss'
import logo from '../../logo.svg'
import LoginContainer from "../../containers/login";
import CommonSpacer from "../common/spacer";
import { Link } from "react-router-dom";

const LoginComponent = () => {
    return (
        <>
            <section className="section-login container d-flex align-items-center">
                <div className="jumbotron bg-light jumbotron-login d-flex flex-column justify-content-center">
                    <div className="d-flex justify-content-center">
                        <img src={logo} className="App-logo" alt="logo" />
                    </div>
                    <div className="d-flex justify-content-center">
                        <h3>Superliga FIFA</h3>
                    </div>
                    <br/>
                    <div className="d-flex justify-content-center">
                        <LoginContainer/>
                    </div>
                    <CommonSpacer marginBottom="20px"/>
                </div>
            </section>
        </>
    );
}

export default LoginComponent;