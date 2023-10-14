const mysql = require("mysql2");

const db = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"Microvelli@027",
    database:"todoDatabase"
});

db.connect((err)=>{
  if(err){
    console.log("database not connected" + err.errno);
  }else{
    console.log('Connected to the database as id ' + db.threadId);
  }
});

module.exports = db;