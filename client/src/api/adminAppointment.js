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
        console.log("Appointment deleted successfully", response.data);
    } catch (error) {
        console.error("Error deleting Appointment:", id);
    }
}

export const fetchUserAppointment = async(id) =>{
    try {
        const response = await axios.get(`http://localhost:3000/admin/updateAppointment/${id}`, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        });
        
        console.log("Appointment fetch successfully", response.data);
        return response.data
    } catch (error) {
        console.error("Error fetching appointment:", id);
    }
}

export const updateUserAppointment = async(id, status) => {
    try {
        const response = await axios.patch(`http://localhost:3000/admin/updateAppointment/${id}`,
            { status },
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            }
        );

        console.log("Appointment updated successfully", response.data);
        return response.data;
    } catch (error) {
        console.error("Error updating appointment:", id);
    }
}