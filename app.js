"use strict";
var APPID ="4cd36ece9517406aec0d5a59522adc5f" ;
var temp;
var loc;
var humidity;
var wind;
var direction;

searchButton.addEventListener('click', searchWeather);

function searchWeather() {
    loadingText.style.display = 'block';
    weatherBox.style.display = 'none';
    var cityName = searchCity.value;
    if (cityName.trim().length == 0) {
        return alert('Please enter a City Name');
    }
    var http = new XMLHttpRequest();
    var apiKey = 'YOUR_KEY';
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=metric&appid=' + "4cd36ece9517406aec0d5a59522adc5f" ;
    var method = 'GET';

    http.open(method, url);
    http.onreadystatechange = function() {
        if (http.readyState == XMLHttpRequest.DONE && http.status === 200) {
            var data = JSON.parse(http.responseText);
            var weatherData = new Weather(cityName, data.weather[0].description.toUpperCase());
            weatherData.temperature = data.main.temp;
            updateWeather(weatherData);
        } else if (http.readyState === XMLHttpRequest.DONE) {
            alert('Something went wrong!');
        }
    };
    http.send();
}
 
function updateByZip(zip){
	var url = "http://api.openweathermap.org/data/2.5/weather?" + "Zip=" + zip + "&appid=" + APPID;
	sendRequest(url);
}
function updateByGeo(lat, lon){
	var url = "http://api.openweathermap.org/data/2.5/weather?" + "lat=" + lat + "&lon=" + lon +"&appid=" +APPID;
	sendRequest(url);
}
function updateWeather(weatherData) {
    weatherCity.textContent = weatherData.cityName;
    weatherDescription.textContent = weatherData.description;
    weatherTemperature.textContent = weatherData.temperature;

    loadingText.style.display = 'none';
    weatherBox.style.display = 'block';
}

function showPosition(position){
	updateByGeo(position.coords.lattitude,position.coords.longitude);
	
	
}
window.onload = function() {
temp = document.getElementById("temperature");
loc = document.getElementById("location");
icon = document.getElementById("icon");
humidity = document.getElementById("humidity");
wind = document.getElementById("wind");
direction = document.getElementById("direction");

if(navigator.geolocation){
	navigator.geolocation.getCurrentPosition(showPosition);
	
}else{
	var zip = window.prompt("Could not discover your location, pl enter zip");
	updateByZip(zip);
	
}

//update(weather);
//updateByPin("524201");
//updateByZip(45015 )Hamilton;
updateByZip("45015");

}
