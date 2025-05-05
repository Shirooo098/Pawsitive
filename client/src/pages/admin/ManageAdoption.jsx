import './Adoption.css'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { checkAuth } from '../../api/auth'
import { fetchAdoptPetRequest } from '../../api/adminAdoption';
import AdoptRow from '../../components/AdoptRow';

export default function ManageAdoption() {
  checkAuth();

  const navigate = useNavigate();
  const [adoptRequest, setAdoptRequest] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");

  const filterAdoptions = adoptRequest.filter(adopt => 
    filterStatus === 'All' || adopt.status.toLowerCase() === filterStatus.toLowerCase()
  )

  useEffect(() => {
    const loadUserAdoptRequest = async() => {
      const data = await fetchAdoptPetRequest();
      console.log("Adoption Request from backend: ", data);
      setAdoptRequest(data || []);
    };

    loadUserAdoptRequest();
  }, []);

  const handleDelete = async(id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this adoption request?");
    if(!confirmDelete) return;

    try {
        await deleteAppointment(id);

        setAppointments(prev => prev.filter(appointments => appointments.appointmentid !== id));
    } catch (error) {
      
    }
  }
  const handleUpdate = (id) => {
    console.log(`Update appointment: ${id}`)
    // navigate(`/admin/updateAdoption/${id}`)
  }

  return (
    <>
      <div>
        <h1>Manage Adoption Request</h1>
      </div>

      <select value={filterStatus} onChange={(e) => {
        setFilterStatus(e.target.value)
      }}>
        <option value="All">All</option>
        <option value="Pending">Pending</option>
        <option value="Approved">Approved</option>
      </select>

      <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Full Name</th>
          <th>Email</th>
          <th>Contact</th>
          <th>Reason</th>
          <th>Pet Image</th>
          <th>Pet Name</th>
          <th>Status</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        {filterAdoptions.map((adopt, index) => (
         <AdoptRow
          key={index}
          adopt={adopt}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
         />
        ))}
      </tbody>
    </table>
    </>
  )
}