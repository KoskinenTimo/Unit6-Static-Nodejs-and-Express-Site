const express = require('express');
const app = express();
const data = require('./data.json').projects;

app.use('/static', express.static('public'));
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'pug');

app.get('/', (req,res) => {
  res.render('index', {data});
});

app.get('/about', (req,res) => {
  res.render('about');
});

app.get('/project/:id', (req,res) => {
  const {id} = res.params;

});

app.use((req,res,next) => {
  const error = new Error("Page Not Found.");
  error.status = 404;
  next(error);
});

app.use((error,req,res,next) => {

});

app.listen(3000, () => {
  console.log("Running on port 3000");
});