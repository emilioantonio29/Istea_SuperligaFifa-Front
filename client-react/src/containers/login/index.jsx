import React, {useState, useContext} from "react";
import { emailValidator } from "../../utils/hooks/email-validator";
import './components-login.scss';
import { UserGlobalContextMemorySpace } from "../../contexts/user-contex";
import CommonSpacer from "../../components/common/spacer";
import { Link } from "react-router-dom";

const LoginContainer = () => {

    const {user, setUser} = useContext(UserGlobalContextMemorySpace);

    const [loader, setLoader] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (event) =>{
        event.preventDefault();
        setErrorMsg("");

        if(!email || !password){
            setErrorMsg("* Por favor ingresa usuario y contraseña para iniciar sesión.")
        }else{
            if(emailValidator(email)){
                setErrorMsg("* Por favor ingresa un formato de email valido")
            }else{
                setLoader(true);
                setTimeout(() => {
                    setUser({email:email, name: "test", admin:false});
                }, 2000);
            }
        }
    }

    return (  
        <>
            <div className="d-flex flex-column">
                <div className="d-flex flex-column">
                    <form className="d-flex flex-column justify-content-center form-login" onSubmit={handleLogin}>
                        <div className="form-group form-group-login d-flex justify-content-center" >
                            <input 
                                onChange={(e)=> setEmail(e.target.value)} value={email}
                                type="text" 
                                className="form-control input-login" 
                                placeholder="superliga@juega.com"/>
                        </div>
                        <CommonSpacer marginBottom="20px"/>
                        <div className="form-group form-group-login d-flex justify-content-center">
                            <input 
                                onChange={(e)=> setPassword(e.target.value)} value={password}
                                type="password" 
                                className="form-control input-login" 
                                placeholder="123456789"/>
                        </div>
                        <CommonSpacer marginBottom="20px"/>
                        <Link to={'/password-recovery'} className='link-noStyle' style={{textAlign: "center"}}>¿Olvidaste tu contraseña?</Link>
                        <CommonSpacer marginBottom="20px"/>
                        {loader ? 
                        <>
                            <button className="btn">
                                <span className="spinner-grow spinner-grow-sm"></span>
                                <span className="spinner-grow spinner-grow-sm"></span>
                                <span className="spinner-grow spinner-grow-sm"></span>
                            </button>
                        </> 
                        : 
                        <>
                            <div className="form-group form-group-login d-flex justify-content-center">
                                <input type="submit" className="btn btn-primary input-login" value="Continuar"/>
                            </div>
                        </>
                        }
                        <CommonSpacer marginBottom="20px"/>
                        <Link to={'/register'} className='link-noStyle' style={{textAlign: "center"}}>Registrate</Link>
                    </form>
                </div>
                <div className="input-login">
                    <CommonSpacer marginBottom="20px"/>
                    <p style={{color: "red"}}>{errorMsg}</p>
                </div>
            </div>
        </>
    );
}

export default LoginContainer;