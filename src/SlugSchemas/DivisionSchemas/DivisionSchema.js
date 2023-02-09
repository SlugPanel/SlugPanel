const mongoose = require('mongoose')
const divisionMemberSchema = require('./DivisionMemberSchema')
const subDivisionSchema = require('./SubDivisionSchema')

const divisionSchema = new mongoose.Schema({
    division_name: String,
    division_id: Number,
    division_hq: {
        commanding_officer: {type: divisionMemberSchema, default: null},
        executive_officer: {type: divisionMemberSchema, default: null},
        senior_enlisted_advisor: {type: divisionMemberSchema, default: null}
    },
    subdivisions: {type: [subDivisionSchema], default: null},
    unplaced: {type: [divisionMemberSchema], default: null}
}, {collection: 'divisionData'})

module.exports = divisionSchema