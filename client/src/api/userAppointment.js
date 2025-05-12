import axios from 'axios';
import { API_BASE_URL } from './auth';

export const sendAppointment = async (appointmentData) => {
    try {
        console.log("Sending appointment data:", appointmentData)

        const response = await axios.post(`${API_BASE_URL}/appointment`, appointmentData, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        });

        console.log(response.data);
        return response.data
    } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
        throw error;
    }
}

export const fetchAppointment = async() => {
    try {
        const response = await axios.get(`${API_BASE_URL}/history`, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        });

        console.log("Appointments fetched:", response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching appointments:', error);
        if (error.response?.status === 404) {
            return []; // Return empty array if no appointments found
        }
        throw error;
    }
}