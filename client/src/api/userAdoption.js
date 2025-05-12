import { API_BASE_URL } from "./auth";

export const fetchAdoptPets = async() => {
    try {
        const response = await fetch(`${API_BASE_URL}`, {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Failed to fetch pets');
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching pets:", error);
    }
}

export const fetchAdoptPetDetails = async(id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/adopt/${id}`, {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Failed to fetch pet details');
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching pet details:", error);
    }
}

export const sendAdoption = async(adoptionData, id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/adopt`, {
            method: 'POST',
            headers: { 
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify(adoptionData)
        });

        if (!response.ok) {
            throw new Error('Failed to send adoption request');
        }

        const data = await response.json();
        console.log("Adoption data sent:", data);
        alert("Adoption Request Sent Successfully!");
        return data;
    } catch (error) {
        console.error("Error:", error.message);
    }
}

export const fetchAdoptionHistory = async() => { 
    try {
        const response = await fetch(`${API_BASE_URL}/adoptionHistory`, {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Failed to fetch adoption history');
        }

        const data = await response.json();
        console.log("Adoption History:", data);
        return data;
    } catch (error) {
        console.error("Error fetching adoption history:", error);
    }
}