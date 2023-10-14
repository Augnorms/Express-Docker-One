var express = require("express");
var router = express.Router();
var db = require("../dbconnect");


//create a todo
router.post("/", (req, res)=>{
  const user_name = req.body.user_name;
  const gender = req.body.gender;
  const designation = req.body.designation;

  db.query(
    'INSERT INTO users (username, gender, designation) VALUES (?, ?, ?)',
    [user_name, gender, designation], 
    (err, result)=>{
     if(err){
      res.status(500).json({ status: false, message: "Failed to create data", error: err, code: 500 });
     }else{
      const returnedUser = result.insertId;
      db.query('SELECT * FROM users WHERE user_id = ?', [returnedUser],(err, rows)=>{
         if(err){
          res.status(500).json(
             { status: false, 
              message: "Failed to fetch the inserted data", 
              error: err, code: 500 
            });
         }else{
          if (rows.length === 1) {
            const responseData = {
                status: true,
                message: "Success!!",
                code: 201,
                data: {
                    user: rows[0] 
                }
            };
            res.status(201).json(responseData);
        } else {
            res.status(500).json({ status: false, message: "Failed to retrieve the inserted data", code: 500 });
        }
         }
      })
     }
  });
});

module.exports = router;