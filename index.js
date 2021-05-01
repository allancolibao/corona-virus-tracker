const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');
const app = express();
const port = 3000

require('dotenv').config()

// importing the main route
const worldRouter = require('./routes/world');
const countryRouter = require('./routes/country')

//middleware
app.use(logger('dev'));
app.use(bodyParser.json());

// set the view engine
app.set('views', [path.join(__dirname, 'views/pages'), path.join(__dirname, 'views/inc')]);
app.set('view engine', 'ejs');

app.use('/js', express.static(`${__dirname}/node_modules/bootstrap/dist/js`));
app.use('/js', express.static(`${__dirname}/node_modules/jquery/dist`)); 
app.use('/css', express.static(`${__dirname}/node_modules/bootstrap/dist/css`));
app.use(express.static(path.join(__dirname, 'assets')));

// route
app.use('/', worldRouter);
app.use('/country', countryRouter);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const server = http.createServer(app);

//Listening to the server
server.listen(port, (err) => {  
    if (err) {
      return console.log('Somethin went wrong', err)
    }
    console.log(`Listening on port ${port}`)
  })