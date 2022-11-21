var seachForm = document.querySelector('#search-form');
var searchInput = document.querySelector('#search-input');
var todayContainer = document.querySelector('#today');
var forecastContainer = document.querySelector('#forecast');
var searchHistoryContainer = document.querySelector('#history'); 

var searchHistory = [];
var weatherRoot = 'https://api.openweathermap.org';
var apiKey = '816f5eec2918e5335373901c86bd48da';

dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

function renderSearchHistory() {
    searchHistoryContainer.innerHTML = " ";

    for (var i = searchHistory.length -1; i>= 0. i--) {
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


