import axios from 'axios';

export const uploadImage = async (formData) => {
    try {
        const response = await axios.post("http://localhost:3000/admin/addPet", formData, {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true
        });
        
        console.log("Image uploaded successfully", response.data);
        alert("Successfully Added Data...");
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

export const fetchAdoptDetails = async(id) => {
    try {
        const response = await axios.get(`http://localhost:3000/admin/updateAdoption/${id}`,{
            headers: { "Content-Type": "application/jspon" },
            withCredentials: true
        })

        console.log("Adoption Data Fetch Succesfully", response.data);
        return response.data;
    } catch (error) {
        console.error("Error Fetching Adoption ID:", error)
    }
}

export const updateAdoptionRequest = async(id, status) => {
    try {
        const response = await axios.patch(`http://localhost:3000/admin/updateAdoption/${id}`, 
            {status}, 
            {
                headers: {"Content-Type": "application/json"},
                withCredentials: true 
            }
        );

        alert("Adoption updated successfully", response.data);
        console.log("Adoption updated successfully", response.data);
        return response.data;
    } catch (error) {
        console.error("Error updating appointment:", id);
    }
}