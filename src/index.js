var express = require('express');
var app = express();
const createTodoRoute = require("./routers/createtodo"); 
const getTodoRoute = require("./routers/gettodo");
const fetTodoByIdRoute = require("./routers/fetchtodobyid");
const upateTodoRouter = require("./routers/updatetodo");
const deletTodoRouter = require("./routers/deletetodo");
const createUserLoginRouter = require("./routers/creatuserlogins");


app.use(express.json());

//create a todo route
app.use("/createtodo", createTodoRoute);
app.use("/gettodo", getTodoRoute);
app.use("/fetchtodobyid", fetTodoByIdRoute);
app.use("/updatetodo", upateTodoRouter);
app.use("/deletetodo", deletTodoRouter);
app.use("/createloginuser", createUserLoginRouter);


app.listen("3001",()=>{
  console.log("running on server 3001");
})