import axios from 'axios';
import { API_BASE_URL } from './auth';

export const addAdmin = async (adminData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/admin/addAdmin`, adminData, {
            headers: { "Content-Type" : "application/json" },
            withCredentials: true,
        })

        console.log("Admin Data:", response.data)
        alert("Successfully added Admin0", response.data);
        return response.data
    } catch (error) {
        console.error("Error adding Admin", error)
    }
}

export const fetchAdmins = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/admin/addAdmin`, {
            headers: { "Content-Type" : "application/json" },
            withCredentials: true,
        })

        return response.data
    } catch (error) {
        console.error("Error fetching Admins", error)
    }
}

export const deleteAdmin = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/admin/deleteAdmin/${id}`, {
            headers: { "Content-Type" : "application/json" },
            withCredentials: true,
        })

        return response.data
    } catch (error) {
        console.error("Error deleting Admin", error)
    }
}