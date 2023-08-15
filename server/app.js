const express = require("express")
const morgan = require('morgan')
const cors = require("cors")

class Server{
    constructor(){
        this.app = express()
        this.middleware()
        this.routes()
    }
    middleware(){
        this.app.use(express.json())
        this.app.use(morgan("dev"))
        this.app.use(cors())
    }
    routes(){
        this.app.use("/ej1", require("../routes/ej1"))
        this.app.use("/ej3", require("../routes/ej3"))
        this.app.use("/ej5/users", require("../routes/ej5Users"))
        this.app.use("/ej5/recipes", require("../routes/ej5Recipes"))
    }
    listen(){
        this.app.listen(process.env.PORT, () => {
            console.log("Servidor en línea", process.env.PORT)
        })
    }
}

module.exports = Server