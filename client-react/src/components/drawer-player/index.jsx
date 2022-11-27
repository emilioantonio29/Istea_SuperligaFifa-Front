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
import TestCollapseComponent from '../test-collapse';
import Collapse from "@mui/material/Collapse";
import FixturesDetailComponent from '../drawer-fixturesdetail';
import ResultsDetailComponent from '../drawer-tournamentresults';



export default function DrawerPlayerComponent(props) {

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

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <div>
      {['bottom'].map((anchor) => (
        <React.Fragment key={anchor}>
          {props.data.torneoid == "" ?
          <>
            <Tooltip title={<h6 style={{ color: "white" }}>Solo puedes abrir el detalle de torneos en curso o cerrados.</h6>}>
              <div className="d-flex justify-content-center">
                <button disabled onClick={toggleDrawer(anchor, true)} className="btn btn-cardtournament">Detalle</button>
              </div>                            
            </Tooltip>
          </>
          : 
          <>
            <button onClick={toggleDrawer(anchor, true)} className="btn btn-cardtournament">Detalle</button>
          </>
          }
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
                            <p style={{fontSize: "20px"}}>JUGADOR <BiRightArrowAlt/></p>
                            <p style={{marginLeft: "5px", fontSize: "20px"}}>Mis Torneos <BiRightArrowAlt/></p>
                            <p style={{marginLeft: "5px", fontSize: "20px"}}>{props.data.nombre}</p>
                          </div>
                          <button onClick={toggleDrawer(anchor, false)} className="btn btn-cardtournament">VOLVER</button>
                        </div>
                        {/* <button onClick={()=>console.log(props.data)}>test</button> */}
                        
                        <TournamentDetailComponent data={props.data}/>

                        <CommonSpacer marginTop={"40px"}/>

                        <FixturesDetailComponent data={props.data} />

                        <CommonSpacer marginTop={"40px"}/>

                        <ResultsDetailComponent/>



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