import React, {useState} from 'react'
import {useNavigate} from "react-router-dom";
import { addAdmin, deleteAdmin } from '../../api/addAdmin';
import AdminUserRow from '../../components/AdminUserRow';

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
    const [adminUsers, setAdminUsers] = useState([]);

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

    const handleDelete = async(id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this Admin?");
        if(!confirmDelete) return;

        try {
            await deleteAdmin(id);

            setAdminUsers(prev => prev.filter(admin => admin.id !== id));
        } catch (error) {
            console.error("Error deleting admin:", error);
            alert("Failed to delete admin");
        }
    }

    useEffect(() => {
        const fetchAdminUsers = async() => {
            const data = await fetchAdmins();
            console.log("Admin Users from backend: ", data);
            setAdminUsers(data || []);
        }

        fetchAdminUsers();
    }, [])

  return (
    <>
        <div className="addAdmin-container">
            <form className="adminForm" onSubmit={handleSubmit}>
                <div className="formHeader">
                    <h1>Add Admin</h1>
                </div>

                <div className="rowName">
                    <div className="colFirstName">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text"
                        name='firstName'
                        onChange={handleChange}
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

            <table>
                <thead>
                    <tr>
                        <th scope='col'>First Name</th>
                        <th scope='col'>Last Name</th>
                        <th scope='col'>Email</th>
                        <th scope='col'>Type</th>
                        <th scope='col'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {adminUsers.map((admin, index) => {
                        <AdminUserRow
                            key={index}
                            adminUsers={admin}
                            onDelete={handleDelete}
                        />
                    })}
                </tbody>
            </table>
        </div>
    </>
  )
}
