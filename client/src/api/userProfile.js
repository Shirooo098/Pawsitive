import axios from "axios";

export const getUserProfile = async() => {
     try {
        const response = await axios.get("http://localhost:3000/profile", {
            headers: { "Content-Type" : "application/json"},
            withCredentianls: true
        });

        console.log("User Data:", response.data);
        return response.data;
     } catch (error) {
        console.error("Error Fetching User Data:", error);
     }
}