import React from "react";

const ProfilePage = () => {
    return (  
        <>
            <div style={{display: "flex", flexDirection: "column", minHeight: "55vh"}} className='container'>
                <div className="jumbotron bg-light" style={{borderRadius: "20px", marginTop: "20px"}}>
                    <div className="container">
                        <h1 className="display-4">Perfil</h1>
                        <br/>
                        <p><i className="bi bi-dot"></i> NEXT SOON</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfilePage;