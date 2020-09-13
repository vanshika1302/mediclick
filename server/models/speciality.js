const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const specialitySchema = new Schema({
    spclId: {
        type: String
    },
    spclName: {
        type: String
    }
});

module.exports = mongoose.model('speciality', specialitySchema);