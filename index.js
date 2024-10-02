const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

const apiKey = '***';
//Create an account and generate your own API key here => https://openweathermap.org/

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');

app.get('/', function (req,res) {
    res.render('index', {weather:null, error:null})
})

app.post('/', function(req,res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    console.log(req.body.city);
    request(url, function (err, response, body) {
        if (err) {
            res.render('index', { weather: null, error: 'Error, please try again'});
        } else {
            let weather = JSON.parse(body);
            if (weather.main == undefined){
                res.render('index', {
                    weather: null,
                    error: "Error, please try again",
                });
            }
            else{
                let weatherText = `It's ${weather.main.temp} degrees Celsius with ${weather.weather[0].description} in ${weather.name}!`;
                res.render('index', {weather: weatherText, error:null});
                console.log('body:', body);
            }
        }
    });
});

app.listen(4000, function() {
    console.log("Weatherly app listening on port 4000!!");
}); 
