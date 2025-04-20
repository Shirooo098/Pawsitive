import React from 'react'
import {checkAuth} from "../../api/auth";
import ConsultationForm from '../../components/ConsultationForm';

export default function Consultation() {
    checkAuth();

    return (
        <>
            <h1>Consultation</h1>   
            <ConsultationForm/>
        </>
    )
}
