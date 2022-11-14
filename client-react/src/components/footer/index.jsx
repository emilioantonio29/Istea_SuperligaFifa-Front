import React from "react";
import './components-footer.scss';

const FooterComponent = () => {
  return (
    <>
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