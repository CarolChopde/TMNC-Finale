const express = require("express");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
const cors = require("cors") //CORS- cross origin resource sharing

const uri = 'mongodb+srv://carolsachin:uwBtsg4CMXMKkDhY@portal.3a2kvqy.mongodb.net/?retryWrites=true&w=majority&appName=Portal';

const client = new MongoClient(uri,{useNewUrlParser: true, useUnifiedTopology:true})

const app = express();
app.use(cors());
const port = 3000;

// Middleware to parse the JSON body
app.use(bodyParser.json());

//STUDENT LOGIN
    app.post("/studlogin", async (req, res) => {
        console.log("success");
        const {username, password} = req.body;
    
            try {
                const database = client.db('portal');
                const students = database.collection('students');
                        
                await students.insertOne( //into the mongodb atlas db
                {
                username : username,
                password : password
                })
    
                console.log(students);} 
                finally {
                    console.log('finally');
                    }
        return res.status(200).json({messg: "success"})
        });
    
// STUDENT REGISTRATION
app.post("/submitstud", async (req, res) => {
    console.log("success");
    const {name, email, DOB, branch, number} = req.body;

        try {
            const database = client.db('portal');
            const students = database.collection('students');
                    
            await students.insertOne(
            {
            name: name,
            email:email,
            DOB: DOB,
            branch:branch,
            number:number
            })

            console.log(students);} 
            finally {
                console.log('finally');
                }
                
    return res.status(200).json({messg: "success"})
    });

//TEACHER LOGIN
    app.post("/teachlogin", async (req, res) => {
        console.log("success");
        const {name, email,} = req.body;
    
            try {
                const database = client.db('portal');
                const teachers = database.collection('teachers');
                        
                await teachers.insertOne(
                {
                name: name,
                password:password,
                })
                console.log(teachers);} 
            finally {
  
                console.log('finally');
                }
    return res.status(200).json({messg: "success"})
    });
            

app.listen(port, () => {console.log(`Connected to ${port}`)});
