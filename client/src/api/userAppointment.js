import { API_BASE_URL } from './auth';

export const sendAppointment = async (appointmentData) => {
    try {
        console.log("Sending appointment data:", appointmentData)

        const response = await fetch(`${API_BASE_URL}/appointment`, {
            method: 'POST',
            headers: { 
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify(appointmentData)
        });

        if (!response.ok) {
            throw new Error('Failed to send appointment');
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error:", error.message);
    }
}

export const fetchAppointment = async() => {
    try {
        const response = await fetch(`${API_BASE_URL}/appointment`, {
            method: 'GET',
            headers: { 
                "Content-Type": "application/json"
            },
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Failed to fetch appointment');
        }

        const data = await response.json();
        console.log("Appointment fetched:", data);
        return data;
    } catch (error) {
        console.error('Error fetching appointment', error);
    }
}