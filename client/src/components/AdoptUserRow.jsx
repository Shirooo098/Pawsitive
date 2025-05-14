import React from 'react'
import { API_BASE_URL } from '../api/auth';

export default function AdoptUserRow({userAdopt, onDelete}) {
    const date = new Date(userAdopt.scheduledate)
    const formatDate = date.toLocaleDateString('en-CA');
    const status = userAdopt.status.charAt(0).toUpperCase() + userAdopt.status.slice(1);    

    return(
        <tr>
            <td>{formatDate}</td>
            <td>{userAdopt.fullname}</td>
            <td>{userAdopt.email}</td>
            <td>{userAdopt.contact}</td>
            <td>{userAdopt.reason}</td>
            <td><img src={`${API_BASE_URL}${userAdopt.petimage}`} alt={userAdopt.petname} /></td>
            <td>{userAdopt.petname}</td>
            <td>{status}</td>
        </tr>
    )
}