const mongoose = require('mongoose')

const divisionMemberSchema = new mongoose.Schema({
    username: String,
    rank: String,
    division_join_date: {type: Date, default: new Date()},
    is_active: {type: Boolean, default: true},
    position: String,
    timezone: String,
    discord_id: String,
    patrols_num: {type: Number, default: 0},
}, {_id: false, collection: 'divisionData'})

module.exports = divisionMemberSchema