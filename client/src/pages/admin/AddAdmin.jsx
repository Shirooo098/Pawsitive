import React, {useState} from 'react'
import {useNavigate} from "react-router-dom";
import { addAdmin } from '../../api/addAdmin';

export default function AddAdmin() {
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [adminData, setAdminData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        type: 'admin'
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await addAdmin(adminData);

            navigate("/admin/dashboard");
            if(res.error){
                setErrors({ server: res.error });
            }
        } catch (error) {
            setErrors({ server : "Unexpected error occured." });
        }
    }
    
    const handleChange = (e) => {
        const {name, value} = e.target;

        setAdminData((prev) => ({
            ...prev,
            [name]: value,
            type: 'admin'
        }))
    }

    const handleCancel = () => {
        setAdminData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            type: 'admin'
        })
    }

  return (
    <>
        <div className="addAdmin-container">
            <form onSubmit={handleSubmit}>
                <div className="formHeader">
                    <h1>Add Admin</h1>
                </div>

                <div className="rowName">
                    <div className="colFirstName">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text"
                        name='firstName'
                        value={adminData.firstName} />
                    {errors.firstName && <span>{errors.firstName}</span>}
                    </div>

                    <div className="colLastName">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text"
                            name="lastName"
                            onChange={handleChange}
                            value={adminData.lastName} />
                        {errors.lastName && <span>{errors.lastName}</span>}
                    </div>
                </div>

                <div className="rowEmail">
                    <label htmlFor="email">Email</label>
                    <input type="email"
                        name="email"
                        onChange={handleChange}
                        value={adminData.email} />
                    {errors.email && <span>{errors.email}</span>}
                </div>

                <div className="rowPassword">
                    <label htmlFor="password">Password</label>
                    <input type="password"
                        name="password"
                        onChange={handleChange}
                        value={adminData.password} />
                    {errors.password && <span>{errors.password}</span>}
                </div>

                <div className="rowUserType">
                    <label htmlFor="">Role</label>
                    <input type="type"
                        name='type'
                        value={adminData.type}
                        disabled />

                    {errors.type && <span>{errors.type}</span>}
                </div>

                <div className="appointmentBtn-container">
                        <button className="btn btn-primary" type="submit">Submit</button>
                        <button className="btn btn-danger" type="button" onClick={handleCancel}>Cancel</button>
                    </div>
            </form>
        </div>
    </>
  )
}
