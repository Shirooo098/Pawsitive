import './AdoptionForm.css'
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

    if(!petDetail){
        return <p>Loading Pet Details...</p>
    }

    const isFemale = petDetail.petsex === 'F';

  return (
    <>
        <h1>Adoption Application Form</h1>
        <div className="adoption-wrapper">
            <div className="pet-container">
                <img src={`http://localhost:3000${petDetail.petimage}`}alt={petDetail.petName} />
                <h2>{petDetail.petname}</h2>
                <h3>{petDetail.petage}</h3>
                <h3>{isFemale ? 'Female' : 'Male'}</h3>
            </div>
            <div className="adoption-form">
                
            </div>
        </div>
    </>
  )
}
