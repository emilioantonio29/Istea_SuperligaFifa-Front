import React, {useState, useContext} from "react";
import { emailValidator, nameValidator, spaceValidator } from "../../utils/hooks/regex-validator";
import './containers-passwordrecovery.scss';
import CommonSpacer from "../../components/common/spacer";
import { Link } from "react-router-dom";
import { passwordRecovery } from "../../utils/hooks/general-axios";
import Overlay from "../../components/overlay";
import Swal from "sweetalert2";

const PasswordRecoveryContainer = () => {

    const [loader, setLoader] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [email, setEmail] = useState("");

    const handlePasswordRecovery = async (event) =>{
        event.preventDefault();
        setErrorMsg("");

        if(!email || emailValidator(email)){
            setErrorMsg("• Por favor ingresa un formato de email valido")
        }else{

            setLoader(true);

            let res = await passwordRecovery(email);

            if(res && res.data && res.data.passwordRecoveryCompleted){
                setLoader(false);
                await Swal.fire({
                    allowOutsideClick: false,
                    icon: 'success',
                    title: '<h5 style="color: #B88CB8">¡Solicitud procesada con éxito!</h5>',
                    text: "Te enviamos un mail con las instrucciones para cambiar la contraseña.",
                    confirmButtonColor: '#B88CB8',
                    confirmButtonText: 'Continuar'
                })

                setEmail("");
            }else if(res.response && res.response.data && res.response.data.confirmationNotCompleted){
                setErrorMsg("• El mail ingresado no se encuentra registrado.")
            }else if(res.response && res.response.data && res.response.data.userNotValidated){
                setErrorMsg("• El usuario no se ha validado. Por favor revisa tu casilla de mail.")
            }else{
                setErrorMsg("• Detectamos un error en el proceso de recupero de contraseña. Por favor intenta nuevamente en breves minutos.")
            }

            setLoader(false);


        }
    }

    return (  
        <>

            {loader? <Overlay/> : null}
            
            <div className="d-flex flex-column">
                <div className="d-flex flex-column">
                    <form className="d-flex flex-column justify-content-center form-login" onSubmit={handlePasswordRecovery}>
                        <div className="form-group form-group-login d-flex justify-content-center" >
                            <input 
                                onChange={(e)=> setEmail(e.target.value)} value={email}
                                type="text" 
                                className="form-control input-login" 
                                placeholder="Email"/>
                        </div>
                        <CommonSpacer marginBottom="20px"/>
                        <Link to={'/'} className='link-noStyle' style={{textAlign: "center"}}>Iniciar sesión</Link>
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
                    <p style={{color: "#B88CB8", textAlign:"center"}}>{errorMsg}</p>
                </div>
            </div>
        </>
    );
}

export default PasswordRecoveryContainer;