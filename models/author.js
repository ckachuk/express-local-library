const { default: mongoose } = require('mongoose');
var moongose = require('mongoose');

var Schema = moongose.Schema;

var AuthorSchema = new Schema({
    firstName: {type: String, required: true, maxlength: 100},
    familyName: {type: String, required: true, maxlength: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
});


AuthorSchema
    .virtual('name')
    .get(function(){
        var fullName = '';
        if(this.firstName && this.familyName){
            fullName = this.firstName + ' ' + this.familyName;
        }
        if(this.firstName || this.familyName){
            fullName = '';
        }  

        return familyName;
    })


AuthorSchema
    .virtual('lifespan')
    .get(function(){
        var lifetime_string = '';
        
        if(this.date_of_birth){
            lifetime_string = this.date_of_birth.getYear().toString();
        }
        lifetime_string += ' - ';
        if(this.date_of_death){
            lifetime_string += this.date_of_death.getYear();
        }
    });


AuthorSchema
    .virtual('url')
    .get(function(){
        return '/catalog/author/' + this._id;
    });


module.exports = mongoose.model('Author', AuthorSchema);