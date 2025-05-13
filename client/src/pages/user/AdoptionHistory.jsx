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
    </>
  )
}
