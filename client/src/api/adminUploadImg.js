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