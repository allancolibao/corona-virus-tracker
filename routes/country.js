const express = require('express');
const router = express.Router();
const axios = require('axios'); 
const url = 'https://covid19.mathdro.id/api/countries/';


exports.country = function(req, res) {
    axios.all([
        axios.get(url + req.query.country),
        axios.get(url)
      ])
      .then(axios.spread((countryRes, countryList) => {

        let countryKey = Object.values(countryList.data.countries);

        let country = countryKey.map(item => item.name)

        res.render('country.ejs', {data:countryRes.data, countries:country, country:req.query.country });
      })).catch(error =>{
        res.render('error.ejs', {country:req.query.country });
    });
}
