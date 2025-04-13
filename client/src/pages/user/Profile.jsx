import React from 'react'
import { checkAuth } from '../../api/auth'
import { Link } from "react-router-dom";

export default function Profile() {
    checkAuth();

    return (
        <>
            <h1>Profile Page</h1>
            <Link to='/history'>History</Link>
        </>
    )
}