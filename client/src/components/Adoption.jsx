import React from 'react'

export default function Adoption() {
  return (
    <section id="adoption" className="container-fluid px-0">
    <div className="py-5 text-center">
        <h2 className="section-title">Adoption & Rescue Partnership</h2>
        <p className="section-subtext">Give a loving home to a pet in need. Adopt today!</p>
    </div>
    <div className="carousel-container">
        <div className="pet-carousel" id="petCarousel">
            {/* Pet cards will be duplicated by JavaScript for infinite scrolling effect */}
            {['Bella', 'Max', 'Luna', 'Buddy'].map((pet, index) => (
                <div key={index} className="adoption-card">
                    <img src={`${pet.toLowerCase()}.jpg`} alt={pet} />
                    <h3>{pet}</h3>
                    <p>A sweet {pet} looking for a forever home.</p>
                    <button className="btn btn-primary">Adopt Me</button>
                </div>
            ))}
        </div>
    </div>
    </section>
  )
}
