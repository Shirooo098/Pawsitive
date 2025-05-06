import axios from 'axios';

export const PROD_API_URL = process.env.PUBLIC_API_URL

export const registerValidation = async (formData) => {
    try {
        const { confirmPassword, ...filteredFormData } = formData;
        console.log("Sending data:", filteredFormData);

        const response = await axios.post(`${PROD_API_URL}/register`, filteredFormData, {
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

        const response = await axios.post(`${PROD_API_URL}/login`, loginData,{
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
        const response = await axios.get(`${PROD_API_URL}/auth/check`, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        });
        
        return response.data;
    } catch (error) {
        console.error("Auth check failed:", error);

        return false;
    }
}