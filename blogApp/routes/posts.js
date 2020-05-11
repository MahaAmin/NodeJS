const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('listing all posts');
});


router.get('/:id', (req, res) => {
    res.send(`listing post with id = ${req.params.id}`);
});


router.post('/', (req, res) => {
    res.send('create new post');
});



router.patch('/:id', (req, res) => {
    res.send(`updating post with id ${req.params.id}`);
});


router.delete('/:id', (req, res) => {
    res.send(`deleting post with id = ${req.params.id}`)
});

module.exports = router;
