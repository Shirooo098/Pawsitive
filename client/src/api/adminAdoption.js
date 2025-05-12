import { API_BASE_URL } from './auth';

export const uploadImage = async (formData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/addPet`, {
            method: 'POST',
            credentials: 'include',
            body: formData // FormData is already properly formatted, no need for Content-Type
        });

        if (!response.ok) {
            throw new Error('Failed to upload image');
        }

        const data = await response.json();
        console.log("Image uploaded successfully", data);
        alert("Successfully Added Data...");
        return data;
    } catch (error) {
        console.error("Error uploading image:", error);
    } 
}

export const fetchAdoptPetRequest = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/manageAdoption`, {
            method: 'GET',
            headers: { 
                "Content-Type": "application/json"
            },
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Failed to fetch adoption requests');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error Fetching Adoption Requests:", error);
    }
}

export const deleteAdoption = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/deleteAdoption/${id}`, {
            method: 'DELETE',
            headers: { 
                "Content-Type": "application/json"
            },
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Failed to delete adoption');
        }

        const data = await response.json();
        alert('Appointment Successfully Deleted');
        return data;
    } catch (error) {
        console.error("Error Deleting Adoption:", error);
    }
}

export const fetchAdoptDetails = async(id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/updateAdoption/${id}`, {
            method: 'GET',
            headers: { 
                "Content-Type": "application/json"
            },
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Failed to fetch adoption details');
        }

        const data = await response.json();
        console.log("Adoption Data Fetch Successfully", data);
        return data;
    } catch (error) {
        console.error("Error Fetching Adoption ID:", error);
    }
}

export const updateAdoptionRequest = async(id, status) => {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/updateAdoption/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({ status })
        });

        if (!response.ok) {
            throw new Error('Failed to update adoption');
        }

        const data = await response.json();
        alert("Adoption updated successfully");
        console.log("Adoption updated successfully", data);
        return data;
    } catch (error) {
        console.error("Error updating adoption:", error);
    }
}