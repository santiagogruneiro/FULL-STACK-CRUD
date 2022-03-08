const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const app = express()

//middleware
app.use(cors())
app.use(express.json())
dotenv.config()

const port = process.env.PORT || 8080
require("./lib/mongoose")
require("./routes/index")(app)



app.listen(port,()=>console.log("Server running on port " +port))