const express = require('express');
const bodyParser = require('body-parser');
const countryRouter = express.Router();
const axios = require('axios'); 

const url = process.env.NODE_APP_BASE_URL;

countryRouter.use(bodyParser.json());

countryRouter.route('/')
.all((req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  next();
})
.get((req, res, next) => {
  axios.all([
      axios.get(`${url}/countries/${req.query.country}`),
      axios.get(url)
    ])
    .then(axios.spread((countryRes, countryList) => {

      let countryKey = Object.values(countryList.data.countries);

      let country = countryKey.map(item => item.name)

      console.log(req.query.country);

      res.render('country', {data:countryRes.data, countries:country, country:req.query.country });
    })).catch(error =>{
      res.render('error', {country:req.query.country });
  });
});

module.exports = countryRouter;