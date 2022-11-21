var seachForm = document.querySelector('#search-form');
var searchInput = document.querySelector('#search-input');
var todayContainer = document.querySelector('#today');
var forecastContainer = document.querySelector('#forecast');
var searchHistoryContainer = document.querySelector('#history');
var searchBtn = document.querySelector("#search-button");

var searchHistory = JSON.parse(localStorage.getItem("search-history")) || [];
var weatherRoot = 'https://api.openweathermap.org';
var apiKey = '816f5eec2918e5335373901c86bd48da';
var iconURL = "<img src = 'http://openweathermap.org/img/wn"

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;
var yyyy = today.getFullYear();
var today = "(" + mm + "/" + dd + "/" + yyyy + ")";
var cityDate = document.querySelector("#cityDate");
var temp = document.querySelector("#temp");
var wind = document.querySelector("#wind");
var humidity = document.querySelector("#humidity");


renderSearchHistory();

function renderSearchHistory() {
    searchHistoryContainer.innerHTML = " ";

    for (var i = searchHistory.length - 1; i >= 0; i--) {
        var btn = document.createElement('button');
        btn.setAttribute('type', 'button');
        btn.setAttribute('aria-controls', 'today forecast');
        btn.classList.add('history-btn', 'btn-history');

        btn.setAttribute('data-search', searchHistory[i]);
        btn.textContent = searchHistory[i];
        searchHistoryContainer.append(btn);
    }
}

function appendToHistory(search) {
    if (searchHistory.indexOf(search) !== -1) {
        return;
    }
    searchHistory.push(search);
    localStorage.setItem('search-history', JSON.stringify(searchHistory));
    renderSearchHistory();
}

function localSearchHistory() {
    var storedHistory = localStorage.getItem('search-history');
    if (storedHistory) {
        searchHistory = JSON.parse(storedHistory);
    } 
    renderSearchHistory();
}

function historyList(searchValue) {
    var historyBtn = document.createElement("button");
    historyBtn.textContent = searchValue;
    searchHistoryContainer.append(searchValue);
    // if (searchHistory.indexOf(search) !== -1) {
    //     return;
    // }
    searchHistory.push(searchValue);
    localStorage.setItem('search-history', JSON.stringify(searchHistory));
}

searchBtn.addEventListener("click", function (event) {
    event.preventDefault()
    historyList(searchInput.value)
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + searchInput.value + "&units=imperial" + "&appid=" + apiKey)
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            var cityR = response["name"] //equivalent to response.name
            var tempR = response["main"]["temp"]; //equivalent to response.main.temp
            var windR = response["wind"]["speed"];
            var humidityR = response["main"]["humidity"];

            var iconR = response["weather"][0]["icon"];

            cityDate.innerHTML = cityR + " " + iconURL + iconR + ".png>"
            temp.innerHTML = "Temp: " + tempR + " F";
            wind.innerHTML = "Wind: " + windR + " MPH";
            humidity.innherHTML = "Humidity: " + humidityR + "%";
forecast(response.coord.lat, response.coord.lon);

        })
});

function forecast(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    .then((response) => response.json())
    .then((response) => {
        console.log(response);

        for (var i = 4; response.list.length; i = i + 8) {
var temp = $("<p>").text(response.list[i].main.temp)



       $("#forecastDiv").append(temp)     
        }

    })
}