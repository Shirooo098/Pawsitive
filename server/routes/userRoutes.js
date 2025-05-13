import express from 'express';

const router = express.Router();

// Database connection check middleware
const checkDbConnection = async (req, res, next) => {
    if (!req.db) {
        return res.status(500).json({ 
            error: "Database connection not available",
            message: "Please try again in a few moments"
        });
    }
    try {
        const client = await req.db.connect();
        await client.query('SELECT 1');
        client.release();
        next();
    } catch (err) {
        console.error("Database check failed:", err);
        return res.status(503).json({ 
            error: "Database temporarily unavailable",
            message: "Please try again in a few moments"
        });
    }
};

// Apply database check middleware to all routes
router.use(checkDbConnection);

router.post("/appointment", async(req, res) => {
    try {

        verifyUser();

        const { 
            scheduleDate, 
            fullName, 
            email, 
            contact, 
            address, 
            petType, 
            petName, 
            petAge, 
            service
        } = req.body;

        const newAppointment = await req.db.query(
            `INSERT INTO appointments(appointment_date, fullName, email, contact, address, pet_type, pet_name, pet_age, service, user_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
            [
                scheduleDate, 
                fullName, 
                email, 
                contact, 
                address, 
                petType, 
                petName, 
                petAge, 
                service,
                req.user.userid
            ]
        );
        
        console.log("Success Sending Appointment");
        res.json(newAppointment.rows[0]);
    } catch (error) {
        console.error("Error Sending Appointment: ", error);
        res.status(500).json({error: "Failed to save appointment"});
    }
});

router.get('/history', async(req, res) => {
    try {
        const userID = req.user.userid;
        console.log("User data:", userID);
        const result = await req.db.query("SELECT * FROM appointments WHERE user_id = $1 ORDER BY appointment_date ASC",
            [userID]
        );

        if(result.rows.length === 0){
            return res.status(404).json({ message: "Appointments no found"});
        }

        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).json({ error: "Failed to fetch appointments" });
    }

});



router.get('/', async(req, res) => {
    try {
        const result = await req.db.query(`
            SELECT p.id, p.petName, p.petImage,
            p.petage, p.petsex, p.petbreed  
            FROM adopt_pets p
            LEFT JOIN adoption a ON p.id = a.petid 
            WHERE a.petid IS NULL`)
        res.json(result.rows);
        console.log("fetched pets:", result.rows);
    } catch (error) {
        console.error("Error fetching cats:", error);
        res.status(500).json({ error: "Failed to fetch pets" });
    }
})

router.get('/adopt/:id', async(req, res) => {
    const { id } = req.params;
    console.log("Pet ID:", id);

    try {
        const result = await req.db.query("SELECT * FROM adopt_pets WHERE id = $1", [id]);

        if(result.rows.length === 0) {
            return res.status(404).json({ message: "Pet not found" });
        }

        res.json(result.rows[0]);
        console.log("Fetched Pet:", result.rows);
    } catch (error) {
        console.error("Error fetching pet:", error);
        res.status(500).json({ error: "Failed to fetch pet" });
    }
})

router.post('/adopt', async(req, res) => {
    const {
        petID,
        scheduleDate,
        fullName,
        email,
        contact,
        address,
        reason,
    } = req.body

    const userID = req.user.userid;

    try {
        const newAdoption = await req.db.query(
            `INSERT INTO adoption(scheduledate, fullname, email, contact, address, reason, petID, userID)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [
                scheduleDate,
                fullName,
                email,
                contact,
                address,
                reason,
                petID,
                userID
            ]
        );

        res.json(newAdoption.rows[0]);
    } catch (error) {
        console.error("Error Sending Adoption:", error);
        res.status(500).json({ error: "Failed to send adoption" });
    }

});

router.get("/adoptionHistory", async(req, res) => {
    try {
        const userID = req.user.userid; 
        console.log("User data:", userID);

        const result = await req.db.query(
            `SELECT a.scheduledate, a.fullname,
            a.email, a.contact, a.address, a.reason,
            a.status, p.petname, p.petimage, p.petsex,
            p.petbreed
            FROM adoption a
            JOIN adopt_pets p on a.petid = p.id
            WHERE userID = $1`,
            [userID]
        );

        if(result.rows.length === 0){
            return res.status(404).json({ message: "Adoption history not found" });
        }

        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching adoption history:", error);
        res.status(500).json({ error: "Failed to fetch adoption history" });
    }
})

const verifyUser = () => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ 
            error: "Unauthorized",
            message: "Please login to book."
        });
    }

    if (!req.user || !req.user.userid) {
        console.error("Invalid user object:", req.user);
        return res.status(500).json({
            error: "Authentication error",
            message: "User information is incomplete"
        });
    }
}

export default router;