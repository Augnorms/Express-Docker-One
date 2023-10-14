const express = require("express");
const db = require("../dbconnect");
const router = express.Router();

router.delete("/:id", (req, res)=>{
  const id = req.params.id;

   db.query("DELETE FROM users WHERE user_id = ? LIMIT 1",[id], (err, rows)=>{
      if(err){
        res.status(400).json({
            code:400,
            status:false,
            message:"Failed to delete user with id "+id+" "+err
        });
      }else{
        res.status(200).json({
            code:200,
            status:true,
            message:"Successfully deleted user with id "+id
        });
      }
   })

});


module.exports = router;