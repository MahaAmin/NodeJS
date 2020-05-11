const express = require('express');
const router = express.Router();


router.use((req, res, next) => {
    console.log('users router');
    next();
});

router.get('/', (req, res) => {
    res.send('listing all users');
});


router.get('/:id', (req, res) => {
    res.send(`listing user with id = ${req.params.id}`);
});


router.post('/', (req, res) => {
    res.send('create new user');
});



router.patch('/:id', (req, res) => {
    res.send(`updating user with id ${req.params.id}`);
});


router.delete('/:id', (req, res) => {
    res.send(`deleting user with id = ${req.params.id}`)
});

module.exports = router;
