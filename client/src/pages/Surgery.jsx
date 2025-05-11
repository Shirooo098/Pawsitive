import React from 'react'
import Footer from '../components/Footer'
import '../assets/styles/surgery.css'
import AppointmentButton from '../components/AppointmentButton'

export default function Surgery() {
  return (
    <>
        <section className="hero-section-surg text-center">
            <h1>Surgery Services</h1>
            <p>Ensuring your pet’s health with safe and compassionate surgical care.</p>
            <AppointmentButton/>
        </section>

        <section className="info-section">
            <h1>
            Gentle Surgical Care <br /> for Your Pets!
            </h1>
            <p className="intro">
            With love and expertise, our veterinary team provides safe and compassionate surgical solutions for your beloved pets.
            </p>

            <div className="card">
            <h2>General Surgery</h2>
            <ul>
                <li>Spaying and neutering for population control and behavioral health</li>
                <li>Soft tissue surgeries like mass removals and wound treatments</li>
                <li>All surgeries performed under strict monitoring for your pet’s safety</li>
            </ul>
            </div>

            <div className="card">
            <h2>Orthopedic Surgery</h2>
            <ul>
                <li>Advanced care for bone fractures, ligament tears, and joint issues</li>
                <li>Restoring mobility and comfort with precision and post-op guidance</li>
                <li>Comprehensive rehab support for smooth recovery</li>
            </ul>
            </div>

            <div className="card">
            <h2>Emergency Surgery</h2>
            <ul>
                <li>On-call professionals for urgent care during health crises</li>
                <li>Immediate surgical intervention when time is critical</li>
                <li>Compassionate support for pet parents during emergencies</li>
            </ul>
            </div>

            <div className="card">
            <h2>Dental Surgery</h2>
            <ul>
                <li>Extractions of damaged or infected teeth</li>
                <li>Treatment of oral tumors and gum disease</li>
                <li>Promoting better oral hygiene and pain relief</li>
            </ul>
            </div>

            <div className="card">
            <h2>Soft Tissue Surgery</h2>
            <ul>
                <li>Hernia repair and mass removal procedures</li>
                <li>Organ surgeries like bladder stone removal</li>
                <li>Minimally invasive options available</li>
            </ul>
            </div>

            <div className="card">
            <h2>Reconstructive Surgery</h2>
            <ul>
                <li>Cosmetic or functional restoration following trauma or illness</li>
                <li>Enhances your pet’s comfort and appearance</li>
                <li>Careful planning and follow-up to ensure success</li>
            </ul>
            </div>
        </section>
    <Footer/>
    </>
  )
}
