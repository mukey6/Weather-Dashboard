var apiKey = "db1f99f6eab83a5a788a8790446e3ea2"
// var currentCity = $("#current-city")
var searchBtn = document.getElementById("search-btn");
var city = $("#search-input").val();
var currentCondition = document.getElementById("current-condition");
var currentDayDisplay = document.getElementById("city-date");
var forecast = document.getElementById("forecast");
var searchedCity = document.getElementById("saved-city")
// citySearch.push()


var getCity = function (event) {
  event.preventDefault();
  var city = $("#search-input").val();
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" + apiKey;
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (data) {
      currentForecast(data);
      fiveDayforecast(data);
    });
};

function currentForecast(data) {
  console.log(data);
  currentDayDisplay.innerText = data.name + " " + moment().format("l");

  let icons = document.createElement("span")
  // icon.textContent = data.weather[0].icon
  // console.log(("this is " + icons))

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
// 

  //local storage
  let cities =localStorage.getItem('city') || [];

if (localStorage.getItem('city') === null){
  localStorage.setItem('city', JSON.stringify(data.name))
  cities.push(data.name)

}else{
localStorage.setItem('city', JSON.stringify(data.name))
localStorage.getItem('city')
}

}
function fiveDayforecast(data) {
  let lon = data.coord.lon;
  let lat = data.coord.lat;
  let forecastContainer = document.createElement("div")
  forecastContainer.classList.add("forecastContainer")
  var futureApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={daily}&appid=` + apiKey;
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
        dayDisplay.textContent = moment().add([i], 'day').format("l")
        // console.log(dayDisplay)

        let futureTemp = document.createElement("span");
        futureTemp.textContent = forecastData[i].temp.day + "F ";
        futureTemp.classList.add("card-text")
        let boxCard = document.createElement("div");
        boxCard.classList.add("card");

        let futureWing = document.createElement("span");
        futureWing.textContent = forecastData[i].wind_speed + "MPH ";
          futureWing.classList.add("card-text")

        let futureHumidity = document.createElement("span");
        futureHumidity.textContent = forecastData[i].humidity + "% ";
        futureHumidity.classList.add("card-text")

        forecast.appendChild(forecastContainer);
        forecastContainer.appendChild(boxCard);


        boxCard.appendChild(dayDisplay);
        boxCard.appendChild(futureTemp);
        boxCard.appendChild(futureHumidity);
        boxCard.appendChild(futureWing);

      }
      console.log("=====>", data);
    });
}



function clearSearch (){
let clear = document.createElement("button")
clear.textContent = "Clear"
searchedCity.appendChild(clear)
}
searchBtn.addEventListener("click", getCity);


clearSearch()