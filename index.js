
const mongoose = require("mongoose")
const express = require("express")
const app = express()


const url = "mongodb+srv://Rodolfo:hijomayor13@kodemia.ke4b4wx.mongodb.net/kodemia"
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
