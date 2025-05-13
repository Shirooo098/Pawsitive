import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { checkAuth } from '../../api/auth'
import { deleteAppointment, fetchAppointments } from '../../api/adminAppointment';
import AppoinmentRow from '../../components/AppoinmentRow';

export default function ManageAppointment() {
  checkAuth();

  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");

  const filterAppoinments = appointments.filter(appt => 
    filterStatus === 'All' || appt.status.toLowerCase() === filterStatus.toLowerCase()
  )

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

      <select value={filterStatus} onChange={(e) => {
        setFilterStatus(e.target.value)
      }}>
        <option value="All">All</option>
        <option value="Pending">Pending</option>
        <option value="Approved">Approved</option>
        <option value="Declined">Declined</option>
      </select>

      <table className='table table-striped'>
      <caption>A list of your upcoming appointments.</caption>
      <thead>
        <tr>
          <th scope='col'>Date</th>
          <th scope='col'>Full Name</th>
          <th scope='col'>Contact</th>
          <th scope='col'>Pet Type</th>
          <th scope='col'>Service</th>
          <th scope='col'>Status</th>
          <th scope='col'>Edit</th>
        </tr>
      </thead>
      <tbody>
        {filterAppoinments.map((appt, index) => (
         <AppoinmentRow
          key={index}
          appt={appt}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
         />
        ))}
      </tbody>
    </table>
    </>
  )
}