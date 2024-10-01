// import dependencies
const express = require('express');
const app = express();
const mysql = require('mysql2');
const dotenv = require('dotenv');


// listen to the server

const PORT=3500;
app.listen(PORT, ()=>{
    console.log(`server is running on  http://localhost :${PORT}`)
})
// configure the packages installed => make them connect to each other
dotenv.config();

// create a connection

const db= mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME

})

// test the connection
db.connect((err)=>{
    // if connection is successful
    if(err){
        return console.log('error login to the database',err)
    }
    console.log('successfully connected to mysql', db.threadId)
})

// retrieve all patients

app.get('',(req,res)=>{
    const getPatients ="SELECT patient_id,first_name,last_name,date_of_birth FROM patients"
    db.query(getPatients,(error,data)=>{
        // if error

        if(error){
            return res.status(400).send('failed to get patients',error)
        }
        res.status(200).send(data)

    })
})

// retrieve all providers

app.get('',(req,res)=>{
    const getProviders ="SELECT first_name,last_name,provider_specialty FROM providers";
    db.query(getProviders,(error,data)=>{

        if(error){
            return res.status(400).send('failed to get providers',error)
        }
        res.status(200).send(data)

    })
}) 

// retrieve patients by first name

app.get('',(req,res)=>{
    const getFirstName ="SELECT first_name FROM patients";
    db.query(getFirstName,(error,data)=>{

        if(error){
            return res.status(400).send('failed to get patients first names',error)
        }
        res.status(200).send(data)

    })
}) 

// retrieve providers by their specialty

app.get('',(req,res)=>{
    const getSpecialty ="SELECT provider_specialty FROM providers";
    db.query(getSpecialty,(error,data)=>{

        if(error){
            return res.status(400).send('failed to get provider specialty',error)
        }
        res.status(200).send(data)

    })
}) 
