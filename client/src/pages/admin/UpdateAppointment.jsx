import React from 'react'
import { useParams } from 'react-router-dom'

export default function UpdateAppointment() {

    const { id } = useParams();
    console.log("ID from URL:", id);
    
    return (
        <div>UpdateAppointment</div>
    )
}
