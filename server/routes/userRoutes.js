import express from 'express';

const router = express.Router();


router.post("/appointment", async(req, res) => {
    try {
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
        const userID = req.user.userID;
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

router.get('/profile', async(req, res) => {
    try {
        const userID = req.user.userID;
        console.log("User data:", userID);
        const result = await req.db.query("SELECT * FROM users WHERE userid = $1",
            [userID]
        )

        if(result.rows.length === 0){
            return res.status(404).json({ message: "User not found"});
        }

        res.json(result.rows);

    } catch (error) {
        console.error("Error Fetching User Data:", error);
        res.status(500).json({ error: "Failed to fetch user data"});
    }
});

router.get('/', async(req, res) => {
    try {
        const result = await req.db.query(`
            SELECT p.id, p.petName, p.petImage,
            p.petage, p.petsex, p.petbreed  
            FROM adopt_pets p
            LEFT JOIN adoption a ON p.id = a.petid 
            AND a.status = 'pending'
            AND a.status = 'approved'
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

}) 

export default router;