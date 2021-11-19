var apiKey = "0fb48fb704090281a9b83e51e7d0084b"
// var currentCity = $("#current-city")
var searchBtn = document.getElementById("search-btn");
var city = $("#search-input").val();
var currentCondition = document.getElementById("current-condition");
var forecast = document.getElementById("forecast");
var searchedCityContainer = document.getElementById("saved-city")
var citySearched = JSON.parse(localStorage.getItem("city")) || [];



function handleSearchButton(event){
  event.preventDefault();
  var city = $("#search-input").val();
  if(city){
    getForecast(city)
    
  }else{
    alert("please enter a city")
  }
} 

function getForecast(city){
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" + apiKey + "&units=imperial";
    fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (data) {
      console.log(data)
      currentForecast(data);
      fiveDayforecast(data);
      displayCitySearch (city);

    });

}



function currentForecast(data) {
  currentCondition.innerText=""
  let weatherIcon = "http://openweathermap.org/img/wn/" + data.weather[0].icon+ ".png"

  console.log(weatherIcon)

let todayIn = document.createElement("h5")
todayIn.innerHTML=data.name + " " + moment().format("l") + " " + ("<img src='" + weatherIcon  + "'>");
currentCondition.appendChild(todayIn)
  
  let temp = document.createElement("p");
  temp.textContent ="Temp: " + data.main.temp + "\xB0 F";
  currentCondition.append(temp);

  let currentWind = document.createElement("p");
  currentWind.textContent ="Wind: " + data.wind.speed + " MPH";
  currentCondition.append(currentWind);

  let currentHumidity = document.createElement("p");
  currentHumidity.textContent ="Humidity: " + data.main.humidity + " %";
  currentCondition.append(currentHumidity);

  let currentUvIndex = document.createElement("p");
  currentUvIndex.textContent ="UV Index: " + data.main.humidity + " %";
  currentCondition.append(currentUvIndex);


  //local storage

if (localStorage.getItem('city') === null){
  localStorage.setItem('city', JSON.stringify([data.name]))
}
else{
var citySearched = JSON.parse(localStorage.getItem('city'))
citySearched.push(data.name)
localStorage.setItem('city', JSON.stringify(citySearched))
}

}
function fiveDayforecast(data) {
  let lon = data.coord.lon;
  let lat = data.coord.lat;
  let forecastContainer = document.createElement("div")
  forecastContainer.classList.add("forecastContainer")
  var futureApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={hourly,minutely}&units=imperial&appid=` + apiKey;
  fetch(futureApi)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (data) {
      console.log("data2", data)
      let forecastData = data.daily;
      forecastContainer.innerText=""
      for (let i = 1; i < 6; i++) {
          let weatherIcon = "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + ".png"
        let dayDisplay = document.createElement("h4")
        dayDisplay.innerHTML = moment().add(i, 'days').format('l') + ("<img src='" + weatherIcon  + "'>")

        let futureTemp = document.createElement("span");
        futureTemp.textContent = "Temp: " + forecastData[i].temp.day + " \xB0 F";
        futureTemp.classList.add("card-text")
        let boxCard = document.createElement("div");
        boxCard.classList.add("card");

        let futureWind = document.createElement("span");
        futureWind.textContent ="Wind: " + forecastData[i].wind_speed + " MPH ";
          futureWind.classList.add("card-text")

        let futureHumidity = document.createElement("span");
        futureHumidity.textContent ="Humidity " + forecastData[i].humidity + " % ";
        futureHumidity.classList.add("card-text")

        forecast.appendChild(forecastContainer);
        forecastContainer.appendChild(boxCard);


        boxCard.appendChild(dayDisplay);
        boxCard.appendChild(futureTemp);
        boxCard.appendChild(futureHumidity);
        boxCard.appendChild(futureWind);

      }
    });
}



function displayCitySearch (city){
  searchedCityContainer.innerHTML=""
let getCity = JSON.parse(localStorage.getItem('city'))
if(getCity){
  for (let i = 0; i < getCity.length; i++) {
    let cityList = document.createElement("button")
    searchedCityContainer.appendChild(cityList)
    cityList.innerHTML = getCity[i]
  }

}


}
getForecast(citySearched[citySearched.length-1])
displayCitySearch ()
searchBtn.addEventListener("click", handleSearchButton);


