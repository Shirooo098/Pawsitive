import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/styles/petboarding.css'
import BoardingRates from '../components/BoardingRates'
import Footer from '../components/Footer'
import AppointmentButton from '../components/AppointmentButton'

export default function PetBoarding() {
  return (
    <>
    <section className="hero-section-petBoarding">
        <div className="container-pb">
          <h1 className="display-4">Premium Pet<br />Boarding Services</h1>
          <p className="lead">Experience peace of mind knowing your fur babies are in a loving environment that feels like home.</p>
          <AppointmentButton/>
          <Link to="/" className="btn btn-secondary-pb">Browse all Services</Link>
        </div>
      </section>

    <BoardingRates/>
    <Footer/>
    </>
  )
}
