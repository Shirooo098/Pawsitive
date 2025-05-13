import React from 'react'
import { API_BASE_URL } from '../api/auth';

export default function AdoptRow({adopt, onUpdate, onDelete}) {
    const date = new Date(adopt.scheduledate)
    const formatDate = date.toLocaleDateString('en-CA');
    const status = adopt.status.charAt(0).toUpperCase() + adopt.status.slice(1);    

    return(
        <tr>
            <td>{formatDate}</td>
            <td>{adopt.fullname}</td>
            <td>{adopt.email}</td>
            <td>{adopt.contact}</td>
            <td>{adopt.reason}</td>
            <td><img src={`${API_BASE_URL}${adopt.petimage}`} alt={adopt.petname} /></td>
            <td>{adopt.petname}</td>
            <td>{status}</td>
            <td>
                {
                    status !== 'approved' && (
                        <>
                            <button className='btn btn-primary' onClick={() => onUpdate(adopt.id)}>Update</button>
                            <button className='btn btn-danger' onClick={() => onDelete(adopt.id)}>Delete</button>
                        </>
                    )
                }
            </td>
        </tr>
    )
}