async function reportWeatherData(city,units){

    let myKey = process.env.WEATHER_API_KEY;
    let requestCityLocation = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${myKey}`
    let cityLoc = await getData(requestCityLocation)
    let [lat,lon, state, country] = [cityLoc[0].lat, cityLoc[0].lon, cityLoc[0].state, cityLoc[0].country]
    let cities = require("./city.list.json")
    // .then(response => {
    //    return response.json();
    // })

    let filter = {
        "name": city,
        "country": country
      }
      if(filter.country === 'US'){filter.state === state}
      console.log('filter:', filter)
    let myCity = cities.filter(function(item) {
            if (item["name"] === filter["name"] && item["country"] === filter["country"] && ((item["state"] === filter["state"]) || (filter['state'] === undefined))){
                return true;
            }
            else {return false;}
        });
    
    console.log("my city: ", myCity)
    console.log("CityID: ", myCity[0].id)

    


    //console.log("lat: "+lat+" lon: "+lon)
    let requestCurrentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myKey}&units=${units}`;
    let requestWeekForecastURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,alerts&appid=${myKey}&units=${units}`;
    

    let [weatherToday, weekForecast] = await Promise.all([getData(requestCurrentWeatherURL),getData(requestWeekForecastURL)]);
    let weatherIconId = weatherToday.weather[0].icon
    console.log("Today's weather icon: ", weatherIconId)
    let weatherIconURL = `http://openweathermap.org/img/wn/${weatherIconId}@2x.png`

    createWidget(myCity[0],weatherToday.main.temp, weatherToday.main.temp_max, weatherToday.main.temp_min, weatherToday.weather[0].description, weatherIconURL, weekForecast.daily, units); 

}

async function getData(myURL){
    const response = await fetch(myURL, {mode: 'cors'});
    //console.log(response)
    const responseBody = await response.json();
    console.log(myURL)
    console.log(responseBody)
    return responseBody;
}

function createWidget(location, temp, tempMax, tempMin, weatherIconInfo, weatherIconURL, weekForecast, units){
    //top left
    console.log("Location:",location);
    const widgetLocation = document.getElementById("reportLocation");
    if(location.country ==='US'){
        widgetLocation.innerHTML = location.name + ", "+ location.state+ ", "+location.country;
    }
    else{
        widgetLocation.innerHTML = location.name + ", " + location.country;
    }
    const widgetTemp = document.getElementById("temperature");
    const widgetTempMax = document.getElementById("high-temp");
    const widgetTempMin = document.getElementById("low-temp");
    const widgetCelcius = document.getElementById("celcius");
    const widgetTempDivider = document.getElementById("temperature-divider");
    const widgetFahrenheit = document.getElementById("fahrenheit");

    widgetTemp.innerHTML = temp;
    widgetTempMax.innerHTML = `H: ${tempMax}&#176;`;
    widgetTempMin.innerHTML = `L: ${tempMin}&#176;`;
    widgetCelcius.hidden = false;
    widgetTempDivider.hidden = false;
    widgetFahrenheit.hidden = false;
    if(units == 'metric'){
        widgetCelcius.style.opacity = 1;
        widgetFahrenheit.style.opacity = 0.6;
    }
    else{
        widgetCelcius.style.opacity = 0.6;
        widgetFahrenheit.style.opacity = 1;
    }

    //top right
    const widgetWeatherHeader = document.getElementById("todayWeatherHeader");
    widgetWeatherHeader.hidden = false;
    const widgetWeatherIcon = document.getElementById("todayWeather");
    widgetWeatherIcon.src = weatherIconURL;
    const widgetWeatherIconInfo = document.getElementById("weather-current");
    widgetWeatherIconInfo.innerHTML = weatherIconInfo;

    //bottom
    var options = { weekday: 'long'};
    for(let i= 0; i < 7; i++){
        dailyIcon = weekForecast[i].weather[0].icon;
        myDay = new Date (weekForecast[i].dt * 1000);
        console.log(myDay)
        dailyTitle = new Intl.DateTimeFormat('en-US', options).format(myDay);
        console.log(dailyTitle.substring(0,3));
        dailyTemp = weekForecast[i].temp.day;
        
        let widgetDailyWeatherIcon = document.getElementById(`imgday${i}`);
        widgetDailyWeatherIcon.src = `http://openweathermap.org/img/wn/${dailyIcon}@2x.png`;
        let widgetDailyTitle = document.getElementById(`titleday${i}`);
        widgetDailyTitle.innerHTML = dailyTitle.substring(0,3);
        let widgetDailyTemp = document.getElementById(`textday${i}`);
        widgetDailyTemp.innerHTML = `${dailyTemp}&#176;`;

    }
    const weekForecastBox = document.getElementById("week-forecast-box");
    weekForecastBox.hidden = false;

}
async function init(){
    console.log("MY KEY :",process.env.WEATHER_API_KEY); // remove this after you've confirmed it working
    document.getElementById("searchBtn").addEventListener("click",function(){reportWeatherData(document.getElementById("inputCity").value,'metric')});
    document.getElementById("celcius").addEventListener("click",function(){reportWeatherData(document.getElementById("inputCity").value,'metric')});
    document.getElementById("fahrenheit").addEventListener("click",function(){reportWeatherData(document.getElementById("inputCity").value,'imperial')});
    
}

window.onload = init;
