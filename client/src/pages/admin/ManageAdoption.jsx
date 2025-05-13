import './../../assets/styles/Adoption.css'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { checkAuth } from '../../api/auth'
import { fetchAdoptPetRequest, deleteAdoption } from '../../api/adminAdoption';
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
        await deleteAdoption(id);

        setAdoptRequest(prev => prev.filter(adopt => adopt.id !== id));
    } catch (error) {
      
    }
  }
  const handleUpdate = (id) => {
    console.log(`Update appointment: ${id}`)
    navigate(`/admin/updateAdoption/${id}`)
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
        <option value="Declined">Declined</option>
      </select>

      <div className="table-container">
        <table className='table table-striped'> 
        <thead>
          <tr>
            <th scope='col'>Date</th>
            <th scope='col'>Full Name</th>
            <th scope='col'>Email</th>
            <th scope='col'>Contact</th>
            <th scope='col'>Reason</th>
            <th scope='col'>Pet Image</th>
            <th scope='col'>Pet Name</th>
            <th scope='col'>Status</th>
            <th scope='col'>Edit</th>
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
      </div>
    </>
  )
}