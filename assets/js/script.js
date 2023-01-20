var seachForm = document.querySelector('#search-form');
var searchInput = document.querySelector('#search-input');
var todayContainer = document.querySelector('#today');
var forecastContainer = document.querySelector('#forecast');
var searchHistoryContainer = document.querySelector('#history');
var searchBtn = document.querySelector("#search-button");
var fiveDay = document.getElementById('forecastDiv')
var currentDate = document.getElementById('todays-date')

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

//create search history on page refresh/page load
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

        btn.addEventListener('click', function (event) {
            console.log('clicked', event.target.textContent)
            var clickedCity = event.target.textContent
            initialSearch(clickedCity)
        })
    }
}

//append previously searched cities and add them to local storage
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

//Create search history list and send to local storage
function historyList(searchValue) {
    var historyBtn = document.createElement("button");
    historyBtn.textContent = searchValue;
    searchHistoryContainer.append(searchValue);
    searchHistory.push(searchValue);
    localStorage.setItem('search-history', JSON.stringify(searchHistory));


}

//add event listener for input and button
searchBtn.addEventListener("click", function (event) {
    event.preventDefault()
    var cityVal = searchInput.value
    initialSearch(cityVal)
})

function initialSearch(city) {
    historyList(searchInput.value)
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=" + apiKey + "&units=imperial")
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            currentDate.textContent = moment().format('DD MMMM YYYY')
            var cityR = response["name"] //equivalent to response.name
            var tempR = response["main"]["temp"]; //equivalent to response.main.temp
            var windR = response["wind"]["speed"];
            var humidityR = response["main"]["humidity"];

            var iconR = response["weather"][0]["icon"];

            cityDate.innerHTML = cityR + " " + iconURL + iconR + ".png>"
            temp.innerHTML = "Temp: " + tempR + " F";
            wind.innerHTML = "Wind: " + windR + " MPH";
            humidity.innerHTML = "Humidity: " + humidityR + "%";
            forecast(response.coord.lat, response.coord.lon);

        })
};

//Show 5 day forecast
function forecast(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
        .then((response) => response.json())
        .then((response) => {
            console.log(response);

            for (var i = 0; i < 5; i++) {
                var dayOfWeek = document.createElement('p')
                dayOfWeek.textContent = moment().add(i + 1, 'days').format('dddd')


                var temp = document.createElement('p')
                temp.textContent = `Temp: ${response.list[i].main.temp}`



                fiveDay.append(dayOfWeek, temp)
            }

        })
}