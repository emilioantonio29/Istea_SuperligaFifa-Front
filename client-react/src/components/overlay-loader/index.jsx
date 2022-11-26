import React from 'react';


const Overlay = () => {


  return (
        <div style={{
          backgroundColor: "#EFEFEF", 
          position: "fixed", 
          width: "100%", 
          height: "100%", 
          zIndex: "10000", 
          top: "0px", 
          left: "0px", 
          opacity: ".1", 
          filter: "alpha(opacity=50)"
        }}>
          <div className='d-flex justify-content-center' style={{marginTop: "40vh"}}>
            <span style={{height: "25px", width: "25px"}} className="spinner-grow spinner-grow-sm"></span>
            <span style={{height: "25px", width: "25px"}} className="spinner-grow spinner-grow-sm"></span>
            <span style={{height: "25px", width: "25px"}} className="spinner-grow spinner-grow-sm"></span>
          </div>
      </div>
  );
}

export default Overlay;