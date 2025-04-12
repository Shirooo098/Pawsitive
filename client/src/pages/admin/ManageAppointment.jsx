import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { checkAuth } from '../../api/auth'
import { deleteAppointment, fetchAppointments } from '../../api/adminAppointment';

export default function ManageAppointment() {
  checkAuth();

  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const loadUserAppointments = async() => {
      const data = await fetchAppointments();
      console.log("Appointments from backend: ", data);
      setAppointments(data || []);
    };

    loadUserAppointments();
  }, []);

  const handleDelete = async(id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this appointment?");
    if(!confirmDelete) return;

    try {
        await deleteAppointment(id);

        setAppointments(prev => prev.filter(appointments => appointments.appointmentid !== id));
    } catch (error) {
      
    }
  }
  const handleUpdate = (id) => {
    console.log(`Update appointment: ${id}`)
    navigate(`/admin/updateAppointment/${id}`)
  }

  return (
    <>
      <div>
        <h1>Manage Appointments</h1>
      </div>

      <table>
      <caption>A list of your upcoming appointments.</caption>
      <thead>
        <tr>
          <th>Date</th>
          <th>Full Name</th>
          <th>Contact</th>
          <th>Pet Type</th>
          <th>Service</th>
          <th>Status</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        {appointments.map((appt, index) => (
          <tr key={index}>
            <td>
              {
                new Date(appt.appointment_date)    
                .toISOString()
                .slice(0, 10)    
              }</td>
            <td>{appt.fullname}</td>
            <td>{appt.contact}</td>
            <td>{appt.pet_type}</td>
            <td>{appt.service}</td>
            <td>{appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}</td>
            <td>
              <button onClick={() => handleUpdate(appt.appointmentid)}>Update</button>
              <button onClick={() => handleDelete(appt.appointmentid)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  )
}
