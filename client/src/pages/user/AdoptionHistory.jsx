import React, { useEffect, useState } from 'react'
import { fetchAdoptionHistory } from '../../api/userAdoption';

export default function AdoptionHistory() {

    const [adoptionHistory, setAdoptionHistory] = useState([]);

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
        <div>Adoption History</div>
    </>
  )
}
