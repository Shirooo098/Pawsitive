import { API_BASE_URL } from "./auth";

export const logout = async (setIsLoggedIn) => {
    try {
        const response = await fetch(`${API_BASE_URL}/logout`, {
            method: 'GET',
            credentials: 'include'
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Logout failed');
        }

        console.log(data.message);
        setIsLoggedIn(false);
    } catch(err) {
        console.error("Logout Failed:", err);
    }
}