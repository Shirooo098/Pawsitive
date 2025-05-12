import axios from 'axios';

export const API_BASE_URL = "https://pawsitive-production.up.railway.app"

export const registerValidation = async (formData) => {
    try {
        const { confirmPassword, ...filteredFormData } = formData;
        console.log("Sending data:", filteredFormData);

        const response = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            headers: { 
                "Content-Type": "application/json"
            },
            body: JSON.stringify(filteredFormData)
        });

        const data = await response.json();
        console.log(data);
        return data;

    } catch (error) {
        console.error("Error:", error.message);
        return { error: error.message }
    }
}

export const loginValidation = async (loginData, setIsLoggedIn, setUser) => {
    try {
        console.log("Login Data: ", loginData);

        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: { 
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify(loginData)
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Login failed');
        }

        console.log(data.user);
        setIsLoggedIn(true);
        setUser(data.user)
        return data;
    } catch (error) {
        console.error("Error:", error.message);
        return { error: error.message || "Unexpected error occurred." }
    }
}

export const checkAuth = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/check`, {
            method: 'GET',
            headers: { 
                "Content-Type": "application/json"
            },
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Auth check failed');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Auth check failed:", error);
        return false;
    }
}