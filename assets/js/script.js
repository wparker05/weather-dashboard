var btn = document.querySelector('#submit-btn');
var text = document.querySelector('#text-input');
var now = document.querySelector('#todayWeather');
var week = document.querySelector('#weekWeather');

var uvIndex= function (lat, lon) {
    var uvUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=e19c35c86c9eaa0f15bd8bb58efaa58c`;

    fetch(uvUrl)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            var showIndex = document.createElement('p');
        
            showIndex.textContent = `UV Index: ${data.current.uvi}`;
            now.append(showIndex);
        })
}

var today  = function(city) {
var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=e19c35c86c9eaa0f15bd8bb58efaa58c`;

fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
       
        var cityName = document.createElement('h2');
        // var img = document.createElement('img');
        // var icon = data.weather[0].icon;
        // img.setAttribute('src',`http://openweathermap.org/img/wn/${icon}@2x.png`);
        cityName.textContent = `${data.name}`;
        var showTemp = document.createElement('p');
        showTemp.textContent = `Temp: ${parseInt(data.main.temp)} F`;
        var showHum = document.createElement('p');
        showHum.textContent = `Humidity: ${data.main.humidity}%`;
        var showWind = document.createElement('p');
        showWind.textContent = `Wind: ${data.wind.speed} MPH`;
        var lon =data.coord.lon;
        var lat = data.coord.lat;
        
        
       

        now.append(cityName);
        now.append(showTemp);
        now.append(showWind);
        now.append(showHum);
        uvIndex(lat,lon);
        now.style.display = "block";
    
    })
}

var fiveCast = function(city){
    var fiveDayUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=e19c35c86c9eaa0f15bd8bb58efaa58c`;

    fetch(fiveDayUrl)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            for(var i = 3; i < data.list.length; i+=8){
               var box = document.createElement('div');
               box.setAttribute('class', 'col-2 forecast bg-primary bg-graident');
               var dayTime = document.createElement('p');
               dayTime.textContent = data.list[i].dt_txt.replace('12:00:00','');
               var showTemp = document.createElement('p');
               showTemp.textContent = `Temp: ${parseInt(data.list[i].main.temp)} F`;
               var showHum = document.createElement('p');
               showHum.textContent = `Humidity: ${data.list[i].main.humidity}%`;
               var showWind = document.createElement('p');
               showWind.textContent = `Wind: ${data.list[i].wind.speed} MPH`;

               box.append(dayTime);
               box.append(showTemp);
               box.append(showWind);
               box.append(showHum);
                week.append(box);
                

            }
            
        })
}




btn.addEventListener('click', function(event){
    event.preventDefault();
    var cityInput = text.value

    today(cityInput);
    fiveCast(cityInput);
    
})