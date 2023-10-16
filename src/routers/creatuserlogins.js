const express = require("express");
const router = express.Router();
const db = require("../dbconnect");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        db.query(
            'INSERT INTO loginusers (username, password) VALUES (?, ?)',
            [username, hashedPassword],
            (err, users) => {
                if (err) {
                    res.status(401).json({
                        status: false,
                        code: 401,
                        message: "Failed to create user" + " " + err,
                    });
                } else {
                    res.status(200).json({
                        status: true,
                        code: 200,
                        message: "Success user created",
                    });
                }
            }
        );
    } catch (error) {
        res.status(500).json({
            status: false,
            code: 500,
            message: "Error: " + error.message,
        });
    }
});



module.exports = router;
