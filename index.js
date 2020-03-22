const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000

// Importing the main route
const worldRoute = require('./routes/world');
const countryRoute = require('./routes/country')

//Middleware
app.use(bodyParser.json());
app.set('views', [path.join(__dirname, 'views/pages/'), path.join(__dirname, 'views/inc/')]);
app.set('view engine', 'ejs');
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); 
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use(express.static(path.join(__dirname, 'assets')));


app.get('/', worldRoute.world);
app.get('/country', countryRoute.country);

//Listening to the server
app.listen(port, (err) => {  
    if (err) {
      return console.log('Somethin went wrong', err)
    }
 
    console.log(`Listening on port ${port}`)
  })