
const mongoose = require("mongoose")
const express = require("express")
const { request } = require("express")


const app = express()

app.use(express.json())
require('dotenv').config()

const{
    DB_USERNAME,
    DB_PASSWORD,
    DB_HOST,
    DB_NAME,
} = process.env

const koderEsquema = new mongoose.Schema({

    name: {
        type: String,
        minlength: 3,
        maxlength: 20,
        required : true
    },
    modulo:{
        type: String
    },
    edad: {
        type: Number,
        min: 18,
        max: 150,
    },
    generacion:{
        type: String,
        required: true,
    },
    sexo: {
        type: String,
        enum:["F","M" ,"Otro"]
    }
})

const Koder = mongoose.model("Koders", koderEsquema)

const url = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}${DB_NAME}`

app.post("/koders", async (request, response)=>{

    const {body} = request
    
    try{
        
        const koder = await Koder.create(body)
        response.status(201)
        response.json({
            success: true,
            data:{
                koder
            }
        })
    }catch(err){
        console.log(err, "error")
        response.status(400)
        response.json({
            success: false,
            message:err.message
        })
    }
})

app.get("/koders/:id", async (request, response)=>{

    const {params} = request
    
    try{
        if(Koder.id !== params.id){

            const koder = await Koder.findById(params.id)
            response.status(201)
            response.json({
                success: true,
                data:{
                    koder
                }
            })
        } else{

            response.json("Koder no encontrado")
        }
    }catch(err){
        console.log(err, "Koder no encontrado")
        response.status(404)
        response.json({
            success: false,
            message:err.message
        })
    }
})

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
