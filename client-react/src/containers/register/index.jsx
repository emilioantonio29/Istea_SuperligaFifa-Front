import React, {useState, useContext} from "react";
import { emailValidator, nameValidator, spaceValidator } from "../../utils/hooks/regex-validator";
import './containers-register.scss';
import { UserGlobalContextMemorySpace } from "../../contexts/user-contex";
import CommonSpacer from "../../components/common/spacer";
import { Link } from "react-router-dom";
import { register } from "../../utils/hooks/general-axios";
import Swal from "sweetalert2";

const RegisterContainer = () => {

    const {user, setUser} = useContext(UserGlobalContextMemorySpace);

    const [loader, setLoader] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [favoriteTeam, setFavoriteTeam] = useState("");
    const [termsAndConditions, setTermsAndConditions] = useState(false);

    const cleanForm = () =>{
        setName("");
        setLastName("");
        setEmail("");
        setFavoriteTeam("");
        setTermsAndConditions(false);
    }

    const handleRegister = async (event) =>{
        event.preventDefault();
        setErrorMsg("");

        if(!email || !name || !lastName || !favoriteTeam || !termsAndConditions){
            setErrorMsg("• Por favor ingresa los datos solicitados.")
        }else{
            if(emailValidator(email)){
                setErrorMsg("• Por favor ingresa un formato de email valido")
            }else{

                setLoader(true);

                let res = await register(email, name, lastName, favoriteTeam, termsAndConditions);

                if(res && res.status == 200){
                    setLoader(false);
                    await Swal.fire({
                        allowOutsideClick: false,
                        icon: 'success',
                        title: '<h5 style="color: #B88CB8">¡Registro exitoso!</h5>',
                        text: "Te enviamos un mail para que confirmes tu cuenta.",
                        confirmButtonColor: '#B88CB8',
                        confirmButtonText: 'Continuar'
                    })
                    cleanForm();
                }else if(res.response && res.response.data && res.response.data.userExists){
                    setLoader(false);
                    await Swal.fire({
                        allowOutsideClick: false,
                        icon: 'info',
                        title: '<h5 style="color: #B88CB8">¡Ops!</h5>',
                        text: "La casilla indicada ya se encuentra registrada. Por favor ingresa una nueva casilla de mail.",
                        confirmButtonColor: '#B88CB8',
                        confirmButtonText: 'Continuar'
                    })
                }else{
                    setLoader(false);
                    await Swal.fire({
                        allowOutsideClick: false,
                        icon: 'error',
                        title: '<h5 style="color: #B88CB8">¡Ops!</h5>',
                        text: "Hemos detectado un inconveniente en el proceso de registro. Por favor intenta nuevamente en breves minutos.",
                        confirmButtonColor: '#B88CB8',
                        confirmButtonText: 'Continuar'
                    })
                }
            }
        }
    }

    return (  
        <>
            <div className="d-flex flex-column">
                <div className="d-flex flex-column">
                    <form className="d-flex flex-column justify-content-center form-login" onSubmit={handleRegister}>
                        <div className="form-group form-group-login d-flex justify-content-center">
                            <input 
                                maxLength={25}
                                onChange={(e)=> 
                                    setName((!name ? nameValidator(e.target.value)  
                                    : spaceValidator(e.target.value)))}  
                                value={name} 
                                type="text" 
                                className="form-control input-login" 
                                placeholder="Nombre"/>
                        </div>
                        <CommonSpacer marginBottom="20px"/>
                        <div className="form-group form-group-login d-flex justify-content-center">
                            <input 
                                maxLength={25}
                                onChange={(e)=> 
                                    setLastName((!lastName ? nameValidator(e.target.value)  
                                    : spaceValidator(e.target.value)))}  
                                value={lastName} 
                                type="text" 
                                className="form-control input-login" 
                                placeholder="Apellido"/>
                        </div>
                        <CommonSpacer marginBottom="20px"/>
                        <div className="form-group form-group-login d-flex justify-content-center">
                            <input 
                                maxLength={25}
                                onChange={(e)=> 
                                    setFavoriteTeam(e.target.value)}  
                                value={favoriteTeam} 
                                type="text" 
                                className="form-control input-login" 
                                placeholder="Equipo Favorito"/>
                        </div>
                        <CommonSpacer marginBottom="20px"/>
                        <div className="form-group form-group-login d-flex justify-content-center" >
                            <input 
                                maxLength={100}
                                onChange={(e)=> setEmail(e.target.value)} value={email}
                                type="text" 
                                className="form-control input-login" 
                                placeholder="Email"/>
                        </div>
                        <CommonSpacer marginBottom="20px"/>
                        <div className="form-group form-group-login d-flex justify-content-center" >

                            {termsAndConditions ? 
                            <>
                                <input 
                                    style={{backgroundColor: "#B88CB8"}}
                                    onChange={(e)=> setTermsAndConditions(!termsAndConditions)} 
                                    className="form-check-input" 
                                    type="checkbox" 
                                    id="flexCheckDefault"
                                    checked
                                />
                            
                            </> 
                            
                            : 
                            
                            <>
                                <input 
                                    onChange={(e)=> setTermsAndConditions(!termsAndConditions)} 
                                    className="form-check-input" 
                                    type="checkbox" 
                                    id="flexCheckDefault"
                                />
                            </>
                            
                            }
                            <label style={{marginLeft: "10px", fontSize: "15px"}} className="form-check-label tac-label" htmlFor="flexCheckDefault">
                                Acepto los términos y condiciones
                            </label>
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

export default RegisterContainer;