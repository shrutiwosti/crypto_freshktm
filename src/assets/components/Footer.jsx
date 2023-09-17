import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.png'

//import social media icons
import { BiMap, BiLogoGmail, BiPhone, BiLogoFacebookSquare, BiLogoInstagram, BiLogoLinkedinSquare, BiLogoTwitter } from "react-icons/bi";




const Footer = () => {
    const navigate = useNavigate()
    return(
        <div style={styles.footerContainer}>
            <div style={styles.footerLogo}>
                <img src={logo} alt="logo" height="37px" width="37px" style={styles.logostyle}/>
                <div style={{cursor:"pointer"}} onClick={() => {
                    navigate("/")
                }}>
                    CRYPTO.COM
                </div>
            </div> 

            <div className='footerLinks'>
                
                Contact
                <a href="#map">
                    <div style={{fontWeight:"200"}}>
                        <BiMap style={{marginRight:"5px"}}/> Lazimpath, Kathmandu
                    </div>  
                </a>

                <a href="#gmail">
                    <div style={{fontWeight:"200"}}>
                        <BiLogoGmail style={{marginRight:"5px"}}/> support@gmail.com
                    </div>
                </a>

                <a href="#phone">
                    <div style={{fontWeight:"200"}}>
                        <BiPhone style={{marginRight:"5px"}}/> +977-9999999999
                    </div> 
                </a> 
            </div>

            <div className='footerLinks'>
                
                Resources
                <a href="#widget">
                    <div style={{fontWeight:"200"}}>
                        Site Widgets
                    </div>
                </a>
                <a href="#telegram">
                    <div style={{fontWeight:"200"}}>
                        Telegram Bot
                    </div>
                </a>
                <a href="#market">
                    <div style={{fontWeight:"200"}}>
                        Market Data API
                    </div>
                </a> 
            </div>

            <div className='footerLinks'>
                
                Support
                <a href="#help">
                    <div style={{fontWeight:"200"}}>
                        Help Center
                    </div>
                </a>
                <a href="#request">
                    <div style={{fontWeight:"200"}}>
                        Change Request Form
                    </div>
                </a> 
            </div>

            <div className='footerIcons'>

                <a href="#facebook">
                   <div>
                        <BiLogoFacebookSquare/>
                    </div> 
                </a>
                <a href="#instagram">
                   <div>
                        <BiLogoInstagram/>
                    </div> 
                </a>
                <a href="#linkedin">
                   <div>
                        <BiLogoLinkedinSquare/>
                    </div> 
                </a>
                <a href="#twitter">
                   <div>
                        <BiLogoTwitter/>
                    </div> 
                </a>
            </div>
        </div>
    )
}

const styles = {

    footerContainer:{
        width:"100%", 
        height:"200px", 
        backgroundColor:"white", 
        marginTop:"7%", 
        display:'flex', 
        alignItems:"start",
        padding:"2% 6.4% 0% 6.4%", 
        boxSizing:"border-box",
        justifyContent:"space-between"
    },

    logostyle:{
        marginRight:"14px", 
        position:'relative', 
        top:"-3px"
    },

    footerLogo:{
        fontSize:"26px", 
        fontWeight:"600",
        display:"flex"
    },

    footerLinks:{
        fontSize:"20px", 
        fontWeight:"800",
        display:"flex",
        flexDirection:"column",
        gap:"10px"
    },

    footerIcons:{
        fontSize:"20px", 
        fontWeight:"800",
        display:"flex",
        flexDirection:"column",
        gap:"10px"
    }
}

export default Footer