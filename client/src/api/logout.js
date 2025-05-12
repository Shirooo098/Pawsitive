import axios from "axios";
import { API_BASE_URL } from "./auth";

export const logout = async (setIsLoggedIn) => {
    try {
        const res = await axios.post(`${API_BASE_URL}/logout`, {
            withCredentials: true,
        })

        console.log(res.data.message);
        setIsLoggedIn(false);
    }catch(err){
        console.error("Logout Failed:", err)
    }
}