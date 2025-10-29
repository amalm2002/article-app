import express from "express"
import connectDB from "./config/mongo.config"
import 'dotenv/config'
import cors from 'cors'
import router from "./routes/routes"


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))
connectDB()
app.use(express.json()); 
app.use('/api', router);


app.listen(process.env.PORT, () => {
    console.log(`server start on http://localhost:${process.env.PORT}`)
})
