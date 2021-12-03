var btn = document.querySelector('#submit-btn');
var text = document.querySelector('#text-input').value;
var url = 'https://api.openweathermap.org/data/2.5/weather?q=charlotte&units=imperial&appid=e19c35c86c9eaa0f15bd8bb58efaa58c';


/// today forest
fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data)
    })


/// five day forest





///uv forest for today
var uvUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=35.2271&lon=-80.8431&units=imperial&appid=e19c35c86c9eaa0f15bd8bb58efaa58c';

fetch(uvUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data)
    })