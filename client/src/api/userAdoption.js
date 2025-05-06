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

export const sendAdoption = async(adoptionData, id) => {
    try {
        const res = await axios.post(`http://localhost:3000/adopt`, adoptionData, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        })

        console.log("Adoption data sent:", res.data);
        alert("Adoption Request Sent Successfully!");
        
        return res.data;
    } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
    }
}

