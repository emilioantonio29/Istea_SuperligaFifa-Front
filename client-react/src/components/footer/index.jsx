import React from "react";
import './components-footer.scss';

const FooterComponent = () => {
  return (
    <>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">         
             <path fill=" #F6E7FF " fillOpacity="1" d="M0,160L26.7,176C53.3,192,107,224,160,224C213.3,224,267,192,320,197.3C373.3,203,427,245,480,245.3C533.3,245,587,203,640,176C693.3,149,747,139,800,160C853.3,181,907,235,960,245.3C1013.3,256,1067,224,1120,213.3C1173.3,203,1227,213,1280,186.7C1333.3,160,1387,96,1413,64L1440,32L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"></path>
        </svg>
        <footer style={{marginTop: "auto", minHeight: "6vh"}} className="footer d-flex align-items-center justify-content-center" >
            <div>
                <div>
                    <p style={{color: "", marginTop: "10px", fontSize: "19px"}} className="color-light">© 2022 | about us: 
                        <a 
                        href="" 
                        target="_blank" rel="noreferrer"
                        className="color-weight"
                        style={{marginLeft: "5px"}}
                        >
                            Superliga FIFA
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    </>
  );
}

export default FooterComponent;