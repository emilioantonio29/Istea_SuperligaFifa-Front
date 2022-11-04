import React, {useState, useContext} from "react";
import { emailValidator, nameValidator, spaceValidator } from "../../utils/hooks/regex-validator";
import './containers-registerconfirmation.scss';
import CommonSpacer from "../../components/common/spacer";
import { Link, useNavigate } from "react-router-dom";
import { registerConfirmation } from "../../utils/hooks/general-axios";
import Swal from "sweetalert2";
import Overlay from "../../components/overlay";

const RegisterConfirmationContainer = (props) => {

    const navigate = useNavigate();

    const [loader, setLoader] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [email, setEmail] = useState(props.user);
    const [id, setID] = useState(props.id);
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");


    const cleanForm = () =>{

    }   

    const handleRegisterConfirmation = async (event) => {
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

            let res = await registerConfirmation(id, email, password);

            if(res && res.status && res.status == 200){
                setLoader(false);
                navigate("/");
                await Swal.fire({
                    allowOutsideClick: false,
                    icon: 'success',
                    title: '<h5 style="color: #B88CB8">¡Gracias por confirmar tu registro!</h5>',
                    text: "Ya puedes iniciar sesión en nuestro portal.",
                    confirmButtonColor: '#B88CB8',
                    confirmButtonText: 'Iniciar sesión'
                })
            }else if(res.response && res.response.status && res.response.status == 404 && res.response.data.confirmationNotCompleted){
                setLoader(false);
                await Swal.fire({
                    allowOutsideClick: false,
                    icon: 'info',
                    title: '<h5 style="color: #B88CB8">¡Ops!</h5>',
                    text: "Usuario no encontrado, por favor revisa nuevamente el link enviado a tu casilla de mail.",
                    confirmButtonColor: '#B88CB8',
                    confirmButtonText: 'Continuar'
                })
                navigate("/");
            }else if(res.response && res.response.status && res.response.status == 400){
                setLoader(false);
                await Swal.fire({
                    allowOutsideClick: false,
                    icon: 'info',
                    title: '<h5 style="color: #B88CB8">¡Ops!</h5>',
                    text: "Usuario incorrecto o ya validado, por favor revisa nuevamente el link enviado a tu casilla de mail o intenta iniciar sesión.",
                    confirmButtonColor: '#B88CB8',
                    confirmButtonText: 'Continuar'
                })
                navigate("/");
            }else{
                setLoader(false);
                await Swal.fire({
                    allowOutsideClick: false,
                    icon: 'error',
                    title: '<h5 style="color: #B88CB8">¡Ops!</h5>',
                    text: "Hemos detectado un inconveniente en el proceso de confirmación de registro. Por favor intenta nuevamente en breves minutos.",
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
                    <form className="d-flex flex-column justify-content-center form-login" onSubmit={handleRegisterConfirmation}>
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

export default RegisterConfirmationContainer;