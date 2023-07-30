const express = require('express');
const app = express();
const router = require('./router/router');
const databaseConnect = require('./database/db');
const cookieParser = require('cookie-parser');

databaseConnect()

app.use(express.json());
app.use(cookieParser());

app.use('/api/crud', router);


module.exports = app