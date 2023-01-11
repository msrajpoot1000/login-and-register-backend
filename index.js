// import express from 'express';
// // add add in json file => type : "module"
// import cors from "cors";
// import mongoose from "mongoose";
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// this is compulsory to write on top but but first declate app=express();
app.use(cors({
    // origin: ["http://localhost:3000","http://mern-task-app5.onrendere.com"]
}));
 
app.use(express.json());


mongoose.set('strictQuery', false);
const DB='mongodb+srv://manish:manish@newcluster.ffdd5qp.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(DB, {}).then(() => {
    console.log("Connection established");
}).catch((e) => {
    console.log(" No connection ! connection is not established ",e);
});


// Routes
app.post("/login", (req, res) => { 
    const { email, password } = req.body;
    User.findOne({ email: email, password: password },(error,user)=> {
        if (user) {
            if (password === user.password) {
                res.send({ message: "Welcome to the world of Manish Singh" ,user: user });
            }
            else {
                res.send({message:"{password not match"})
            }
        }
        else {
           res.send({message:"user not registered"})
        }
    })

    // res.send("<h1>My api login</h1>");
})
app.post("/register", (req, res) => { 
    const { name, email, password } = req.body;
    User.findOne({ email: email }, (err, user) => {
        if (user) {
            res.send({message:"User already registered"})
        } else {
             const user = new User({
        name,email,password
    })
    user.save(err => {
        if (err) {
            res.send(err);
        }
        else {
            res.send({
                message: "Successfully registered, please login now"
            })

        }
    })
        }
    })
   
})
// app.get("/login", (req, res) => {
//     // res.send("<h1>My api login</h1>");
//     console.log(req.body);
// })



app.get("/users-record", (req, res) => {
    User.find( {}, (error, user) => {
        if (user) {
            res.send(user); 
        }
      
    })
})


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const User = new mongoose.model("User", userSchema);


app.listen(port, () => { 
    console.log(`BE stared aa port ${port}`)
})














