import express from 'express'
import  appRoute from './routes/app.js'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import {connectDB} from './db/connect.js'
dotenv.config()

connectDB()
const app = express()
const port = process.env.PORT || 3000
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', appRoute)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})