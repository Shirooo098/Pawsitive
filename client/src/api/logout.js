import axios from "axios";
import { API_BASE_URL } from "./auth";

export const logout = async (setIsLoggedIn) => {
    try {
        const res = await axios.post(`${API_BASE_URL}/logout`, {}, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (res.data.message === "Logout successful") {
            setIsLoggedIn(false);
            // Clear any stored user data
            localStorage.removeItem('user');
            // Force a page reload to clear any cached state
            window.location.reload();
        } else {
            console.error("Unexpected logout response:", res.data);
        }
    } catch (err) {
        console.error("Logout Failed:", err);
        throw err;
    }
}