var studentCtrl = require("../Controler/studentControl");
const router = require("express").Router()

// Read a student record by ID
router.post('/students', studentCtrl,async (req, res) => {
    const { name, surname,gender } = req.body;
    const result = await db.query('INSERT INTO students (name, surname,gender) VALUES ($1, $2,$3) RETURNING id', [name, surname,gender]);
    const id = result.rows[0].id;
    res.json({ id, name, email });
  });



