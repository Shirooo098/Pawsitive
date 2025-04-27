
import React, { useState, useEffect } from 'react'
import { checkAuth } from '../../api/auth'
import { fetchAppointment } from '../../api/userAppointment';


export default function History() {
    checkAuth();

    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const loadAppointments = async() => {
            const data = await fetchAppointment();
            console.log("Appointments:", data);
            setAppointments(data || []);
        }

        loadAppointments();
    }, [])
    return (
        <>
            <div>
                <h1>History Page</h1>
            </div>

            <table>
            <thead>
                <tr>
                <th>Date</th>
                <th>Pet Name</th>
                <th>Pet Type</th>
                <th>Service</th>
                <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {appointments.map((appt, index) => (
                    

                <tr key={index}>
                    <td>
                    {
                        new Date(appt.appointment_date).toLocaleDateString('en-CA')
                    }</td>
                    <td>{appt.pet_name}</td>
                    <td>{appt.pet_type}</td>
                    <td>{appt.service}</td>
                    <td>{appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </>
    )
}
