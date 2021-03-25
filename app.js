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

app.get('/project/:id', (req,res,next) => {
  const {id} = req.params;
  let templateData = '';
  if(id < data.length && id >= 0) {
    templateData = data[id];
    res.render('project', templateData);
  } else {    
    next();
  }   
});

app.use((req,res,next) => {
  const error = new Error("Page Not Found!");
  error.status = 404;
  next(error);
});

app.use((error,req,res,next) => {
  res.locals.error = error;
  const status = error.status || 500;
  res.status(status);
  if(res.status === 404) {
    res.render('page-not-found', error);
  } else {
    res.render('error', error);
  }
  console.log(`Message: ${error.message} Status: ${error.status}`);
});

app.listen(3000, () => {
  console.log("Running on port 3000");
});