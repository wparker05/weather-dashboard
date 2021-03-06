var btn = document.querySelector('#submit-btn');
var text = document.querySelector('#text-input');
var now = document.querySelector('#todayWeather');
var week = document.querySelector('#weekWeather');
var btnList = document.querySelector('#button-list');
var count = 0;

var uvIndex = function (lat, lon) {
    var uvUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=e19c35c86c9eaa0f15bd8bb58efaa58c`;

    fetch(uvUrl)
        .then(function (response) {
            if (response.ok) return response.json();
            else location.replace('./index.html');
        })
        .then(function (data) {
            var showIndex = document.createElement('p');

            showIndex.textContent = `UV Index: ${data.current.uvi}`;
            now.append(showIndex);
        })
}

var today = function (city) {
    if (!city) location.replace('./index.html');
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=e19c35c86c9eaa0f15bd8bb58efaa58c`;

    fetch(url)
        .then(function (response) {
            if(response.ok) return response.json();
            else location.replace('./index.html');
        })
        .then(function (data) {
            console.log(data);
            var cityName = document.createElement('h2');
            var img = document.createElement('img');
            var icon = data.weather[0].icon;
            img.setAttribute('src',`http://openweathermap.org/img/wn/${icon}@2x.png`);
            cityName.textContent = `${data.name}`;
            cityName.append(img);
            var showTemp = document.createElement('p');
            showTemp.textContent = `Temp: ${parseInt(data.main.temp)} F`;
            var showHum = document.createElement('p');
            showHum.textContent = `Humidity: ${data.main.humidity}%`;
            var showWind = document.createElement('p');
            showWind.textContent = `Wind: ${data.wind.speed} MPH`;
            var lon = data.coord.lon;
            var lat = data.coord.lat;




            now.append(cityName);
            now.append(showTemp);
            now.append(showWind);
            now.append(showHum);
            uvIndex(lat, lon);
            now.style.display = "block";

        })
}

var fiveCast = function (city) {
    if (!city) location.replace('./index.html');
    var fiveDayUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=e19c35c86c9eaa0f15bd8bb58efaa58c`;

    fetch(fiveDayUrl)
        .then(function (response) {
            if(response.ok) return response.json();
            else location.replace('./index.html');
        })
        .then(function (data) {
            for (var i = 3; i < data.list.length; i += 8) {
                var box = document.createElement('div');
                box.setAttribute('class', 'col-2 forecast bg-primary bg-graident');
                var dayTime = document.createElement('p');
                dayTime.textContent = data.list[i].dt_txt.slice(0, 11);
                var img = document.createElement('img');
                var icon = data.list[i].weather[0].icon;
                img.setAttribute('src',`http://openweathermap.org/img/wn/${icon}@2x.png`);
                var showTemp = document.createElement('p');
                showTemp.textContent = `Temp: ${parseInt(data.list[i].main.temp)} F`;
                var showHum = document.createElement('p');
                showHum.textContent = `Humidity: ${data.list[i].main.humidity}%`;
                var showWind = document.createElement('p');
                showWind.textContent = `Wind: ${data.list[i].wind.speed} MPH`;

                box.append(dayTime);
                box.append(img);
                box.append(showTemp);
                box.append(showWind);
                box.append(showHum);
                week.append(box);


            }

        })
}

var btnListClicked = function (id, input) {
    if (!input) location.replace('./index.html');
    var name = document.getElementById(`${id}`);
    name.addEventListener('click', function (event) {
        event.preventDefault();
        week.textContent = '';
        now.textContent = '';
        today(input);
        fiveCast(input);

    })

}

var buttonList = function (input) {
    var btnStorage = localStorage.getItem('city') || JSON.stringify({ buttons: [] });
    var prevBtn = JSON.parse(btnStorage);
    if (text.value !== '') prevBtn.buttons.push(text.value);
    localStorage.setItem('city', JSON.stringify(prevBtn));
    var btnCreate = document.createElement('button');
    btnCreate.setAttribute('id', `btn${count}`)
    btnCreate.setAttribute('class', `btn btn-primary`);
    btnCreate.textContent = input;

    btnList.append(btnCreate);

    btnListClicked(`btn${count}`, input);
    count++;
}

if (btnList.innerHTML === "") {
    var btnStorage = localStorage.getItem('city') || JSON.stringify({ buttons: [] });
    var prevBtnList = JSON.parse(localStorage.getItem('city'));
    if (prevBtnList !== null) {
        for (var list of prevBtnList.buttons) {

            buttonList(list);
        }
    }
}

btn.addEventListener('click', function (event) {
    event.preventDefault();
    if (!text.value) location.replace('./index.html');
    week.textContent = '';
    now.textContent = '';
    var cityInput = text.value

    today(cityInput);
    fiveCast(cityInput);
     buttonList(cityInput);
    text.value = "";
})
