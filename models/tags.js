const { Schema, model, models } = require('mongoose');

const UserSchema = Schema({
    tag: {
        type: String,
        required: true
    },
    value: {
        type: String,
        //required: true
    },

});

module.exports = model('Tags', UserSchema);