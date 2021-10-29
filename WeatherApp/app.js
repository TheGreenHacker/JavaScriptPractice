const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const city = req.body.city;
  const metric = req.body.metric;
  const appId = process.env.OPEN_WEATHER_API_KEY;
  var units = "metric";
  
  switch(metric) {
  	case "Celsius":
  	  break;
  	case "Fahrenheit":
  	  units = "imperial";
  	  break;
  	default:
  	  units = "default";
  	  break;
  }

  
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + appId + "&units=" + units;
  https.get(url, (response) => {
    response.on("data", (data) => {
      const parsedData = JSON.parse(data);
      const imgURL = "https://openweathermap.org/img/wn/" + parsedData.weather[0].icon + "@2x.png";
      res.write("<h1>The temeprature in " + city + " is " + parsedData.main.temp + " degrees " + metric + "</h1>");
      res.write("<p>The weather is currently " + parsedData.weather[0].description + " </p>");
      res.write("<img src=" + imgURL + ">");
      res.send();
    });
  });
});

app.listen(port, () => {
  console.log("Server listening on port " + port);
});