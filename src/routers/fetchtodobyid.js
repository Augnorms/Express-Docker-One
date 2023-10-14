const express = require("express")
const router = express.Router();
const db = require("../dbconnect");


router.get("/:id", (req, res)=>{
    const id = req.params.id;
  db.query("SELECT * FROM users WHERE user_id = ?",[id], (err, result)=>{
     if(err){
        res.status(404).json({
            code:404,
            status:false,
            message:`could not get the user with id ${id} ${err}`,
        })
     }else{
        if(result.length === 1){
            res.status(201).json({
                code:201,
                status:true,
                message:`Sucees able to find the user with id ${id}`,
                user:result[0]
            })
        }else{
            res.status(404).json({
                code:404,
                status:false,
                message:`unable to get the user with id ${id} ${err}`,
            })
        }
     }
  })
});

module.exports = router;