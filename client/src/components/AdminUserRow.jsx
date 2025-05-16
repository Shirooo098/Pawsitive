import React from 'react'

export default function AdminUserRow({adminUsers, onDelete}) {
  return (
    <tr>
        <td>{adminUsers.firstname}</td>
        <td>{adminUsers.lastname}</td>
        <td>{adminUsers.email}</td>
        <td>{adminUsers.type}</td>
        <td>
           <button className='btn btn-danger' onClick={() => onDelete(adminUsers.userid)}>Delete</button>
        </td>
    </tr>
  )
}
