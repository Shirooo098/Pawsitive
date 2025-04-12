import axios from 'axios';

export const fetchAppointments = async() => {
    try {
        const response = await axios.get("http://localhost:3000/admin/manageAppointment", {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        })  

        return response.data;
    } catch (error) {
        console.error("Error fetching appointments:", error);
    }
} 

export const deleteAppointment = async(id) => {
    try {
        const response = await axios.delete(`http://localhost:3000/admin/deleteAppointment/${id}`, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        });
        
        alert('Appointment Successfully Deleted');
        console.log("Appoitment deleted successfully", response.data);
    } catch (error) {
        console.error("Error deleting Appointment:", id);
    }
}