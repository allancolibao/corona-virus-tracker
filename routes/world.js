const express = require('express');
const bodyParser = require('body-parser');
const worldRouter = express.Router();
const axios = require('axios'); 

const url = process.env.NODE_APP_BASE_URL;

worldRouter.use(bodyParser.json());

worldRouter.route('/')
.all((req,res,next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  next();
})
.get((req,res,next) => {
  axios.all([
      axios.get(url),
      axios.get(`${url}/countries`)
    ])
    .then(axios.spread((worldRes, countriesRes) => {

      let countryKey = Object.values(countriesRes.data.countries);

      let country = countryKey.map(item => item.name)

      res.render('world', {data:worldRes.data, countries:country});
    })).catch(error =>{
      console.error(error);
  });
});


module.exports = worldRouter;