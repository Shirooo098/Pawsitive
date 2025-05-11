import React from 'react'

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
            <td><img src={`http://localhost:3000${userAdopt.petimage}`} alt={userAdopt.petname} /></td>
            <td>{userAdopt.petname}</td>
            <td>{status}</td>
            <td><button onClick={() => onDelete(userAdopt.id)}>Delete</button> </td>
            { /* 
                Add Complete Status in adoption
            */}

        </tr>
    )
}