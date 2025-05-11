import React from 'react'
import './../assets/styles/checkups.css'
import Footer from '../components/Footer'
import CheckUpInclusion from '../components/CheckUpInclusion'
import AppointmentButton from '../components/AppointmentButton'

export default function CheckUp() {
  return (
    <>
    <section className="hero-checkup-section text-center">
        <div className="container">
          <h1 className="display-4">Routine Check-ups</h1>
          <p className="lead">Because your pet’s health deserves regular attention!</p>
          <AppointmentButton/>
        </div>
      </section>

      <section className="checkup-section mt-0 py-3">
        <h2 className="section-title text-center">Why are Routine Check-ups important?</h2>
        <p className="section-subtext text-center">Prevent problems before they start. Early detection saves lives!</p>
        <div className="row text-center mt-4">
          {["bi-heart-pulse", "bi-shield-check", "bi-patch-check"].map((icon, i) => (
            <div className="col-md-4 d-flex" key={i}>
              <div className="info-box w-100 d-flex flex-column align-items-center text-center">
                <i className={`bi ${icon}`} style={{ fontSize: "1in", color: "#f110aa" }}></i>
                <h4 className="mt-3"><strong>{["Preventative Care", "Vaccinations", "Peace of Mind"][i]}</strong></h4>
                <p className="mt-2">{
                  [
                    "Catch health issues early before they become serious or costly.",
                    "Keep your pet protected with up-to-date immunizations and boosters.",
                    "Know your pet is happy, healthy, and in loving hands."
                  ][i]
                }</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    <CheckUpInclusion/>  
    <Footer/>
    </>
  )
}
