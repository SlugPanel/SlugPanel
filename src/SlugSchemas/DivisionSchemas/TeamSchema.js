const mongoose = require('mongoose')
const divisionMemberSchema = require('./DivisionMemberSchema')

const teamSchema = new mongoose.Schema({
    team_name: String,
    team_id: Number,
    team_hq: {
        commanding_officer: divisionMemberSchema,
        team_executive_officer: divisionMemberSchema,
        team_senior_enlisted_advisor: divisionMemberSchema,
    },
    team_members: {type: [divisionMemberSchema], default: null}
}, {_id: false, collection: 'divisionData'})

module.exports = teamSchema