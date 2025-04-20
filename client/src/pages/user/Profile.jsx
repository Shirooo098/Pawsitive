import React, {useState, useEffect} from 'react'
import { checkAuth } from '../../api/auth'
import { Link } from "react-router-dom";
import { getUserProfile } from '../../api/userProfile';

export default function Profile() {
    checkAuth();


    const [userData, setUserData] = useState({
        fullName: '',
        email: '',
        contact: '',
        address:  '',
    });
    const handleSubmit = async(e) => {
        e.preventDefault();
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        setUserData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        const fetchUserInformation = async() => {
            const userInformation = await getUserProfile();
        }
    }, [])

    return (
        <>
            <h1>Profile Page</h1>
            <Link to='/history'>History</Link>

            <div className="appointment-container">
                <form onSubmit={handleSubmit}>
                    <div className="formHeader">
                        <h1>User Profile</h1>
                    </div>
                    <div className="schedule-information">
                        <div className="colUser">
                            <h2>Profile Information</h2>
                            <div className="rowFullName">
                                <label htmlFor="fullName">Name</label>
                                <input type="text"
                                    name="fullName"
                                    value={userData.fullName}
                                    disabled
                                />
                            </div>

                            <div className="rowEmailApp">
                                <label htmlFor="email">Email</label>
                                <input type="email"
                                    name="email"
                                    value={userData.email}
                                    disabled
                                />
                            </div>

                            <div className="rowContact">
                                <label htmlFor="contact">Contact</label>
                                <input type="text"
                                    name="contact"
                                    onChange={handleChange}
                                    value={userData.contact}
                                />
                            </div>

                            <div className="rowAddress">
                                <label htmlFor="address">Address</label>
                                <input type="text"
                                    name="address"
                                    onChange={handleChange}
                                    value={userData.address}
                                />
                            </div>
                        </div>


                    </div>
                    </form>
                </div>
        </>
    )
}