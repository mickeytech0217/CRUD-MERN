const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const app = express();
require("./Model/User");
const users = require("./routes/api/users");
const todos=require("./routes/api/todos")
const keys = require("./config/keys");
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB Config
const mongoURI = process.env.MONGO_URI;

//Connect to MongoDB

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Failed to connect to MongoDB");
    console.log(error);
  });


  
app.use(
  session({
    secret: keys.secretOrKey,
  })
);

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//passpprt config
require("./config/passport")(passport);

//use Routes
app.use("/api/users", users);
app.use("/api/todos",todos)

const port = process.env.PORT || 5500;

app.listen(port, () => console.log(`server Running on Port ${port}`));
