const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion, Collection, Int32} = require('mongodb')
const {json} = require("express");
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://usar:poopusar@slug-panel.b8jgn4x.mongodb.net/UsarData?retryWrites=true&w=majority")

const userSchema = new mongoose.Schema({
    username: String,
    discord_id: Number,
    rank: String,
    regKey: String,
    awards: Array,
    isAdmin: Boolean,
    admin_level: Number,
    authentication_level: String,
    division: [{
        div_name: String,
        div_id: Number,
        join_date: Date,
        position: String,
        is_staff: Boolean,
    }],
    court_data: [{
        court_cases: Array,
        guilty_verdicts: Number,
        not_guilty_verdicts: Number,
        lesser_punishments: Number,
    }],
    administration_data: [{
        panel_join: Date,
        admin_punishments: Number,
        blacklisted: Boolean,
        flags: Array,
    }]
}, {collection: "userData"})

const User = mongoose.model('User', userSchema)


function generateUserRegistrationKey(username, discord_id, rank, authentication_level) {
    return "test123"
}

app.use(cors());

app.use('/login', (req, res) => {
    res.send({
        token: 'test123',
    });
});

app.post('/generate', bodyParser.json(), async function (req, res) {
    let username = req.body.username
    let discord_id = req.body.discord_id.toInt()
    let rank = req.body.rank
    let authentication_level = req.body.authentication_level
    let exists = await User.exists({discord_id: discord_id})
    let regKey = generateUserRegistrationKey(username, discord_id, rank, authentication_level)
    const newUser = User({
        username: username,
        discord_id: discord_id,
        rank: rank,
        regKey: regKey,
        awards: ["National Defense Service Medal"],
        authentication_level: authentication_level,
        division: [{
            div_name: "divisionless",
            div_id: 0,
            join_date: new Date(),
            position: "None",
            is_staff: false
        }],
        court_data: [{
            court_cases: [],
            guilty_verdicts: 0,
            not_guilty_verdicts: 0,
            lesser_punishments: 0
        }],
        administration_data: [{
            panel_join: new Date(),
            admin_punishments: 0,
            blacklisted: false,
            flags: []
        }]

    })
    if (!exists) {
        newUser.save()
            .then(r => console.log("User added to db"))
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