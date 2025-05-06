import axios from 'axios';

export const uploadImage = async (formData) => {
    try {
        const response = await axios.post("http://localhost:3000/admin/addPet", formData, {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true
        });
        
        console.log("Image uploaded successfully", response.data);
        return response.data;
    } catch (error) {
        console.error("Error uploading image:", error);
    } 
}

export const fetchAdoptPetRequest = async () => {
    try {
        const response = await axios.get("http://localhost:3000/admin/manageAdoption", {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        })

        return response.data;
    } catch (error) {
        console.error("Error Fetching Adoption Requests:", error);
    }
}

export const deleteAdoption = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:3000/admin/deleteAdoption/${id}`, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        });

        alert('Appointment Successfully Deleted', response.data);
    } catch (error) {
        console.error("Error Deleting Adoption:", id);
    }
}
