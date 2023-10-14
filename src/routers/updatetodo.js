const express = require("express");
const db = require("../dbconnect");
const router = express.Router();

router.put("/", (req, res)=>{
  const id = req.body.id;
  const username = req.body.user_name;
  const gender = req.body.gender;
  const designation = req.body.designation;

  db.query("UPDATE users SET username = ?, gender = ?, designation = ? WHERE user_id = ? LIMIT 1", 
  [username, gender, designation, id], (err, result)=>{
     
    if(err){
        res.status(404).json({
            code:404,
            status:false,
            message:"Failed to update user id "+id+" "+err
        })
    }else{

        if (result.changedRows === 1) {
            // Fetch the updated data from the database
            db.query("SELECT * FROM users WHERE user_id = ?", [id], (error, rows) => {
                if (rows.length === 1) {
                    res.status(200).json({
                        code: 200,
                        status: true,
                        user: rows[0]
                    });
                } else {
                    res.status(404).json({
                        code: 404,
                        status: false,
                        message: "Failed to retrieve the updated data "+error
                    });
                }
            });
        } else {
            res.status(404).json({
                code: 404,
                status: false,
                message: "No rows were updated"
            });
        }
      
    }
  })
});

module.exports = router;