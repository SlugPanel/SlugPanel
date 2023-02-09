const mongoose = require('mongoose')

const divisionSchema = new mongoose.Schema({
    div_name: {type: String, default: "Divisionless"},
    div_id: {type: Number, default: 0},
    join_date: {type: Date, default: new Date()},
    position: {type: String, default: "None"},
    is_staff: {type: Boolean, default: false}
})

const courtSchema = new mongoose.Schema({
    court_cases: {type: Array, default: []},
    guilty_verdicts: {type: Number, default: 0},
    not_guilty_verdicts: {type: Number, default: 0},
    lesser_punishments: {type: Number, default: 0},
    pending_charges: {type: Array, default: []},
    convicted_charges: {type: Array, default: []},
    dropped_charges: {type: Array, default: []}
})

const administrationSchema = new mongoose.Schema({
    panel_join: {type: Date, default: new Date()},
    admin_punishments: {type: Number, default: 0},
    punishment_types: {type: Array, default: []},
    blacklisted: {type: Boolean, default: false},
    dishonorable_discharges: {type: Number, default: 0},
    flags: Array,
})


const userSchema = new mongoose.Schema({
    username: String,
    password: {type: String, default: null},
    discord_id: Number,
    rank: String,
    regKey: String,
    is_registered: {type: Boolean, default: false},
    awards: {type: Array, default: ["National Defense Service Medal"]},
    isAdmin: {type: Boolean, default: false},
    admin_level: {type: Number, default: 0},
    authentication_level: {type: String, default: null},
    division: {_id: false, type: divisionSchema, default: () => ({})},
    court_data: {_id: false, type: courtSchema, default: () => ({})},
    administration_data: {_id: false, type: administrationSchema, default: () => ({})},
}, {collection: "userData"})

module.exports = userSchema