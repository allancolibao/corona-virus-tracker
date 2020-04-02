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

        let countryKey = Object.values(countriesRes.data.countries);
  
        let country = countryKey.map(item => item.name)

        res.render('world.ejs', {data:worldRes.data, countries:country});
      })).catch(error =>{
        console.log(error);
    });
}


