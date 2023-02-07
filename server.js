const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion, Collection, Int32} = require('mongodb')
const {json} = require("express");
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const userSchema = require('./src/SlugSchemas/SlugSchemas')
let CryptoJS = require('crypto-js')

const user_db = mongoose.createConnection("mongodb+srv://usar:i0dZ59pvJ5aFM190@slug-panel.b8jgn4x.mongodb.net/UsarData?retryWrites=true&w=majority")


const User = user_db.model('User', userSchema)


function generateUserRegistrationKey(username, discord_id, rank, authentication_level) {
    let key = username + '/' + discord_id.toString() + '/' + rank + '/' + authentication_level
    const ciphertext = CryptoJS.AES.encrypt(key, 'poopusar').toString()
    return ciphertext
}

function decryptUserRegistrationKey(key) {
    const bytes = CryptoJS.AES.decrypt(key, 'poopusar')
    const originalText = bytes.toString(CryptoJS.enc.Utf8)
    return originalText
}

app.use(cors());

app.use('/login', (req, res) => {
    res.send({
        token: 'test123',
    });
});

app.post('/generate', bodyParser.json(), async function (req, res) {
    let username = req.body.username
    let discord_id = req.body.discord_id
    let rank = req.body.rank
    let authentication_level = req.body.authentication_level
    let exists = await User.exists({discord_id: discord_id})
    let regKey = generateUserRegistrationKey(username, discord_id, rank, authentication_level)
    const newUser = User({
        username: username,
        discord_id: discord_id,
        rank: rank,
        regKey: regKey,
        authentication_level: authentication_level,
    })
    if (!exists) {
        newUser.save()
            .then(r => console.log("User " + username + " added to db"))
        res.send({regKey: regKey})
    }
})

app.use('/orbat', (req, res) => {
    res.send({
        'Headquarters': [
             {
                name: 'John Doe',
                rank: 'Sergeant',
                role: 'Rifleman',
                status: 'Active',
            },
            {
                name: 'Jane Doe',
                rank: 'Sergeant',
                role: 'Rifleman',
                status: 'Active',
            }
            ],
        '1st Infantry Division': [
            {
                name: 'John Doe',
                rank: 'Sergeant',
                role: 'Rifleman',
                status: 'Active',
            },
            {
                name: 'Jane Doe',
                rank: 'Sergeant',
                role: 'Rifleman',
                status: 'Active',
            }
        ]
    })
})

app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));