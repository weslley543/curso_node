let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema= new Schema({
    title: {type: String, require:true},
    is_complete:{type:Boolean, default:false},
    create_at:{type: Date, require: true, default:Date.now},
    completed_at:{type:Date}
});

module.exports = mongoose.model('ToDo', schema);