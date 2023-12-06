import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/connect.js'
dotenv.config()

connectDB()
const app = express()
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})