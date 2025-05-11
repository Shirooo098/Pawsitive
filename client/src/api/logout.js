import axios from "axios";
import { PROD_API_URL } from "./auth";

export const logout = async (setIsLoggedIn) => {
    try {
        const res = await axios.get(`${PROD_API_URL}/logout`, {
            withCredentials: true,
        })

        console.log(res.data.message);
        setIsLoggedIn(false);
    }catch(err){
        console.error("Logout Failed:", err)
    }
}