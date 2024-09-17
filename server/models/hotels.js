const mongoose = require('mongoose');


const hotelsSchema = new mongoose.Schema({
    name: {type : String, required: true},
    type: {type : String, required: true, enum: ['Hotel','Apartments', 'Resorts', 'Villas', 'Cabins' ]},
    city : {type : String, required: true},
    address: {type : String, required: true},
    distances: {type : String, required: true},
    photos: {type : [String], required: true},
    desc: {type: String, required: true},
    rating : {type: Number, min:0, max: 5 },
    featured: {type: Boolean, default: false},
    rooms : [{type: String, required: true }]
});
hotelsSchema.index({city : 'text'});
module.exports = mongoose.model('hotels', hotelsSchema)

