const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true, maxlength: 20, minlength: 3},
    lastName: {type: String, required: true, maxlength: 20, minlength: 3},
    password: {type: String, required: true, minlength: 8},
    dob: {type: Date, required: true, min: new Date('12-05-2008')},
    gender: {type: String, enum: ['f', 'm']},
    email: {type: String, unique: true, index: true },
    phone: {type: String, maxlength: 11, minlength: 11, required: true },
});


userSchema.methods.getFullName = function getFullName () {
    return this.firstName + " " + this.lastName;
}


userSchema.statics.getUsersByGender = function getUsersByGender(gender){
    this.find({gender: gender}, (err, data) => {
        
    })
}


const userModel = mongoose.model('User', userSchema);
userModel.getUsersByGender();
module.exports = userModel;