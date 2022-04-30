var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GenreSchema = new Schema({
    name: {type: String, required: true},
});


GenreSchema
    .virtual('url')
    .get(function(){
        return 'catalog/genre';
    });

module.exports = mongoose.model('Genre', GenreSchema);