import React from 'react'
import { checkAuth } from '../../api/auth'

export default function Dashboard() {

  checkAuth();

  return (
    <>
        <h1>Dashboard</h1>
    </>
  )
}
