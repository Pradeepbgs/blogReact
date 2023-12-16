import express from 'express'
import  appRoute from './routes/app.js'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import {connectDB} from './db/connect.js'
import session from 'express-session'
// import {checkForAuthentication, loggedUser} from './middlewares/auth.middle.js'
import cookieParser from 'cookie-parser'
dotenv.config()

connectDB()
const app = express()
const port = process.env.PORT || 3000
app.use(express.json())
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
// app.use(session({
//     key: 'userId',
//     secret: 'chai-code',
//     resave:false,
//     saveUninitialized: false,
//     cookie:{
//         expires: 60 * 60 * 24,
//         secure:true
//     }
// }))
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
app.use('/',appRoute)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})