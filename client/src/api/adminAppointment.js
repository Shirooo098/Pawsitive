import axios from 'axios';
import { API_BASE_URL } from './auth';


export const fetchAppointments = async() => {
    try {
        const response = await axios.get(`${API_BASE_URL}/admin/manageAppointments`, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        })  

        return response.data;
    } catch (error) {
        console.error("Error fetching appointments:", error);
    }
} 

export const deleteAppointment = async(id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/admin/deleteAppointment/${id}`, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        });
        
        alert('Appointment Successfully Deleted');
        console.log("Appointment deleted successfully", response.data);
    } catch (error) {
        console.error("Error deleting Appointment:", id);
    }
}

export const fetchUserAppointment = async(id) =>{
    try {
        const response = await axios.get(`${API_BASE_URL}/admin/updateAppointment/${id}`, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        });
        
        console.log("Appointment fetch successfully", response.data);
        return response.data
    } catch (error) {
        console.error("Error fetching appointment:", id);
    }
}

export const updateUserAppointment = async(id, status) => {
    try {
        const response = await axios.patch(`${API_BASE_URL}/admin/updateAppointment/${id}`,
            { status },
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            }
        );

        console.log("Appointment updated successfully", response.data);
        return response.data;
    } catch (error) {
        console.error("Error updating appointment:", id);
    }
}