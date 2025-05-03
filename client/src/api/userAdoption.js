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

export const fetchAdoptPetDetails = async(id) => {
    try {
        const res = await axios.get(`http://localhost:3000/adopt/${id}`, {
            withCredentials: true
        });
        console.log(res.data);
        return res.data;
        
    } catch (error) {
        console.error("Error fetching pet details:", error);

    }
}

