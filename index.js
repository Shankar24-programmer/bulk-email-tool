import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors'
import dotenv from "dotenv";

dotenv.config();
const app=express()
app.use(cors());
app.use(express.json())
const port=process.env.port || 4001;
var sender = nodemailer.createTransport({
    service: "gmail",   
    auth: {   
    user: process.env.email,   
    pass: process.env.password,   
    },    
    });
    

app.post("/sendprocess",async function(req, res){   
const {to,subject,content}=req.body;   
    var composemail = {  
    from: process.env.email,  
    to: to,
   subject: subject,
    text: content,  
    };
    
    sender.sendMail(composemail, function (error, info) { 
    if (error) {
    console.log(error); 
    res.status(404).send("server busy");
    } else {  
    console.log("success " + info.response);  
    res.send("sucess");
    }   
    });


})

app.listen(port, () => {

console.log(`Example app listening on port `)

})