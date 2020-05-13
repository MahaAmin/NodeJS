const express = require('express');
const router = express.Router();
const UserModel = require('../models/users');


router.use((req, res, next) => {
    console.log('users router');
    next();
});

router.get('/', (req, res, next) => {
    UserModel.find({}, (err, users) => {
         if(!err){
             res.json(users);
         }
         next(err);
    });
});


router.get('/:id', (req, res) => {
    res.send(`listing user with id = ${req.params.id}`);
});


router.post('/', (req, res, next) => {
    debugger;
    // get request body --> req.body --> express.json()
    const {firstName, lastName, password, dob, gender, email, phone} = req.body;
    // construct user instance from user model
    const userInstance = new UserModel({
        firstName: firstName,
        lastName: lastName,
        password: password,
        dob: dob,
        gender: gender,
        email: email,
        phone: phone,
    });

    const fullName = userInstance.getFullName();
    console.log(fullName);
    
    // save user in database
    userInstance.save((err, user) => {
        if(!err) return res.json(user);
        next(err);
    })


});



router.patch('/:id', (req, res) => {
    res.send(`updating user with id ${req.params.id}`);
});


router.delete('/:id', (req, res) => {
    res.send(`deleting user with id = ${req.params.id}`)
});

module.exports = router;
