import React from 'react'

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
            <td><img src={`http://localhost:3000${adopt.petimage}`} alt="" /></td>
            <td>{adopt.petname}</td>
            <td>{status}</td>
            <td>
                {
                    status !== 'approved' && (
                        <>
                            <button onClick={() => onUpdate(adopt.id)}>Update</button>
                            <button onClick={() => onDelete(adopt.id)}>Delete</button>
                        </>
                    )
                }
            </td>
        </tr>
    )
}