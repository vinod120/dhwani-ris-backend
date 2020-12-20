const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const childrenSchema = new Schema({
    children_name: {
        type: String,
    },
    father_name: {
        type: String,
    },
    mother_name: {
        type: String,
    },
    gender: {
        type: String,
    },
    dob: {
        type: Date,
    }
}, { 
    versionKey: false 
})


const districtSchema = new Schema({
    district_name: {
        type: String,
    },
    childrens: [childrenSchema]
},
    {
        versionKey: false,
    })


const stateSchema = new Schema({
    state_name: {
        type: String,
        required: true,
    },
    district_name: [districtSchema],
}, 
    {
    versionKey: false
    }
);

module.exports = mongoose.model("State", stateSchema);