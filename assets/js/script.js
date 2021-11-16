// var apiKey = db1f99f6eab83a5a788a8790446e3ea2
// var currentCity = $("#current-city")
var searchBtn = document.getElementById("search-btn");
var city = $("#search-input").val();
var currentCondition = document.getElementById("current-condition");
var currentDayDisplay = document.getElementById("city-date");
var forecast = document.getElementById("forecast");

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
      currentForecast(data);
      fiveDayforecast(data);
      savedInput(data)

    });
};

function currentForecast(data) {
  console.log(data);
  currentDayDisplay.innerText = data.name + moment().format("l");
  let temp = document.createElement("p");
  temp.textContent = data.main.temp + " F";
  currentCondition.append(temp);

  let currentWind = document.createElement("p");
  currentWind.textContent = data.wind.speed + " MPH";
  currentCondition.append(currentWind);

  let currentHumidity = document.createElement("p");
  currentHumidity.textContent = data.main.humidity + " %";
  currentCondition.append(currentHumidity);

  // can't find UV on the data
  //  let currentUv = document.createComment("p")
  //  currentUv.textContent = data

  //local storage
  localStorage.setItem('city', data.name)
  

}
function fiveDayforecast(data) {
  let lon = data.coord.lon;
  let lat = data.coord.lat;
  var futureApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={daily}&appid=db1f99f6eab83a5a788a8790446e3ea2`;
  fetch(futureApi)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (data) {
      let forecastData = data.daily;
      for (let i = 1; i < 6; i++) {
        let dayDisplay = document.createElement("h4")
        dayDisplay.textContent = moment().format("l")
        console.log(dayDisplay)

        let futureTemp = document.createElement("span");
        futureTemp.textContent = forecastData[i].temp.day + "F ";
        futureTemp.classList.add("card-text")
        console.log("asfasdfa=>");
        let boxCard = document.createElement("div");
        boxCard.classList.add("card");

        let futureWing = document.createElement("span");
        futureWing.textContent =
          forecastData[i].wind_speed + "MPH ";
          futureWing.classList.add("card-text")

        let futureHumidity = document.createElement("span");
        futureHumidity.textContent =
          forecastData[i].humidity + "% ";
          futureHumidity.classList.add("card-text")

        forecast.appendChild(boxCard);
        // forecast.appendChild(boxCard);
        // forecast.appendChild(boxCard);

        boxCard.appendChild(dayDisplay);
        boxCard.appendChild(futureTemp);
        boxCard.appendChild(futureHumidity);
        boxCard.appendChild(futureWing);




      }
      console.log("=====>", data);
    });

  //    let futureDate = moment.format("l")
}
function savedInput(data){
localStorage.getItem('city', data.name)


}
searchBtn.addEventListener("click", getCity);


