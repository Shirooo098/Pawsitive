import express from 'express';
import multer from 'multer';

const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix)

    }
});
const upload = multer({ storage: storage})

const isAdmin = (req, res, next) => {
    if(req.isAuthenticated() && req.user.type === 'admin'){
        return next();
    }
    return res.status(403).json({ error: 'Access Denied!' });
}

router.get("/manageAppointment", isAdmin, async (req, res) => {
    try {
        const result = await req.db.query("SELECT * FROM appointments ORDER BY appointment_date")
        res.json(result.rows)
    } catch (error) {
        console.error("Error Fetching Appointments:", error);
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

router.get('/updateAppointment/:id', isAdmin, async(req, res) => {
    const {id} = req.params;
    try {
        console.log(`Appointment ID: ${id}`);

        const result = await req.db.query("SELECT * FROM appointments WHERE appointmentid = $1",
            [id]
        )

        if(result.rowCount === 0) {
            return res.status(404).json({ error : "Appointment not found"});
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error fetching appointment:", error);
        res.status(500).json({ error: 'Failed to fetch appointment'});
    }
});

router.patch('/updateAppointment/:id', isAdmin, async(req, res) => {
    const {id} = req.params;
    const {status} = req.body;
    try {
        const result = await req.db.query("UPDATE appointments SET status = $1 WHERE appointmentid = $2 RETURNING *",
            [status, id]
        );

        if(result.rowCount === 0){
            return res.status(404).json({ error: "Appointment not found"});
        }

        res.json({
            message: "Appointment updated successfully",
            appointment: result.rows[0]
        })
    } catch (error) {
        console.error("Error updating appointment:", error);
        res.status(500).json({ error: "Failed to update appointment"})
    }
});

router.post('/addPet', isAdmin,
    upload.single('petImage'),
    async(req, res) => {

    const { petName, petAge, petSex, petBreed } = req.body;
    const petImage = req.file;
    const petImgPath = petImage ? `/uploads/${petImage.filename}` : null;

    console.log("Request Body:", req.body);
    console.log("Image:", petImgPath);

    try {
        
        const result = await req.db.query(
            `INSERT INTO adopt_pets
            (petName, petAge, petSex, petBreed, petImage)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`,
            [petName, petAge, petSex, petBreed, petImgPath]
        )

        console.log('Pet Added Successfully:', result.rows[0]);
        res.json({ message: "Pet added successfully", pet: result.rows[0]});

    } catch (error) {
        console.error("Error adding pet:", error);
        res.status(500).json({ error: "Failed to add pet"});
    }
 });

export default router;