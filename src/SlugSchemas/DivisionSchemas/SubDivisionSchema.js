const mongoose = require('mongoose')
const divisionMemberSchema = require('./DivisionMemberSchema')
const teamSchema = require('./TeamSchema')

const subDivisionSchema = new mongoose.Schema({
    subdivision_name: String,
    subdivision_id: Number,
    subdivision_hq: {
        commanding_officer: divisionMemberSchema,
        executive_officer: divisionMemberSchema,
        senior_enlisted_advisor: divisionMemberSchema
    },
    subdivision_teams: {type: [teamSchema], default: null},
    unplaced: {type: [divisionMemberSchema], default: null}
}, {_id: false, collection: 'divisionData'})

module.exports = subDivisionSchema