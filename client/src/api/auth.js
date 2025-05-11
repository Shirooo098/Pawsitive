import axios from 'axios';

export const API_BASE_URL = process.env.API_URL

export const registerValidation = async (formData) => {
    try {
        const { confirmPassword, ...filteredFormData } = formData;
        console.log("Sending data:", filteredFormData);

        const response = await axios.post(`${API_BASE_URL}/register`, filteredFormData, {
            headers: { "Content-Type": "application/json" }
        });

        console.log(response.data);
        return response.data;

    } catch (error) {
        console.error("Error:", error.response?.data?.message || error.message);
        return { error: error.response?.data?.message}
    }
}

export const loginValidation = async (loginData, setIsLoggedIn, setUser) => {
    try {
        console.log("Login Data: ", loginData);

        const response = await axios.post(`${API_BASE_URL}/login`, loginData,{
            headers: { "Content-Type" : "application/json" },
            withCredentials: true
        });

        console.log(response.data.user);
        setIsLoggedIn(true);
        setUser(response.data.user)
        return response.data;
    } catch (error) {
        console.error("Error:", error.response.data.message || error.message);
        return { error: error.response.data.error || "Unexpected error occurred."}
    }
}

export const checkAuth = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/auth/check`, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        });
        
        console.log("API_BASE_URL:", API_BASE_URL);
        return response.data;
    } catch (error) {
        console.error("Auth check failed:", error);

        return false;
    }
}