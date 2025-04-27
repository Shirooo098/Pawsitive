import React from 'react'
import {checkAuth} from "../../api/auth";
import ConsultationForm from '../../components/ConsultationForm';
import './../../components/ConsultationForm.css'

export default function Consultation() {
    checkAuth();

    return (
        <>
            <h1>Pet Medical Consultation Form</h1>   
            <ConsultationForm/>
        </>
    )
}
