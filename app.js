const express = require('express');
const app = express();
const data = require('data.json').projects;
app.set('view engine', 'pug');
app.use('static', express.static('public'));