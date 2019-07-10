// import express from 'express';
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var routes = require('./routes')

const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', routes);

app.listen(port, () => console.log(`-- App listening on port ${port}! -- `));

