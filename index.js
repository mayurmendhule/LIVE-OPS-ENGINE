const express = require("express");
const mongoose = require("mongoose");
const bodyparse =require("body-parser");

const SERVER_PORT = process.env.PORT || 8080
const userRoutes = require("./Routes/user")
const offerRoutes = require("./Routes/offer")
const app = express();

mongoose.connect("mongodb://localhost:27017/user").then(() =>{
    console.log("Connected to db")
}).catch(()=>{
    console.log("failed to connected to db")
})
app.use(bodyparse.json());
app.listen(SERVER_PORT, ()=>{
    console.log("Server started at " + SERVER_PORT)
})

app.use("/user", userRoutes);
app.use("/offer", offerRoutes)