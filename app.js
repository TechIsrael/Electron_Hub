//var APPID = "9cf5037800d9daeff74f63485157a63b";
//var APPID = "7d7767c42921d02a1d86ae54cbbdb852";
//var APPID = 4cd36ece9517406aec0d5a59522adc5f 
var APPID ="4cd36ece9517406aec0d5a59522adc5f" ;
var temp;
var loc;
var icon; 
var humidity;
var wind;
var direction;

function updateByZip(zip){
	var url = "http://api.openweathermap.org/data/2.5/weather?" + "Zip=" + zip + "&appid=" + APPID;
	sendRequest(url);
}
function updateByGeo(lat, lon){
	var url = "http://api.openweathermap.org/data/2.5/weather?" + "lat=" + lat + "&lon=" + lon +"&appid=" +APPID;
	sendRequest(url);
}
//Use the OpenWeatherMap Current Weather API to get data by city name via the q parameter. 
//The endpoint is https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}.
// You can refine results by adding state or country codes (e.g., q=London,GB), 
//with API calls recommended no more than once every 10 minutes per location.
function sendRequest(url){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var data = JSON.parse(xmlhttp.responseText);
			var weather = {};
			weather.icon = data.weather[0].id;
			weather.humidity = data.main.humidity;
			weather.wind = data.wind.speed;
			weather.direction = degreesToDirection(data.wind.deg);
			weather.loc = data.name;
			weather.temp = K2C(data.main.temp);
			update(weather);
		}
		
	};
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
	
}

function K2C(k){
	return Math.round(k - 273.15);
}
function K2F(k){
	return Math.round(k*(9/5)-459.67);
}

function degreesToDirection(degrees){
	var range = 360/16;
	var low = 360-range/2;
	var high = (low+range)% 360; 
	var angles = ["N","NNE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW","NN"];
	for(i in angles){
		if(degrees >= low && degrees < high)
			return angles[i];
			
			
			low = (low+range)%360;
			high =(high+range)%360;
		}
		return "N";
	
}

function update(weather){
wind.innerHTML = weather.wind;
direction.innerHTML = weather.direction;
humidity.innerHTML = weather.humidity;
loc.innerHTML = weather.loc;
temp.innerHTML = weather.temp;
icon.src = "imgs/code" + weather.icon + ".png";
consol.log(icon.src);

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