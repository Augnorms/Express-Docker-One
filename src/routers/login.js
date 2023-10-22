const express = require("express");
const db = require("../dbconnect");
const router = express.Router();
const bycrypt = require("bcrypt");
const jwtToken = require("jsonwebtoken");


router.get("/", (req, res)=>{

    const {username, password} = req.body;


    db.query("SELECT username, password FROM loginusers WHERE username = ?", 
    [username], 
    (err, resData)=>{

        if(err){
            res.status(401).json({
                status:false,
                code:401,
                message:"Failed to login username or password incorrect"
            });
        }else if(resData.length === 0){

            res.status(401).json({
                status:false,
                code:401,
                message:"Failed to login username or password incorrect"
            });
        }else{
            const user = resData[0];
            const isPassword = bycrypt.compare(password, user.password);
 
            if(isPassword){

                const token = jwtToken.sign({ username: user.username }, "validate12345", {
                    expiresIn: "1h", 
                });

                db.query("SELECT user_id, designation from users",(error, response)=>{
                    if(err){
                        res.status(400).json({
                            message:"failed to fetch"
                        });
                    }else{
                        res.status(200).json({
                            status:true,
                            code:200,
                            message:"Login successful",
                            token:token,
                            otherRes:response
                           });
                    }
                })
          
            }else{
                res.status(401).json({
                    status:false,
                    code:401,
                    message:" login Failed username or password incorrect"
                });
            }
        }

    })

});


module.exports = router;
