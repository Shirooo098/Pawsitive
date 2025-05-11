import React from 'react'
import { Link } from 'react-router-dom'

export default function AppointmentButton() {
  return (
    <Link to="/appointment" 
    className="btn btn-primary">
        Schedule an Appointment
    </Link>
  )
}
