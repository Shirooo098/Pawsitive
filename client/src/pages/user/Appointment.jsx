import {isLogin} from "../../api/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Appointment.css'
import { sendAppointment } from "../../api/appointment";

function Appointment(){

    const navigate = useNavigate();
    const [minDate, setMinDate] = useState('');
    const [appointmentData, setAppointmentData] = useState({
        scheduleDate: '',
        fullName: '',
        email: '',
        contact: '',
        address: '',
        petType: '',
        petName: '',
        petAge: '',
        service: ''
    }) 

    const petTypes = ['Dog', 'Cat', 'Rabbit']
    const serviceTypes = ['Groom', 'Vaccine']

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await sendAppointment(appointmentData);

            navigate("/appointment");
            if(res.error){
                setErrors({ server: res.error });
            }
        } catch (error) {
            setErrors({ server: "Unexpected error occures."})
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target;

        setAppointmentData((prevState) => ({
            ...prevState,
            [name]: name === "scheduleDate" ? value : value
        }))
    }

    const handleCancel = () => {
        setAppointmentData({
            scheduleDate: '',
            fullName: '',
            email: '',
            contact: '',
            address: '',
            petType: '',
            petName: '',
            petAge: '',
            service: ''
        })
    }

    useEffect(() => {
        isLogin(navigate);
    }, [navigate])

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        setMinDate(today);
    }, []);

    return(
        <>
            <h1>Appointment Page</h1>
            <div className="appointment-container">
                <form onSubmit={handleSubmit}>
                    <div className="formHeader">
                        <h1>Set an Appointment</h1>
                    </div>

                    <div className="rowSchedule">
                        <label htmlFor="date">Schedule</label>
                        <input type="date"
                            name="scheduleDate"
                            onChange={handleChange}
                            min={minDate}
                            value={appointmentData.scheduleDate || ""}
                        />
                    </div>

                    <div className="schedule-information">
                        <div className="colUser">
                            <h2>Owner Information</h2>
                            <div className="rowFullName">
                                <label htmlFor="fullName">Name</label>
                                <input type="text"
                                    name="fullName"
                                    onChange={handleChange}
                                    value={appointmentData.fullName}
                                />
                            </div>

                            <div className="rowEmailApp">
                                <label htmlFor="email">Email</label>
                                <input type="email"
                                    name="email"
                                    onChange={handleChange}
                                    value={appointmentData.email}
                                />
                            </div>

                            <div className="rowContact">
                                <label htmlFor="contact">Contact</label>
                                <input type="text"
                                    name="contact"
                                    onChange={handleChange}
                                    value={appointmentData.contact}
                                />
                            </div>

                            <div className="rowAddress">
                                <label htmlFor="address">Address</label>
                                <input type="text"
                                    name="address"
                                    onChange={handleChange}
                                    value={appointmentData.address}
                                />
                            </div>
                        </div>

                        <div className="colPet">
                            <h2>Pet Information</h2>

                            <div className="rowPetName">
                                <label htmlFor="petName">Pet Name</label>
                                <input type="text"
                                name="petName"
                                onChange={handleChange}
                                value={appointmentData.petName}/>
                            </div>

                            <div className="rowPetAge">
                                <label htmlFor="PetAge">Pet Age</label>
                                <input type="number"
                                name="petAge"
                                onChange={handleChange}
                                value={appointmentData.petAge} />
                            </div>

                            <div className="rowPetType">
                                <label htmlFor="petType">Pet Type</label>
                                <select name="petType"
                                    onChange={handleChange}
                                    value={appointmentData.petType}>
                                    <option value="">Select a Pet Type</option>
                                    {petTypes.map((type) => (
                                        <option key={type} value={type}>
                                            {type.charAt(0).toUpperCase() + type.slice(1)}
                                        </option>
                                    ))}
                                    </select>
                            </div>

                            <div className="rowService">
                                <label htmlFor="service">Service</label>
                                <select name="service"
                                    onChange={handleChange}
                                    value={appointmentData.service}>
                                    <option value="">Select a Service Type</option>
                                    {serviceTypes.map((type) => (
                                        <option key={type} value={type}>
                                            {type.charAt(0).toUpperCase() + type.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            
                        </div>

                    </div>
                    <div className="appointmentBtn-container">
                        <button className="appointmentCancelBtn" type="button" onClick={handleCancel}>Cancel</button>
                        <button className="appointmentBtnSubmit" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Appointment;