const express = require('express')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const path = require('path')
const mongoose = require('mongoose')
const Users = require('./schemas/userSchema')
require('dotenv').config()
const cors = require('cors');
const app = express()
const port = 8181

mongoose.connect(process.env.MONGODB_URI, () => {
    console.log('Connected to database')
}, err => console.log(err))

app.use(express.json())
app.use(cors())

app.get('/api', (req, res) => {
    res.send('test')
})
app.use(express.static(path.join(__dirname, "../frontend/build")))

app.get('*', (_, res) => {
    res.sendFile(
        path.join(__dirname, "./frontend/build/index.html"),
        err => { if(err) res.status(500).send(err) }
    )
})

app.post('/api/signin', async (req,res) => {
    try {
        const user = await Users.findOne({ email: req.body.email})
        if(user){
            let checkForHash = bcrypt.compare(req.body.password, user.password)
            // if user exist send user data
            if(checkForHash){
                res.json({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    entries: user.entries,
                })
            }else{
                res.status(400).json({error: "Error loggin in"})
            }
        }else{
            res.status(400).json({error: "Error loggin in"})
        }
    } catch (error) {
        console.log(error)
    }
})

app.post('/api/register', async (req, res) => {
    const { email, name, password } = req.body
    try {
        const checkForExistingUsers = await Users.findOne({email: email})
        if(checkForExistingUsers){
            res.json({error: 'User with that email already exists'})
        }else {
            const hash = await bcrypt.hash(password, saltRounds)
            const newUser = await Users.create({
                id: Math.floor(Math.random() * 99999),
                email: email,
                password: hash,
                name: name,
                entries: 0
            })

            res.json({
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                entries: newUser.entries,
            })
        }
    } catch (error) {
        console.log(error)
    }
})

app.put('/api/image', async (req, res) => {
    let { id, entries } = req.body
    try {
        await Users.findOneAndUpdate({id: id}, { entries: entries++})
            return res.json(entries)
    } catch (error) {
        console.log(error)
    }
})

// app.get('/profile/:id', (req, res) => {
//     const { id } = req.params
//     res.json(data.users.filter(user => user.id === id))
//     // let found = false
//     // data.users.forEach(user => {
//     //     if (user.id === id) {
//     //         found = true
//     //         return res.json(user)
//     //     }
//     // })
//     // if(!found) {
//     //     return res.status(404).json("No such user")
//     // }
// })

app.listen(port, () => {
    console.log("Server is now live")
})