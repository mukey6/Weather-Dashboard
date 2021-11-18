var apiKey = "db1f99f6eab83a5a788a8790446e3ea2"
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
      currentForecast(data);
      fiveDayforecast(data);
      displayCitySearch ();

    });

}



function currentForecast(data) {
  currentCondition.innerText=""
  
let todayIn = document.createElement("h5")
todayIn.innerText=data.name + " " + moment().format("l");
currentCondition.appendChild(todayIn)
console.log(todayIn)
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
      let forecastData = data.daily;
      for (let i = 1; i < 6; i++) {
        let dayDisplay = document.createElement("h4")
        dayDisplay.textContent = moment().add(i, 'days').format('l')

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


