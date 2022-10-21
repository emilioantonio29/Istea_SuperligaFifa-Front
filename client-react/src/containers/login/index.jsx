import React, {useState, useContext} from "react";
import { emailValidator } from "../../utils/hooks/email-validator";
import './containers-login.scss';
import { UserGlobalContextMemorySpace } from "../../contexts/user-contex";
import CommonSpacer from "../../components/common/spacer";
import { Link } from "react-router-dom";
import { login } from "../../utils/hooks/general-axios";

const LoginContainer = () => {

    const {user, setUser} = useContext(UserGlobalContextMemorySpace);

    const [loader, setLoader] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (event) =>{
        event.preventDefault();
        setErrorMsg("");

        if(!email || !password){
            setErrorMsg("• Por favor ingresa usuario y contraseña para iniciar sesión.")
        }else{
            if(emailValidator(email)){
                setErrorMsg("• Por favor ingresa un formato de email valido")
            }else{

                setLoader(true);

                let res = await login(email, password);

                console.log(res)

                if(res && res.status && res.status == 200 && res.data.user){
                    setUser(res.data.user);
                }else if(res.response && res.response.status && res.response.status == 404){
                    setErrorMsg("• El usuario o la contraseña son incorrectos.")
                }else{
                    setErrorMsg("• Detectamos un error en el inicio de sesión. Por favor intenta nuevamente en breves minutos.")
                }

                setLoader(false);


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
                                <input type="submit" className="btn btn-primary input-login input-submit" value="Continuar"/>
                            </div>
                        </>
                        }
                        <CommonSpacer marginBottom="20px"/>
                        <Link to={'/register'} className='link-noStyle' style={{textAlign: "center"}}>Registrate</Link>
                    </form>
                </div>
                <div className="input-login">
                    <CommonSpacer marginBottom="20px"/>
                    <p style={{color: "red", textAlign:"center"}}>{errorMsg}</p>
                </div>
            </div>
        </>
    );
}

export default LoginContainer;