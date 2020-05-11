const express = require('express');
const userRouter = require('./routes/users');
const postRouter = require('./routes/posts');
const log = require('./middlewares/log');
const logRequestBody = require('./middlewares/logRequestBody');

const PORT = process.env.PORT || 5000;

const app = express();


app.use(express.json());
app.use(express.static('public'));

app.use(log);
app.use(logRequestBody);
app.use('/users', userRouter);
app.use('/posts', postRouter);

app.listen(PORT, (err) => {
    if(!err) return console.log('started server on port ' + PORT);
    console.log(err);
});