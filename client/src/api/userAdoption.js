import axios from "axios";

export const fetchAdoptPets = async() => {
    try {
        const res = await axios.get("http://localhost:3000/", {
            withCredentials: true
        });

        console.log(res.data);
        return res.data;
    } catch (error) {
        console.error("Error fetching image:", error);
    }
}