async function reportWeatherData(city){
    console.log("Button was clicked");
    let myKey = process.env.WEATHER_API_KEY;
    let requestCityLocation = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${myKey}`
    let cityLoc = await getData(requestCityLocation)
    let [lat,lon] = [cityLoc[0].lat, cityLoc[0].lon]
    console.log("lat: "+lat+" lon: "+lon)
    let requestCurrentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myKey}`;
    let requestWeekForecastURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,alerts&appid=${myKey}`;

    let [weatherToday, weekForecast] = await Promise.all([getData(requestCurrentWeatherURL),getData(requestWeekForecastURL)]);
    console.log(weatherToday);
    console.log(weekForecast);
}

async function getData(myURL){
    const response = await fetch(myURL, {mode: 'cors'});
    //console.log(response)
    const responseBody = await response.json();
    console.log(myURL)
    console.log(responseBody)
    return responseBody;
}

function init(){
    console.log("MY KEY :",process.env.WEATHER_API_KEY); // remove this after you've confirmed it working
    document.getElementById("searchBtn").addEventListener("click",function(){reportWeatherData(document.getElementById("inputCity").value)});
}

window.onload = init;
