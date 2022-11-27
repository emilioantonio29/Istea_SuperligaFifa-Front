import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {BiRightArrowAlt} from 'react-icons/bi'
import CommonSpacer from '../common/spacer';
import {BiListPlus} from 'react-icons/bi';
import {BiListMinus} from 'react-icons/bi';
import Chip from '@mui/material/Chip';
import Overlay from '../overlay-loader';
import Tooltip from '@mui/material/Tooltip';
import { AdminOpenTournament, adminTournamentDetail } from '../../utils/hooks/general-axios';
import Swal from 'sweetalert2';
import { Link, useNavigate } from "react-router-dom";
import TournamentDetailComponent from '../drawer-tournamentdetail';
import Collapse from "@mui/material/Collapse";



export default function DrawerAdminComponent(props) {

  const navigate = useNavigate();

  const [showJugadores, setShowJugadores] = React.useState(false);
  const [loader, setLoader] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const handleChange = () => {
      setChecked((prev) => !prev);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const handleIniciarTorneo = async (anchor) =>{

    let token = localStorage.getItem("superligaenc");

    setLoader(true)
    let res = await AdminOpenTournament(token, props.data._id)
    if(res.status == 200){

      setLoader(false);

      setState({
        top: false,
        left: false,
        bottom: false,
        right: false,
      })

      navigate("/redirect");
      Swal.fire({
        allowOutsideClick: false,
        icon: 'success',
        title: '<h5 style="color: #B88CB8">¡Torneo iniciado con éxito!</h5>',
        text: "Ya se asignaron las fechas y los equipos para jugar el torneo.",
        confirmButtonColor: '#B88CB8',
        confirmButtonText: 'Continuar'
      })

    }else if(res.response && res.response.data && res.response.data.error && res.response.data.error.expired){
      setLoader(false);
      Swal.fire({
          allowOutsideClick: false,
          icon: 'info',
          title: '<h5 style="color: #B88CB8">¡Tu sesión expiró!</h5>',
          text: "Por favor inicia sesión nuevamente.",
          confirmButtonColor: '#B88CB8',
          confirmButtonText: 'Continuar'
      })
    }else{
      setLoader(false);
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        title: '<h5 style="color: #B88CB8">¡Opps!</h5>',
        text: "Ocurrió un error al intentar iniciar el torneo, por favor intenta nuevamente en unos minutos.",
        confirmButtonColor: '#B88CB8',
        confirmButtonText: 'Continuar'
      })
    }

  }

  return (
    <div>
      {['bottom'].map((anchor) => (
        <React.Fragment key={anchor}>
          <button onClick={toggleDrawer(anchor, true)} className="btn btn-cardtournament">Detalle</button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {/* <button onClick={()=>navigate("/redirect")}>test</button> */}
            {loader? <Overlay/> : null}
            <div style={{display: "flex", flexDirection: "column", minHeight: "90vh"}} className='container'>
                <div className="jumbotron bg-light" style={{marginTop: "20px"}}>
                    <div className="container">
                        <div className='d-flex justify-content-between'>
                          <div className='d-flex'>
                            <p style={{fontSize: "20px"}}>ADMIN <BiRightArrowAlt/></p>
                            <p style={{marginLeft: "5px", fontSize: "20px"}}>Mis Torneos <BiRightArrowAlt/></p>
                            <p style={{marginLeft: "5px", fontSize: "20px"}}>{props.data.nombre}</p>
                          </div>
                          <button onClick={toggleDrawer(anchor, false)} className="btn btn-cardtournament">VOLVER</button>
                        </div>
                        {/* <button onClick={()=>console.log(props.data)}>test</button> */}
                        
                        <TournamentDetailComponent data={props.data}/>

                        <Divider style={{marginTop: "30px"}}>
                          {/* <Chip label="ACCIONES" /> */}
                          <button className='btn btn-actions' onClick={handleChange}><span style={{fontWeight: "bold"}}>ACCIONES</span></button>
                        </Divider>
                        <CommonSpacer marginTop={"40px"}/>
                        <Collapse in={checked}>
                          <div className="d-flex justify-content-around">
                            
                            {props.data.jugadores.length == props.data.cantidadjugadores && props.data.cerrado == false && props.data.torneoid == ""? 
                            <>
                              <button onClick={()=>{handleIniciarTorneo(anchor)}} className="btn btn-cardtournament">INICIAR TORNEO</button>
                            </>
                            :
                            props.data.cerrado == true? 
                            <>
                              <Tooltip title="El torneo ya se encuentra cerrado.">
                                <div className="d-flex justify-content-center">
                                  <button disabled onClick={handleIniciarTorneo} className="btn btn-cardtournament">INICIAR TORNEO</button>
                                </div>                            
                              </Tooltip>
                            </>
                            :
                            props.data.jugadores.length !== props.data.cantidadjugadores? 
                            <>
                              <Tooltip title="Faltan jugadores para iniciar el torneo.">
                                <div className="d-flex justify-content-center">
                                  <button disabled onClick={handleIniciarTorneo} className="btn btn-cardtournament">INICIAR TORNEO</button>
                                </div>                            
                              </Tooltip>
                            </>
                            :
                            props.data.cerrado == false && props.data.torneoid !== "" ?
                            <>
                              <Tooltip title="El torneo ya se encuentra iniciado.">
                                <div className="d-flex justify-content-center">
                                  <button disabled onClick={handleIniciarTorneo} className="btn btn-cardtournament">INICIAR TORNEO</button>
                                </div>                            
                              </Tooltip>
                            </>
                            :
                            <></>
                            }
                            <button className="btn btn-cardtournament">CERRAR TORNEO</button>
                            <button onClick={toggleDrawer(anchor, false)} className="btn btn-cardtournament">VOLVER</button>
                          </div>
                        </Collapse>
                    </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                  <path fill=" #F6E7FF " fillOpacity="1" d="M0,96L480,160L960,96L1440,128L1440,0L960,0L480,0L0,0Z"></path>
                </svg>
            </div>

          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}