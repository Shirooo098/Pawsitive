import React, { useEffect, useState } from 'react'
import { fetchAdoptPets } from '../api/userAdoption';

export default function Adoption() {
    const [pets, setPets] = useState([]);
    useEffect(() => {
        const fetchPets = async() => {
            try {
                const response = await fetchAdoptPets();

                console.log("Pets:", response);

                if(!response) return;

                setPets(response);
            } catch (error) {
                console.error("Error fetching pets:", error);
            }
        }

        fetchPets()
    }, [])
  return (
    <section id="adoption" className="container-fluid px-0">
    <div className="py-5 text-center">
        <h2 className="section-title">Adoption & Rescue Partnership</h2>
        <p className="section-subtext">Give a loving home to a pet in need. Adopt today!</p>
    </div>
    <div className="carousel-container">
        <div className="pet-carousel" id="petCarousel">
            {pets.map((pet) => (
                <div key={pet.id} className="adoption-card">
                    <img src={`http://localhost:3000${pet.petimage}`} alt={pet.petName} />
                    <h3>{pet.petname}</h3>
                    <p>A sweet {pet.petname} looking for a forever home.</p>
                    <button className="btn btn-primary">Adopt Me</button>
                </div>
            ))}
        </div>
    </div>
    </section>
  )
}
