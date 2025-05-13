import React, {useState, useEffect} from 'react'
import { checkAuth, profileUpdate } from '../../api/auth'
import { Link } from "react-router-dom";

export default function Profile() {
    checkAuth();
    const [userData, setUserData] = useState({
        fullName: '',
        email: '',
        contact: '',
        address:  '',
    });

    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async(e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await profileUpdate(userData);
            if(response.error){
                setError(response.error);
            } else {
                setSuccess("Profile updated successfully.");
                if (response.user) {
                    setUserData(prev => ({
                        ...prev,
                        ...response.user
                    }));
                }
            }
        } catch (error) {
            setError("Failed to update profile. Please try again.");
            console.error("Profile update error:", err);
        }finally {
            setIsLoading(false);
            setIsEditing(false);
        }
       
    }
    

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        setUserData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
    }
    useEffect(() => {
        const fetchUserInformation = async() => {
            const userInformation = await checkAuth()
            if(userInformation && userInformation.user){
                setUserData(userInformation.user);
            }
        }

        fetchUserInformation();
    }, [])




    console.log("User Data:", userData);

    return (
        <>
            <h1>Profile Page</h1>
            <Link to='/appointmentHistory'>Appointments</Link>
            <Link to='/adoptionHistory'>Adoptions</Link>

            <div className="appointment-container">
                <form onSubmit={handleSubmit}>
                    <div className="formHeader">
                        <h1>User Profile</h1>
                        {!isEditing && (
                            <button 
                                type="button" 
                                onClick={handleEdit}
                                className="edit-btn"
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>

                    {error && <div className="error-message">{error}</div>}
                    {success && <div className="success-message">{success}</div>}

                    <div className="schedule-information">
                        <div className="colUser">
                            <h2>Profile Information</h2>
                            <div className="rowFullName">
                                <label htmlFor="fullName">Name</label>
                                <input type="text"
                                    name="fullName"
                                    value={`${userData.firstname} ${userData.lastname}`}
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
                                    value={userData.contact || ''}
                                    disabled={!isEditing}
                                />
                            </div>

                            <div className="rowAddress">
                                <label htmlFor="address">Address</label>
                                <input type="text"
                                    name="address"
                                    onChange={handleChange}
                                    value={userData.address || ''}
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>
                    </div>

                    {isEditing && (
                        <div className="profileBtn-contaier">
                            <button 
                                type="submit" 
                                className="formSubmitBtn"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Saving...' : 'Save Changes'}
                            </button>
                            <button 
                                type="button" 
                                onClick={handleCancel}
                                className="formCancelBtn"
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                    </form>
                </div>
        </>
    )
}