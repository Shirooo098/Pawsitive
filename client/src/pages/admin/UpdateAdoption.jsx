import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import React from 'react'
import { fetchAdoptDetails, updateAdoptionRequest } from "../../api/adminAdoption";

export default function UpdateAdoption() {
    const navigate = useNavigate();
    const [adopt, setAdopt] = useState(null);
    const [updateAdopt, setUpdateAdopt] = useState({
        status: ''
    })
    const { id } = useParams();
    const status = ['pending','approved', 'declined']
    console.log("ID from URL:", id);

    useEffect(() => {
        const getAdoptRequest = async () => {
            const adoptData = await fetchAdoptDetails(id);
            setAdopt(adoptData)
            setUpdateAdopt({ status: adoptData.status})
        }

        getAdoptRequest();
    }, [id])

    if(!adopt) return <div>Loading adoption details...</div>

    const isFemale = adopt.petsex === 'F';

    const handleSubmit = async(e) => {
        e.preventDefault();

        console.log("Status: ", updateAdopt.status)

        try {
            const res = await updateAdoptionRequest(id, updateAdopt.status);

            console.log("Response from API:", res)
            // navigate("/admin/addPet");
            if(res.error){
                setErrors({ server: res.error});
            } 
        } catch (error) {
            console.log({ server: "Unexpected error occured."});
        }
    }
  return (
    <>
        <div className="adoption-container">
            <form onSubmit={handleSubmit}>
                <div className="formHeader">
                    <h1>Update an Adoption</h1>
                </div>

                <div className="rowSchedule">
                    <label htmlFor="date">Schedule</label>
                    <input type="text"
                        defaultValue={new Date(adopt.scheduledate).toISOString().slice(0, 10)}
                        readOnly
                    />
                </div>

                <div className="adoption-information">
                        <div className="colUser">
                            <h2>User Information</h2>
                            <div className="rowFullName">
                                <label htmlFor="fullName">Name</label>
                                <input type="text"
                                    defaultValue={adopt.fullname}
                                    readOnly/>
                            </div>

                            <div className="rowEmailApp">
                                <label htmlFor="email">Email</label>
                                <input type="email"
                                    defaultValue={adopt.email}
                                    readOnly/>
                            </div>

                            <div className="rowContact">
                                <label htmlFor="contact">Contact</label>
                                <input type="text"
                                    defaultValue={adopt.contact}
                                    readOnly/>
                            </div>

                            <div className="rowAddress">
                                <label htmlFor="address">Address</label>
                                <input type="text"
                                    defaultValue={adopt.address}
                                    readOnly/>
                            </div>

                            <div className="rowReason">
                                <label htmlFor="address">Reason for Adoption</label>
                                <textarea 
                                    defaultValue={adopt.reason}
                                    readOnly/>
                            </div>
                        </div>

                        <div className="colPet">
                            <h2>Pet Information</h2>

                            <div className="rowPetImage">
                                <img src={`http://localhost:3000${adopt.petimage}`} alt="" />
                            </div>

                            <div className="rowPetName">
                                <label htmlFor="petName">Pet Name</label>
                                <input type="text"
                                defaultValue={adopt.petname}
                                readOnly/>
                            </div>

                            <div className="rowPetAge">
                                <label htmlFor="PetAge">Pet Age</label>
                                <input type="text"
                                defaultValue={adopt.petage} 
                                readOnly/>
                            </div>

                            <div className="rowPetGender">
                                <label htmlFor="petGender">Pet Gender</label>
                                <input type="text"
                                defaultValue={isFemale ? 'Female' : 'Male'}
                                readOnly />
                            </div>

                            <div className="rowPetBreed">
                                <label htmlFor="petBreed">Pet Breed</label>
                                <input type="text"
                                defaultValue={adopt.petbreed}
                                readOnly />
                            </div>
                            
                        </div>

                </div>

                <div className="appointmentStatus-container">
                    <div className="rowStatus">
                        <label htmlFor="status">Status: </label>
                        <select name="status"
                                value={updateAdopt.status}
                                onChange={(e) => 
                                    setUpdateAdopt({...updateAdopt, status: e.target.value})
                                }>
                            {status.map((type) => (
                                <option key={type} value={type}>
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="formBtn-container">
                    <button className="formCancelBtn" type="button">Cancel</button>
                    <button className="formBtnSubmit" type="submit">Submit</button>
                </div>
            </form>
        </div>
    </>
  )
}