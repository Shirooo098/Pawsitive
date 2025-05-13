import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { checkAuth } from '../../api/auth'
import { fetchAppointment } from '../../api/userAppointment';

export default function AppointmentHistory() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadAppointments = async () => {
            try {
                setLoading(true);
                const data = await fetchAppointment();
                console.log("Appointments:", data);
                setAppointments(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Error loading appointments:", err);
                setError("Failed to load appointments");
            } finally {
                setLoading(false);
            }
        };

        loadAppointments();
    }, []);

    if (loading) {
        return <div>Loading appointments...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="appointment-history">
            <div className="header">
                <h1>Appointment History</h1>
            </div>

            <div className="table-container">
                {appointments.length === 0 ? (
                <div className="no-appointments">
                    <p>No appointments found.</p>
                    <Link to="/appointment" className="schedule-link">Schedule an appointment</Link>
                </div>
            ) : (
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th scope='col'>Date</th>
                            <th scope='col'>Pet Name</th>
                            <th scope='col'>Pet Type</th>
                            <th scope='col'>Service</th>
                            <th scope='col'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appt, index) => (
                            <tr key={appt.appointmentid || index}>
                                <td>
                                    {new Date(appt.appointment_date).toLocaleDateString('en-CA')}
                                </td>
                                <td>{appt.pet_name}</td>
                                <td>{appt.pet_type}</td>
                                <td>{appt.service}</td>
                                <td>
                                    {appt.status ? 
                                        appt.status.charAt(0).toUpperCase() + appt.status.slice(1) 
                                        : 'Pending'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            </div>
        </div>
        
    );
}
