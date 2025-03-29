import Navbar from "../components/Navbar";
import {isLogin} from "../services/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Appointment(){

    const navigate = useNavigate();

    useEffect(() => {
        isLogin(navigate);
    }, [navigate])

    return(
        <>
            <Navbar/>
            <h1>Appointment Page</h1>
        </>
    )
}

export default Appointment;