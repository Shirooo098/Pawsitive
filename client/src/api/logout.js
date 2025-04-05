import axios from "axios";

export const logout = async (setIsLoggedIn) => {
    try {
        const res = await axios.get("http://localhost:3000/logout", {
            withCredentials: true,
        })

        console.log(res.data.message);
        setIsLoggedIn(false);
    }catch(err){
        console.error("Logout Failed:", err)
    }
}