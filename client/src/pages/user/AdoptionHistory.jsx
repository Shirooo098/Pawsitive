import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { fetchAdoptionHistory } from '../../api/userAdoption';
import AdoptUserRow from '../../components/AdoptUserRow';

export default function AdoptionHistory() {

    const [adoptionHistory, setAdoptionHistory] = useState([]);
    const [filterStatus, setFilterStatus] = useState("All");

    const filterAdoptions = adoptionHistory.filter(userAdopt => 
        filterStatus === 'All' || userAdopt.status.toLowerCase() === filterStatus.toLowerCase()
    )
    useEffect(() => {
        const adoptionHistory = async () => {
            const userAdoptionHistory = await fetchAdoptionHistory();
            console.log("Adoption History:", userAdoptionHistory);
            setAdoptionHistory(userAdoptionHistory || []);
        }

        adoptionHistory();
    }, [])
  return (
    <>
     <div className="table-container">
        <div>
            <h1>Adoption History</h1>
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
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
                {filterAdoptions.map((userAdopt, index) => (
                 <AdoptUserRow
                  key={index}
                  userAdopt={userAdopt}
                 />
                ))}
              </tbody>
            </table>
       </div>
    </>
  )
}
