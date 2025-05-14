import express from 'express';
import multer from 'multer';
import bcrypt from "bcrypt";

const saltRounds = 10;
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

router.get('/manageAdoption', isAdmin, async(req, res) => { 
    try {
        const result = await req.db.query(`
            SELECT a.*, p.petname, p.petImage
            FROM adoption a
            JOIN adopt_pets p ON a.petid = p.id
            ORDER BY scheduledate`);
        res.json(result.rows);
    } catch (error) {
        console.error("Error Fetching Adoptions:", error);
        res.status(500).json({ error: "Failed to fetch adoptions"});
    }
});

router.delete("/deleteAdoption/:id", isAdmin, async (req, res) => {
    const {id} = req.params;

    console.log(`Adoption ID ${id}`)
    try {
        const result = await req.db.query("DELETE FROM adoption WHERE id = $1 RETURNING *",
            [id]
        )
        if (result.rowCount === 0){
        return res.status(404).json({ error : "Adoption not found"})
        }

        res.json({ message: 'Adoption deleted successfully', adoption: result.rows[0]})
    } catch (error) {
        console.error("Error Deleting Adoption:", error);
        res.status(500).json({ error: 'Failed to delete Adoption'});
    }
});

router.get('/updateAdoption/:id', isAdmin, async(req, res) => {
    const {id} = req.params;
    try {
        console.log(`Adoption ID: ${id}`);

        const result = await req.db.query(`
            SELECT a.*,
            p.petname, p.petimage, p.petage,
            p.petsex, p.petbreed 
            FROM adoption a
            JOIN adopt_pets p on a.petid = p.id  
            WHERE a.id = $1 `,
            [id]
        )


        if(result.rowCount === 0) {
            return res.status(404).json({ error : "Adoption not found"});
        }

        console.log("Adoption Details:", result.rows[0])
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error fetching adoption:", error);
        res.status(500).json({ error: 'Failed to fetch adoption'});
    }
});

router.patch('/updateAdoption/:id', isAdmin, async(req, res) => {
    const {id} = req.params;
    const {status} = req.body;
    

    console.log("Received request to update adoption:", {id, status});
    try {
        const result = await req.db.query("UPDATE adoption SET status = $1 WHERE id = $2 RETURNING *",
            [status, id]
        );

        if(result.rowCount === 0){
            return res.status(404).json({ error: "Adoption Request not found"});
        }

        res.json({ message: "Adoption Request updated successfully",
            adoption: result.rows[0]
        })
        
    } catch (error) {
        console.error("Error updating Adoption:", error);
        res.status(500).json({error: "Failed to update adoption request."});
    }
})


router.post('/addAdmin', isAdmin, async(req, res) => {
    try {
        const { 
            firstName,
            lastName,
            email, 
            password, 
            type
        } = req.body;

        const checkUser = await req.db.query("SELECT * FROM users WHERE email = $1", [
            email
        ])

        if(checkUser.rows.length > 0){
            res.json({message: "Email already exists. Try logging in."})
        }else{
            await passwordHashing(res, firstName, lastName, email, password, type, saltRounds)
        }


        console.log("Admin added Successfully:", result.rows[0]);
        res.json({ message : "Admin added successfully", admin: result.rows[0]});

    } catch (error) {
        console.error("Error Adding Admin", error);
        res.status(500).json({error: "Failed to add admin."});
    }
})

const passwordHashing = (
    res, 
    firstName, 
    lastName, 
    email,
    password,
    type,
    saltRounds
) => {
    bcrypt.hash(password, saltRounds, async (err, hash) => {
        if(err){
            console.error("Error Hashing password:", err);
        }else{
            console.log("Hashed Password:", hash);
            const newUser = await db.query(
                "INSERT INTO users (firstname, lastname, email, password, type) VALUES($1, $2, $3, $4, $5)",
                [firstName, lastName, email, hash, type]
            );
            res.json(newUser.rows[0]);
        }
});
}

export default router;