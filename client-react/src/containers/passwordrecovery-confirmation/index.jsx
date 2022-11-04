import React, {useState, useContext} from "react";
import { emailValidator, nameValidator, spaceValidator } from "../../utils/hooks/regex-validator";
import CommonSpacer from "../../components/common/spacer";
import { Link, useNavigate } from "react-router-dom";
import { passwordRecoveryConfirmation } from "../../utils/hooks/general-axios";
import Swal from "sweetalert2";
import Overlay from "../../components/overlay";

const PasswordRecoveryConfirmationContainer = (props) => {

    const navigate = useNavigate();

    const [loader, setLoader] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [email, setEmail] = useState(props.user);
    const [token, setToken] = useState(props.token);
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");


    const cleanForm = () =>{

    }   

    const handlePasswordRecoveryConfirmation = async (event) => {
        event.preventDefault();
        setErrorMsg("");

        if(emailValidator(email)){
            setErrorMsg("• Mail invalido. Por favor comunicate con soporte.")
        }else if(!password || !password2){
            setErrorMsg("• Por favor ingresa una contraseña.")
        }else if(password !== password2){
            setErrorMsg("• Las contraseñas no coinciden...")
        }else{

            setLoader(true);

            let res = await passwordRecoveryConfirmation(email, token, password);

            if(res && res.status && res.status == 200){
                setLoader(false);
                navigate("/");
                await Swal.fire({
                    allowOutsideClick: false,
                    icon: 'success',
                    title: '<h5 style="color: #B88CB8">¡Cambio de contraseña exitoso!</h5>',
                    text: "Ya puedes iniciar sesión en nuestro portal.",
                    confirmButtonColor: '#B88CB8',
                    confirmButtonText: 'Iniciar sesión'
                })
            }else if(res.response && res.response.data && res.response.data.invalidToken){
                setErrorMsg("• Link vencido o invalido. Solicita un nuevo recupero de contraseña.")
            }else if(res.response && res.response.data && res.response.data.userNotfound){
                setErrorMsg("• Usuario inexistente.")
            }else if(res.response && res.response.data && res.response.data.userNotValidated){
                setErrorMsg("• Usuario no validado. Por favor revisa tu casilla de mail.")
            }else{
                setLoader(false);
                await Swal.fire({
                    allowOutsideClick: false,
                    icon: 'error',
                    title: '<h5 style="color: #B88CB8">¡Ops!</h5>',
                    text: "Hemos detectado un inconveniente en el proceso de cambio de contraseña. Por favor intenta nuevamente en breves minutos.",
                    confirmButtonColor: '#B88CB8',
                    confirmButtonText: 'Continuar'
                })
            }

            setLoader(false);

        }
    }

    return (  
        <>
            {loader ? <Overlay/> : null}

            <div className="d-flex flex-column">
                <div className="d-flex flex-column">
                    <form className="d-flex flex-column justify-content-center form-login" onSubmit={handlePasswordRecoveryConfirmation}>
                        <div className="form-group form-group-login d-flex justify-content-center" >
                            <input 
                                disabled
                                onChange={(e)=> setEmail(e.target.value)} value={email}
                                type="text" 
                                className="form-control input-login" 
                                placeholder="Email"/>
                        </div>
                        <CommonSpacer marginBottom="20px"/>
                        <div className="form-group form-group-login d-flex justify-content-center">
                            <input 
                                onChange={(e)=> setPassword(e.target.value)} value={password}
                                type="password" 
                                className="form-control input-login" 
                                placeholder="Contraseña"/>
                        </div>
                        <CommonSpacer marginBottom="20px"/>
                        <div className="form-group form-group-login d-flex justify-content-center">
                            <input 
                                onChange={(e)=> setPassword2(e.target.value)} value={password2}
                                type="password" 
                                className="form-control input-login" 
                                placeholder="Confirmar Contraseña"/>
                        </div>
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
                        <Link to={'/'} className='link-noStyle' style={{textAlign: "center"}}>Iniciar sesión</Link>
                    </form>
                </div>
                <div className="input-login">
                    <CommonSpacer marginBottom="20px"/>
                    <p style={{color: "#B88CB8", textAlign:"center"}}>{errorMsg}</p>
                </div>
            </div>
        </>
    );
}

export default PasswordRecoveryConfirmationContainer;