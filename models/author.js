var mongoose = require('mongoose');
const { DateTime } = require("luxon");
var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, maxLength: 100},
    family_name: {type: String, required: true, maxLength: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);


AuthorSchema
.virtual('name')
.get(function () {
  var fullname = '';
  if (this.first_name && this.family_name) {
    fullname = this.family_name + ', ' + this.first_name
  }
  if (!this.first_name || !this.family_name) {
    fullname = '';
  }
  return fullname;
});


AuthorSchema.virtual('lifespan').get(function() {
  var lifetime_string = '';
  if (this.date_of_birth) {
    lifetime_string = this.date_of_birth.getYear().toString();
  }
  lifetime_string += ' - ';
  if (this.date_of_death) {
    lifetime_string += this.date_of_death.getYear()
  }
  return lifetime_string;
});

AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

AuthorSchema
.virtual('date_formatted')
.get(function(){
  if(this.date_of_death){
    return DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) + ' - ' + DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED)
  }
  else if(this.date_of_birth){
    return DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) + ' - '
  }
  else{
    return ''
  }
})


AuthorSchema.virtual('date_of_birth_yyyy_mm_dd').get(function() {
  return DateTime.fromJSDate(this.date_of_birth).toISODate(); //format 'YYYY-MM-DD'
});

AuthorSchema.virtual('date_of_death_yyyy_mm_dd').get(function() {
  return DateTime.fromJSDate(this.date_of_death).toISODate(); //format 'YYYY-MM-DD'
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);
