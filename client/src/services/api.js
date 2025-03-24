import axios from 'axios';

export const registerValidation = async (formData) => {
    try {
        const { confirmPassword, ...filteredFormData } = formData;
        console.log("Sending data:", filteredFormData);

        const response = await axios.post("http://localhost:3000/register", filteredFormData, {
            headers: { "Content-Type": "application/json" }
        });

        console.log(response.data);
        return response.data;

    } catch (error) {
        console.error("Error:", error.response?.data?.message || error.message);
        return { error: error.response?.data?.message}
    }
}

export const loginValidation = async (loginData) => {
    try {
        console.log("Login Data: ", loginData);

        const response = await axios.post("http://localhost:3000/login", loginData,{
            headers: { "Content-Type" : "application/json" }
        });

        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error:", error.response.data.message || error.message);
        return { error: error.response.data.error || "Unexpected error occurred."}
    }
}