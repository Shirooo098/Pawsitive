import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchUserAppointment, updateUserAppointment } from '../../api/adminAppointment';

export default function UpdateAppointment() {
    const navigate = useNavigate();
    const [appointment, setAppointment] = useState(null);
    const [updateAppointment, setUpdateAppointment] = useState({
        status: ''
    });
    const { id } = useParams();
    const status = ['pending','approved', 'declined']
    console.log("ID from URL:", id);

    useEffect(() => {
        const getAppointment = async () => {
            const data = await fetchUserAppointment(id);
            setAppointment(data);
            setUpdateAppointment( { status: data.status })
        };

        getAppointment();
    }, [id])

    if (!appointment) {
        return <div>Loading appointment details...</div>;
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        try {
            const res = await updateUserAppointment(id, updateAppointment.status);
            
            navigate("/admin/manageAppointment")
            if(res.error){
                setErrors({ server: res.error });
            }
        } catch (error) {
            console.log({ server: "Unexpected error occured." })
        }
    }

    return (
        <>
                <div className="appointment-container">
                <form onSubmit={handleSubmit}>
                    <div className="formHeader">
                        <h1>Update an Appointment</h1>
                    </div>


                    <div className="rowSchedule">
                        <label htmlFor="date">Schedule</label>
                        <input type="text"
                            defaultValue={new Date(appointment.appointment_date).toISOString().slice(0, 10)}
                            readOnly
                        />
                    </div>

                    <div className="schedule-information">
                        <div className="colUser">
                            <h2>Owner Information</h2>
                            <div className="rowFullName">
                                <label htmlFor="fullName">Name</label>
                                <input type="text"
                                    defaultValue={appointment.fullname}
                                    readOnly/>
                            </div>

                            <div className="rowEmailApp">
                                <label htmlFor="email">Email</label>
                                <input type="email"
                                    defaultValue={appointment.email}
                                    readOnly/>
                            </div>

                            <div className="rowContact">
                                <label htmlFor="contact">Contact</label>
                                <input type="text"
                                    defaultValue={appointment.contact}
                                    readOnly/>
                            </div>

                            <div className="rowAddress">
                                <label htmlFor="address">Address</label>
                                <input type="text"
                                    defaultValue={appointment.address}
                                    readOnly/>
                            </div>
                        </div>

                        <div className="colPet">
                            <h2>Pet Information</h2>

                            <div className="rowPetName">
                                <label htmlFor="petName">Pet Name</label>
                                <input type="text"
                                defaultValue={appointment.pet_name}
                                readOnly/>
                            </div>

                            <div className="rowPetAge">
                                <label htmlFor="PetAge">Pet Age</label>
                                <input type="text"
                                defaultValue={appointment.pet_age}
                                readOnly />
                            </div>

                            <div className="rowPetType">
                                <label htmlFor="petType">Pet Type</label>
                                <input type="text" 
                                defaultValue={appointment.pet_type}
                                readOnly />
                            </div>

                            <div className="rowService">
                                <label htmlFor="service">Service</label>
                                <input type="text" 
                                defaultValue={appointment.service}
                                readOnly/>
                            </div>
                            
                            
                        </div>

                    </div>

                    <div className="appointmentStatus-container">
                        <div className="rowStatus">
                                <label htmlFor="status">Status: </label>
                                <select name="status"
                                        value={updateAppointment.status}
                                        onChange={(e) => 
                                            setUpdateAppointment({...updateAppointment, status: e.target.value})
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
