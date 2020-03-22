const express = require('express');
const router = express.Router();
const axios = require('axios'); 
const url = 'https://covid19.mathdro.id/api/';


exports.world = function(req, res) {
    axios.all([
        axios.get(url),
        axios.get(url + '/countries')
      ])
      .then(axios.spread((worldRes, countriesRes) => {

        let countryKey = Object.keys(countriesRes.data.countries);

        res.render('world.ejs', {data:worldRes.data, countries:countryKey});
      })).catch(error =>{
        console.log(error);
    });
}


