const express = require('express')
const app = express()

const mongoose = require('mongoose')
app.use(express.json())

const cors = require("cors")
app.use(cors())

const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')
const JWT_SECRET = 'dsafsdf[/[;;[/;sd[f;s[df;sdfsdfsadfwerwereweg23435432213123cxvsdf]sd'

const mongoUrl = "mongodb://127.0.0.1:27017/register_login_1"

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Mongo DB Connected')
    })
    .catch((e) => { console.log(e) })


const UserInfo = require('./server/models/userDetails')

app.post("/register", async(req, res)=>{
    const { fname, lname, email, mobile, password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);

    try{
        const oldUser = UserInfo.findOne({ email })

        if(oldUser){
            res.send({ error: "User Exists" })
        }

        await UserInfo.create({ fname, lname, email, mobile, password: encryptedPassword })

        res.send({ status:"ok" })
    } catch (error) {
        res.send({ status:"error" })
    }
})


app.post("/login-user", async (req, res) => {
    const { email, password } = req.body;

    const user = await UserInfo.findOne({ email })
    if(!user){
        return res.json({ error: "User Not Found" })
    }

    if(await bcrypt.compare(password, user.password)){
        const token = jwt.sign({email: user.email}, JWT_SECRET, {expiresIn: 10, });

        if(res.status(201)){
            return res.json({ status: "ok", data: token })
        } else {
            return res.json({ error: "error" })
        }
    }

    res.json({ status: "error", error: "Invalid Password" })
})


app.post("/userData", async (req, res) => {
    const { token } = req.body;

    try{
        const user = jwt.verify(token, JWT_SECRET, (err, res) => {
            // console.log(err, "error")
            // console.log(res, "result")
            if(err){
                return "token expired"
            }
            return res
        })
        
        console.log(user)

        if(user === "token expired"){
            return res.send({ status:"error", data:"token expired" })
        }


        const userEmail = user.email
        
        UserInfo.findOne({ email: userEmail })
        .then((data) => {
            res.send({ status: "ok", data: data })
        })
        .catch((error) => {
            res.send({ status: "error", data: error})
        })
    } catch(error){

    }
})



app.listen(5000, () => {
    console.log("Server Started...")
})