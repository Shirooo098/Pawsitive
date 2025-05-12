import { API_BASE_URL } from './auth';

export const fetchAppointments = async() => {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/manageAppointments`, {
            method: 'GET',
            headers: { 
                "Content-Type": "application/json"
            },
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Failed to fetch appointments');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching appointments:", error);
    }
} 

export const deleteAppointment = async(id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/deleteAppointment/${id}`, {
            method: 'DELETE',
            headers: { 
                "Content-Type": "application/json"
            },
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Failed to delete appointment');
        }

        const data = await response.json();
        alert('Appointment Successfully Deleted');
        console.log("Appointment deleted successfully", data);
        return data;
    } catch (error) {
        console.error("Error deleting Appointment:", id);
    }
}

export const fetchUserAppointment = async(id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/updateAppointment/${id}`, {
            method: 'GET',
            headers: { 
                "Content-Type": "application/json"
            },
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Failed to fetch appointment');
        }

        const data = await response.json();
        console.log("Appointment fetch successfully", data);
        return data;
    } catch (error) {
        console.error("Error fetching appointment:", id);
    }
}

export const updateUserAppointment = async(id, status) => {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/updateAppointment/${id}`, {
            method: 'PATCH',
            headers: { 
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({ status })
        });

        if (!response.ok) {
            throw new Error('Failed to update appointment');
        }

        const data = await response.json();
        console.log("Appointment updated successfully", data);
        return data;
    } catch (error) {
        console.error("Error updating appointment:", id);
    }
}