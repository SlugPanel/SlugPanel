const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const userSchema = require('../../SlugAPI/Schemas/SlugSchemas')
const divisionSchema = require('../src/SlugSchemas/DivisionSchemas/DivisionSchema')
const subDivisionSchema = require('../src/SlugSchemas/DivisionSchemas/SubDivisionSchema')
const teamSchema = require('../src/SlugSchemas/DivisionSchemas/TeamSchema')
const divisionMemberSchema = require('../src/SlugSchemas/DivisionSchemas/DivisionMemberSchema')
let CryptoJS = require('crypto-js')

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors({
    origin: "https://slug-panel.onrender.com",
    headersL : ["Content-Type"],
    credentials: true,
}))
mongoose.set("debug")

const usar_db = mongoose.createConnection("mongodb://usarAdmin:poopusar@slug-db:27017/usarAdmin?authSource=admin");


const User = usar_db.model('User', userSchema)
const Division = usar_db.model('Division', divisionSchema)
const SubDivision = usar_db.model('SubDivision', subDivisionSchema)
const Team = usar_db.model('Team', teamSchema)
const DivisionMember = usar_db.model('Division_Member', divisionMemberSchema)


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

app.post('/login', bodyParser.json(), async (req, res, next) => {
    const user = req.body.username
    let pw = req.body.password
    pw = CryptoJS.SHA256(pw)
    let exists = await User.findOne({username: user})
    if (exists) {
        if (pw.toString() === exists['password']) {
            res.send({
                token: 'test123'
            })
        } else {
            res.send({
                error: 'passwordNotFound'
            })
        }
    } else {
        res.send({
            error: 'userNotFound'
        })
    }
});

app.post('/generate', bodyParser.json(), async function (req, res, next) {
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

app.post('/register', bodyParser.json(), async function (req, res, next) {
    let key = req.body.regKey
    let pw = CryptoJS.SHA256(req.body.password).toString()
    let decryptedKey = decryptUserRegistrationKey(key).split('/')
    let exists = await User.find({regKey: key}, function(err, docs) {
        if (err) {
            console.log(err)
        } else {
            console.log('Result: ', docs)
            console.log(pw)
        }
    }).clone()
    if (!exists) {
        res.send({user: null})
    } else {
        res.send(JSON.stringify(exists))
    }

    await User.findOneAndUpdate({regKey: key}, { is_registered: true, password: pw, authentication_level: decryptedKey[decryptedKey.length - 1]})
})

app.post('/createDivision', bodyParser.json(),  async function (req, res, next) {
    let div_name = req.body.division_name
    let div_id = req.body.division_id
    let exists = await Division.findOne({division_name: div_name}, function (err, docs) {
        if (err) {
            console.log(err)
        } else {
            console.log(docs)
        }
    }).clone()
    let idexists = await Division.findOne({division_id: div_id}, function (err, docs) {
        if (err) {
            console.log(err)
        } else {
            console.log(docs)
        }
    }).clone()
    if (!exists || !idexists) {
        const newDivision = new Division({
            division_name: div_name,
            division_id: div_id
        })
        newDivision.save()
            .then(() => console.log('Division ' + div_name + ' has been added to the db'))
        res.send(JSON.stringify(newDivision))
    } else {
        res.send({errorcode: 420})
    }
})

app.post('/createSubDivision/:divid', bodyParser.json(), async function (req, res, next) {
    const division = req.params['divid']
    const sub_name = req.body.subdivision_name
    const sub_id = req.body.subdivision_id
    let exists = await Division.findOne({division_id: division}, function (err, docs) {
        if (err) {
            console.log(err)
        } else {
            console.log(docs)
        }
    }).clone()
    if (exists) {
        let subdivid_exists = await Division.findOne({
            division_id: division,
            subdivisions: {
                $elemMatch: {subdivision_id: sub_id}
            }
        })
        let subdiv_exists = await Division.findOne({
            division_id: division,
            subdivisions: {
                $elemMatch: {subdivision_name: sub_name}
            }
        })
        if (!subdivid_exists || !subdiv_exists) {
            const subDiv = new SubDivision({
                subdivision_name: sub_name,
                subdivision_id: sub_id,
            })
            await Division.findOneAndUpdate({division_id: division}, { $push: {subdivisions: subDiv}})
            console.log('subdivision ' + sub_name + ' added to: ' + exists.division_name)
            res.send(JSON.stringify(subDiv))
        } else {
            res.send({division:'exists'})
        }
    }
})

app.listen(PORT, () => console.log('API is running on ' + PORT));