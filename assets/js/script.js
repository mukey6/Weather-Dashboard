// db1f99f6eab83a5a788a8790446e3ea2
// var currentCity = $("#current-city")
var searchBtn = document.getElementById("search-btn")

var getCity = function(city){

    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=db1f99f6eab83a5a788a8790446e3ea2"
console.log(apiUrl)
fetch(apiUrl)
.then(function(response){
    console.log(response)
    if(response.ok){
        return response.json()
    }
})
.then(function(data){
    console.log(data)
})
}

function getCurrentWeather (){
     
}

searchBtn.addEventListener("click", function(){
    event.preventDefault();
    var cityName = $("#search-input").val()
    console.log(cityName)
})

getCity("manchester")
