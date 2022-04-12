async function reportWeatherData(city){

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
    let requestCurrentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myKey}`;
    let requestWeekForecastURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,alerts&appid=${myKey}`;
    

    let [weatherToday, weekForecast] = await Promise.all([getData(requestCurrentWeatherURL),getData(requestWeekForecastURL)]);
    let weatherIconId = weatherToday.weather[0].icon
    console.log("Today's weather icon: ", weatherIconId)
    let weatherIconURL = `http://openweathermap.org/img/wn/${weatherIconId}@2x.png`
    createWidget(myCity[0],weatherIconURL); 

}

// async function createWidget(cityid,myKey){
//     let script = document.createElement('script');
//     script.innerHTML = `
//     window.myWidgetParam ? window.myWidgetParam : window.myWidgetParam = [];
//     window.myWidgetParam.push({id: 15,cityid: ${cityid} ,appid: '${myKey}',units: 'imperial',containerid: 'openweathermap-widget-15'});
//     (function() {var script = document.createElement('script');script.async = true;script.charset = "utf-8";script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
//     var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(script, s);  })();`;
//     document.head.appendChild(script);
//     return console.log("widget created")
// }

async function getData(myURL){
    const response = await fetch(myURL, {mode: 'cors'});
    //console.log(response)
    const responseBody = await response.json();
    console.log(myURL)
    console.log(responseBody)
    return responseBody;
}

function createWidget(location,weatherIconURL){
    //top left
    console.log("Location:",location);
    const widgetLocation = document.getElementById("reportLocation");
    if(location.country ==='US'){
        widgetLocation.innerHTML = location.name + ", "+ location.state+ ", "+location.country;
    }
    else{
        widgetLocation.innerHTML = location.name + ", " + location.country;
    }

    //top right
    const todayWeatherIcon = document.getElementById("todayWeather");
    todayWeatherIcon.src = weatherIconURL;
}
async function init(){
    console.log("MY KEY :",process.env.WEATHER_API_KEY); // remove this after you've confirmed it working
    document.getElementById("searchBtn").addEventListener("click",function(){reportWeatherData(document.getElementById("inputCity").value)});
    
}

window.onload = init;
