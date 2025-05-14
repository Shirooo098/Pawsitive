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