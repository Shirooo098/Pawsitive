import '../../assets/styles/AdoptionForm.css'
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { fetchAdoptPetDetails, sendAdoption } from '../../api/userAdoption';
import { checkAuth } from '../../api/auth';
import { API_BASE_URL } from '../../api/auth';

export default function AdoptionForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState();
    const [minDate, setMinDate] = useState('');
    const [petDetail, setPetDetail] = useState(null);
    const [adoptionData, setAdoptionData] = useState({
        petID: id,
        scheduleDate: '',
        fullName: '',
        email: '',
        contact: '',
        address: '',
        reason: ''
    })

    useEffect(() => {
        const fetchPetDetail = async () => {
            try {
                const response = await fetchAdoptPetDetails(id);

                setPetDetail(response);
            } catch (error) {
                console.error("Error fetching pet details:", error);
            }
        }

        fetchPetDetail();
    }, []);

    useEffect(() => {
        const fetchUserDetails = async() => {
            const userDetails = await checkAuth();
            if(userDetails && userDetails.user){
                setUser(userDetails.user);

                console.log("User Details:", userDetails.user);

                setAdoptionData((prev) => ({
                    ...prev,
                    userID: userDetails.user.userID,
                    fullName: `${userDetails.user.firstName}${userDetails.user.lastName}`,
                    email: userDetails.user.email,
                }))
            }   
        }

        fetchUserDetails();
    }, []);

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setMinDate(today);
    }, [])

    const handleChange = (e) => {
        const { name, value}  = e.target;

        setAdoptionData((prevState) => ({
            ...prevState,

            [name]: name === "scheduleDate" ? value : value
        }))
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Adoption Data:", adoptionData);

        try {
            const res = await sendAdoption(adoptionData);

            navigate("/");
            if(res.error){
                console.error("Server Error:", res.error);
            }
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
        }
    }

    if(!petDetail){
        return <p>Loading Pet Details...</p>
    }

    const isFemale = petDetail.petsex === 'F';


  return (
    <>
        <h1>Adoption Application Form</h1>
        <div className="container my-5">
            <h2 className="text-center mb-4">Adoption Application</h2>
            <div className="row align-items-center mb-5 pet-card">
                <div className="col-md-4 text-center">
                    <img
                    src={`${API_BASE_URL}${petDetail.petimage}`}
                    alt="Pet Image"
                    className="img-fluid"
                    />
                </div>
                <div className="col-md-8">
                    <h3>
                    Pet Name: <strong>{petDetail.petname}</strong>
                    </h3>
                    <p>
                    Age: <strong>{petDetail.petage}</strong>
                    </p>
                    <p>Gender: {isFemale ?  'Female' : 'Male'}</p>
                </div>
            </div>

            <div className="form-section">
            <form className='adoption-form' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="date">Schedule</label>
                    <input type="date"
                        name="scheduleDate"
                        className="form-control"
                        onChange={handleChange}
                        min={minDate}
                        value={adoptionData.scheduleDate || ""}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">
                        Full Name *
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name="fullName"
                        onChange={handleChange}
                        value={adoptionData.fullName}
                        disabled
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email Address *
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        onChange={handleChange}
                        value={adoptionData.email}
                        disabled
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="contact" className="form-label">
                        Contact Number *
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name="contact"
                        value={adoptionData.contact}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                        Home Address *
                    </label>
                    <textarea
                        className="form-control"
                        id="address"
                        name="address"
                        value={adoptionData.address}
                        onChange={handleChange}
                        required=""
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="reason" className="form-label">
                        Why do you want to adopt this pet? *
                    </label>
                    <textarea
                        className="form-control"
                        id="reason"
                        name="reason"
                        rows={4}
                        required=""
                        value={adoptionData.reason}
                        onChange={handleChange}
                    />
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-pawsitive px-5">
                        Submit Application
                    </button>
                </div>
            </form>
            </div>
        </div>
    </>
  )
}
