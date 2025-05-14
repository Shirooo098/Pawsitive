import axios from "axios";
import { API_BASE_URL } from "./auth";

export const fetchAdoptPets = async() => {
    try {
        const res = await axios.get(`${API_BASE_URL}`, {
            withCredentials: true
        });

        return res.data;
    } catch (error) {
        console.error("Error fetching image:", error);
    }
}

export const fetchAdoptPetDetails = async(id) => {
    try {
        const res = await axios.get(`${API_BASE_URL}/adopt/${id}`, {
            withCredentials: true
        });

        return res.data;
    } catch (error) {
        console.error("Error fetching pet details:", error);

    }
}

export const sendAdoption = async(adoptionData, id) => {
    try {
        const res = await axios.post(`${API_BASE_URL}/adopt`, adoptionData, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        })

        alert("Adoption Request Sent Successfully!");
        return res.data;
    } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
    }
}

export const fetchAdoptionHistory = async() => { 
    try {
        const res = await axios.get(`${API_BASE_URL}/adoptionHistory`, {
            withCredentials: true
        });

        return res.data;
    } catch (error) {
        console.error("Error fetching adoption history:", error);
    }
}