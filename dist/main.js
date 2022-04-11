/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("async function reportWeatherData(city){\n    console.log(\"Button was clicked\");\n    let myKey = \"cd12a942ed068de6131a2a564cc7f235\";\n    let requestCityLocation = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${myKey}`\n    let cityLoc = await getData(requestCityLocation)\n    let [lat,lon] = [cityLoc[0].lat, cityLoc[0].lon]\n    console.log(\"lat: \"+lat+\" lon: \"+lon)\n    let requestCurrentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myKey}`;\n    let requestWeekForecastURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,alerts&appid=${myKey}`;\n\n    let [weatherToday, weekForecast] = await Promise.all([getData(requestCurrentWeatherURL),getData(requestWeekForecastURL)]);\n    console.log(weatherToday);\n    console.log(weekForecast);\n}\n\nasync function getData(myURL){\n    const response = await fetch(myURL, {mode: 'cors'});\n    //console.log(response)\n    const responseBody = await response.json();\n    console.log(myURL)\n    console.log(responseBody)\n    return responseBody;\n}\n\nfunction init(){\n    console.log(\"MY KEY :\",\"cd12a942ed068de6131a2a564cc7f235\"); // remove this after you've confirmed it working\n    document.getElementById(\"searchBtn\").addEventListener(\"click\",function(){reportWeatherData(document.getElementById(\"inputCity\").value)});\n}\n\nwindow.onload = init;\n\n\n//# sourceURL=webpack://odin-project-weatherapp/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;