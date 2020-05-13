const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const postRouter = require('./routes/posts');
const log = require('./middlewares/log');
const logRequestBody = require('./middlewares/logRequestBody');

const PORT = process.env.PORT || 5000;

const app = express();
mongoose.connect('mongodb://localhost:27017/blog-app', 
    { useUnifiedTopology: true , useNewUrlParser: true},
     (err) => {
    if(!err) return console.log('started connection on mongodb');
    console.log(err);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(log);
app.use(logRequestBody);
app.use('/users', userRouter);
app.use('/posts', postRouter);


app.use((err, req, res, next) => {
    res.status(500).send("Error occurred!");
});

app.listen(PORT, (err) => {
    if(!err) return console.log('started server on port ' + PORT);
    console.log(err);
});