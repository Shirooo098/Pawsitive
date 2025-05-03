import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { fetchAdoptPetDetails } from '../../api/userAdoption';

export default function AdoptionForm() {
    const { id } = useParams();
    const [petDetail, setPetDetail] = useState(null);

    useEffect(() => {
        const fetchPetDetail = async () => {
            try {
                const response = await fetchAdoptPetDetails(id);

                setPetDetail(response);
            } catch (error) {
                console.error("Error fetching pet details:", error);
            }
        }
        fetchPetDetail();
    }, []);

  return (
    <>
        <h1>Adoption Application Form</h1>
    </>
  )
}
