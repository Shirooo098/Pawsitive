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