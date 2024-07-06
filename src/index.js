var express = require("express");
var app = express();

const createTodoRoute = require("./routers/createtodo");
const getTodoRoute = require("./routers/gettodo");
const fetTodoByIdRoute = require("./routers/fetchtodobyid");
const upateTodoRouter = require("./routers/updatetodo");
const deletTodoRouter = require("./routers/deletetodo");
const createUserLoginRouter = require("./routers/creatuserlogins");
const loginRoute = require("./routers/login");

app.use(express.json());

//create a todo route
app.get("/helloworld", (req, res) => {
  res.send("i have access to your endpoint so beware of fraudsters connect with us");
  // console.log("i have access to your endpoint so");
});
app.use("/createtodo", createTodoRoute);
app.use("/gettodo", getTodoRoute);
app.use("/fetchtodobyid", fetTodoByIdRoute);
app.use("/updatetodo", upateTodoRouter);
app.use("/deletetodo", deletTodoRouter);
app.use("/createloginuser", createUserLoginRouter);
app.use("/login", loginRoute);

app.listen(4000, () => {
  console.log("running on server 4000");
});
