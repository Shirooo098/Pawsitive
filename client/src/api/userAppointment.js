import axios from 'axios';

export const sendAppointment = async (appointmentData) => {
    try {
        console.log("Sending appointment data:", appointmentData)

        const response = await axios.post("http://localhost:3000/appointment", appointmentData, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        });

        console.log(response.data);
        return response.data
    } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
    }
}

export const fetchAppointment = async() => {
    try {
        
        const response = await axios.get("http://localhost:3000/history", {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        })

        console.log("Appointment fetched:", response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching appointment', error);
    }
}