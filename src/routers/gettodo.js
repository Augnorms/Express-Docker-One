const express = require("express")
const router = express.Router();
const db = require("../dbconnect");

router.get("/", (req, res)=>{

    db.query("SELECT * FROM users", (err, result)=>{
        if(err){
            res.status(404).json({
                status:false,
                message:"Failed to fetch data",
                code:404
            }, err)
        }else{
            res.status(201).json({
                status:true,
                message:"Success able to fetch data",
                code:201,
                result
            })
        }
    })

});


module.exports = router;