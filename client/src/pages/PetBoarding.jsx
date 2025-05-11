import React from 'react'
import '../assets/styles/petboarding.css'
import BoardingRates from '../components/BoardingRates'
import Footer from '../components/Footer'

export default function PetBoarding() {
  return (
    <>
    <section className="hero-section-petBoarding">
        <div className="container-pb">
          <h1 className="display-4">Premium Pet<br />Boarding Services</h1>
          <p className="lead">Experience peace of mind knowing your fur babies are in a loving environment that feels like home.</p>
          <a href="appointment.html" className="btn btn-primary-pb">Book Now</a>
          <a href="homepage.html" className="btn btn-secondary-pb">Browse all Services</a>
        </div>
      </section>

    <BoardingRates/>
    <Footer/>
    </>
  )
}
