import React from 'react'

export default function AppoinmentRow({appt, onUpdate, onDelete}) {
    const date = new Date(appt.appointment_date)
    const formatDate = date.toLocaleDateString('en-CA');
    const status = appt.status.charAt(0).toUpperCase() + appt.status.slice(1);    

    return(
        <tr>
            <td>{formatDate}</td>
            <td>{appt.fullname}</td>
            <td>{appt.contact}</td>
            <td>{appt.pet_type}</td>
            <td>{appt.service}</td>
            <td>{status}</td>
            <td>
                {
                    status !== 'approved' && (
                        <>
                            <button onClick={() => onUpdate(appt.appointmentid)}>Update</button>
                            <button onClick={() => onDelete(appt.appointmentid)}>Delete</button>
                        </>
                    )
                }
            </td>
        </tr>
    )

}
