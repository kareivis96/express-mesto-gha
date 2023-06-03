const express = require('express');
const mongoose = require('mongoose');
const { errorHandler } = require('./middlewares/error.middleware');
const router = require('./routes/index');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);
app.use(errorHandler);

app.listen(PORT);
