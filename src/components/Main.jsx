import React from "react";
import { Button, Modal, Box } from "@mui/material";
import PayPalDonation from "./PayPalContainer";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../redux/actions";
import "../styles/main.css"

const Main = () => {

    const dispatch = useDispatch();

    const boxStyles = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
      
    }

    const open = useSelector((state) => state.open)

    const handleOpen = () => dispatch(setOpen(true));
    const handleClose = () => dispatch(setOpen(false));

    return (
        <>
        <div style={{display: "flex", justifyContent: "center"}}>
        <Button onClick={handleOpen} sx={{
    backgroundColor: '#3d3a33', 
    color: "white",
    width: '500px',
    margin: '10px',
    padding: '12px 20px', 
    fontSize: '1.1rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    borderRadius: '8px',
    boxShadow: '0 5px 15px rgba(61, 58, 51, 0.3)', 
    transition: 'all 0.3s ease-in-out',
    
    '&:hover': {
      backgroundColor: '#2f2c27', 
      color: 'white',
      transform: 'scale(1.05)',
      boxShadow: '0 8px 20px rgba(61, 58, 51, 0.5)',
    },

    '&:active': {
      backgroundColor: 'transparent',
      border: '2px solid #3d3a33',
      boxShadow: 'none',
      transform: 'scale(0.98)',
    },
    
    '&:focus': {
      outline: 'none',
      boxShadow: '0 0 10px rgba(255, 255, 255, 0.4)',
    },
  }} >Send money</Button>
        </div>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
    >
    <Box sx={{ ...boxStyles, width: 400 }}>
        <PayPalDonation />
    </Box>
    </Modal>
</>
    )
}

export default Main;