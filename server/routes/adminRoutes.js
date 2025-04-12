import express from 'express';

const router = express.Router();

const isAdmin = (req, res, next) => {
    if(req.isAuthenticated() && req.user.type === 'admin'){
        return next();
    }
    return res.status(403).json({ error: 'Access Denied!' });
}

router.get("/manageAppointment", isAdmin, async (req, res) => {
    try {
        const result = await req.db.query("SELECT * FROM appointments ORDER BY appointment_date DESC")
        res.json(result.rows)
    } catch (error) {
        console.error("Error Fetching Appointments:", err);
        res.status(500).json({ error: 'Failed to fetch appointments '});
    }
});

router.delete("/deleteAppointment/:id", isAdmin, async (req, res) => {
    const {id} = req.params;


    console.log(`Appointment ID ${id}`)
    try {
        const result = await req.db.query("DELETE FROM appointments WHERE appointmentid = $1 RETURNING *",
            [id]
        )
        if (result.rowCount === 0){
        return res.status(404).json({ error : "Appointment not found"})
        }

        res.json({ message: 'Appointment deleted successfully', appointment: result.rows[0]})
    } catch (error) {
        console.error("Error Deleting Appointment:", error);
        res.status(500).json({ error: 'Failed to delete appointment'});
    }
});

export default router;

