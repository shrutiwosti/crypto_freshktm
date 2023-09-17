import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.png'
import { useState } from 'react';



const NavigationBar = () =>{

    const navigate = useNavigate()
    return(
        <div className='navigationContainer'>
            <div style={{fontSize:"40px", fontWeight:"1000",display:"flex"}}>
                <img src={logo} alt="logo" height="37px" width="37px" style={{marginRight:"14px", position:'relative', top:"-1px"}}/>
                <div style={{ fontWeight:"Bold",cursor:"pointer"}} onClick={() => {
                    navigate("/")
                }}>
                    CRYPTO.COM 
                </div>
            </div> 
            
        
        </div>

       
    )
}

export default NavigationBar;

