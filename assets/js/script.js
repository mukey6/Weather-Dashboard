// var apiKey = db1f99f6eab83a5a788a8790446e3ea2
// var currentCity = $("#current-city")
var searchBtn = document.getElementById("search-btn");
var city = $("#search-input").val();
var weatherData 

var getCity = function (event) {
  event.preventDefault();
  var city = $("#search-input").val();
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=db1f99f6eab83a5a788a8790446e3ea2";
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (data) {
        
    });
};

function getCurrentWeather(){

 var currentDay = $("<span>").text(moment().format("l"))
 $("#current-condition").append(currentDay)

//  var currentTemp
//  var currentWind
//  var currentHumidity
//  var currentUv
}
// function forecast(){
//     var weatherCard = $("div")
//     var temp


//     $("#forecast").append(weatherCard)
// }

searchBtn.addEventListener("click", getCity);

getCurrentWeather()
// forecast()