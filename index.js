
const mongoose = require("mongoose")
const express = require("express")
const app = express()
require('dotenv').config()

const{
    DB_USERNAME,
    DB_PASSWORD,
    DB_HOST,
    DB_NAME,
} = process.env
const url = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}${DB_NAME}`




mongoose.connect(url)

.then(()=>{

    console.log("conectado en la base de datos")
    app.listen("8080", ()=>{

        console.log("servidor Escuchando")
    })
})
.catch((err)=>{
    console.log(err, "error")
})
