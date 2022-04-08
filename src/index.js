async function getWeatherData(city){
    console.log("Button was clicked")
    let myKey = process.env.WEATHER_API_KEY
    let requestURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myKey}`
    console.log("URL: ",requestURL)
    const response = await fetch(requestURL, {mode: 'cors'});
    console.log(response)
    const responseBody = await response.json();
    console.log(responseBody);
}



function init(){
    console.log("MY KEY :",process.env.WEATHER_API_KEY); // remove this after you've confirmed it working
    document.getElementById("searchBtn").addEventListener("click",function(){getWeatherData(document.getElementById("inputCity").value)});
}

window.onload = init;
