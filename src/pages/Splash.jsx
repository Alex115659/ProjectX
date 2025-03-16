import { useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import '../styles/splash.css'


function Splash(){

    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => navigate('/home'), 5000)
    })

    return (
        <>
 <div className="container">
      <motion.div
        className="spinning-circle"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
    </div>
        </>
    )
}
export default Splash;