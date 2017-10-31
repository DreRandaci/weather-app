'use strict';

const moment = require('../lib/node_modules/moment/moment');

const currentDayDomString = ( weather ) => {                  
    let str = '';
    str += `<div class="row">`;
    str +=      `<div class="col-md-6 col-md-offset-3">`;
    str +=          `<div class="box panel panel-default animated fadeIn">`;    
    str +=              `<div class="panel-heading"><h2 class='city-name'>${weather.city.name}</h2><p class='time'>${moment().format('LL')}</p></div>`;    
    str +=                  `<div class="panel-body panel-color">`;
    str +=                      `<div class="caption">`;  
                                if (weather.list[0].main.temp.toFixed() <= 75 && weather.list[0].main.temp.toFixed() > 50) {                      
    str +=                          `<h3 class='current-temp'>Current Temperature: <span class='temp-default'> ${weather.list[0].main.temp.toFixed()}˚F </span></h3>`;             
                                } else if (weather.list[0].main.temp.toFixed() > 75) {
    str +=                          `<h3 class='current-temp'>Current Temperature: <span class='temp-high'> ${weather.list[0].main.temp.toFixed()}˚F </span></h3>`;             
                                } else {
    str +=                          `<h3 class='current-temp'>Current Temperature: <span class='temp-low'> ${weather.list[0].main.temp.toFixed()}˚F </span></h3>`;             
                                }                                                          
    str +=                           `<p class='high-low'>H/L: ${weather.list[0].main.temp_max.toFixed()}˚/${weather.list[2].main.temp_min.toFixed()}˚</p>`;                   
    str +=                           `<h4 class='conditions'>Conditions: ${weather.list[0].weather[0].description}<img class='icon-path' src='http://openweathermap.org/img/w/${weather.list[0].weather[0].icon}.png'></h4>`;                   
    str +=                           `<h4 class='air-pressure'>Air Pressure: ${weather.list[0].main.pressure}</h4>`;                              
    str +=                           `<h4 class='wind-speed'>Wind Speed: ${weather.list[0].wind.speed}mp/h</h4>`;                
    str +=                           `<button type='button' id="threeDayBtn" class="btn btn-warning" data-toggle="modal" data-target=".bs-example-modal-lg">3 Day Forecast</button> <button type='button' id="fiveDayBtn" class="btn btn-warning" data-toggle="modal" data-target=".bs-example-modal-lg">5 Day Forecast</button> <button type='button' class='saveForecastBtn currentForecastBtn btn btn-default'>Save Forecast</button> `;
    str +=                           `<div class='padding'><a class="btn btn-social-icon btn-twitter"><span class="fa fa-twitter"></span></a> <a class="btn btn-social-icon btn-facebook"><span class="fa fa-facebook"></span></a></div>`;
    str +=                      `</div>`;
    str +=                  `</div>`;
    str +=              `</div>`;
    str +=          `</div>`;           
    str +=      `</div>`;
    str +=      `</div>`;
    printCurrentWthr(str, 'weather');
};

const printSavedWthr = ( savedWthr ) => {
    let str = '';
    str += `<div class="row">`;
    savedWthr.forEach(( myWeather, i) => {   
        str +=      `<div class="col-md-4">`;
        str +=          `<div class="box thumbnail animated fadeIn panel-color">`;    
        str +=              `<div class="caption fixed">`; 
        str +=                          `<h2 class='city-name'>${myWeather.cityName}</h2>`;
        str +=                          `<p class='time'>${myWeather.time}</p>`;
                                    if (parseInt(myWeather.currentTemp) <= 75 && parseInt(myWeather.currentTemp) > 50) {                      
        str +=                          `<h3 class='current-temp'>High: <span class='temp-default'> ${myWeather.currentTemp} </span></h3>`;             
                                    } else if (parseInt(myWeather.currentTemp) > 75) {
        str +=                          `<h3 class='current-temp'>High: <span class='temp-high'> ${myWeather.currentTemp} </span></h3>`;             
                                    } else {
        str +=                          `<h3 class='current-temp'>High: <span class='temp-low'> ${myWeather.currentTemp} </span></h3>`;             
                                    }                                                          
        str +=                           `<h4 class='conditions'>Conditions: ${myWeather.conditions}<img class='icon-path' src='http://openweathermap.org/img/w/${myWeather.icon}'></h4>`;                   
        str +=                           `<h4 class='air-pressure'>Air Pressure: ${myWeather.airPressure}</h4>`;                              
        str +=                           `<h4 class='wind-speed'>Wind Speed: ${myWeather.windSpeed}mp/h</h4>`;                
        str +=                           `<div class='delete-margin'><button type='button' class="btn btn-warning delete" data-firebase-id='${savedWthr[i].id}'>Delete</button></div>`;
        str +=                           `<div class='social-padding'><a class="btn btn-social-icon btn-twitter"><span class="fa fa-twitter"></span></a> <a class="btn btn-social-icon btn-facebook"><span class="fa fa-facebook"></span></a></div>`;
        str +=                      `</div>`;
        str +=                  `</div>`;
        str +=              `</div>`;           
    });
    str +=          `</div>`;
    printCurrentWthr(str, 'savedWeather');
};

const extendedForecastDomString = ( weather, hourlyForecasts, targetId ) => {                 
    let str = '';
    let count = 1;
    if ( targetId === 'threeDayBtn' ) { 
        $('.forecastTitle').html(`3 Day Forecast for <span class='city-name-span'>${weather.city.name}</span>`);
        str +=     `<table class="table">`;
        str +=       `<tr>`;                        
        str +=       `<th>Date</th>`;    
        str +=       `<th>High</th>`;                                             
        str +=       `<th>Conditions</th>`;                   
        str +=       `<th>Air Pressure</th>`;
        str +=       `<th>Wind Speed MP/H</th>`;                                                  
        str +=       `<th>My Weather</th>`;                                                  
        str +=       `<th>Share</th>`;                                                  
        str +=       `</tr>`; 
        str +=       `<tr>`;        
        hourlyForecasts.forEach(( wthr, ind ) => {            
            wthr.forEach(( dt, i ) => {                
                if (i === 4 || i === 12 || i === 20) {                                                                                                                                                                                                            
                    str +=       `<td class='time'>${moment().add(count++, 'day').format('LL')}</td>`;     
                    if (dt.main.temp_max.toFixed() <= 75 && dt.main.temp_max.toFixed() > 50) {                      
                    str +=       `<td><span class='current-temp temp-default'>${dt.main.temp_max.toFixed()}˚</span></td>`; 
                    } else if (dt.main.temp_max.toFixed() > 75) {  
                        str +=       `<td><span class='current-temp temp-high'>${dt.main.temp_max.toFixed()}˚</span></td>`; 
                    } else {
                        str +=       `<td><span class='current-temp temp-low'>${dt.main.temp_max.toFixed()}˚</span></td>`; 
                    }                          
                    str +=       `<td class='conditions'>${dt.weather[0].description}<img class='icon-path' src='http://openweathermap.org/img/w/${dt.weather[0].icon}.png'></td>`;                   
                    str +=       `<td class='air-pressure'>${dt.main.pressure}</td>`;                              
                    str +=       `<td class='wind-speed'>${dt.wind.speed}MP/H</td>`;                    
                    str +=       `<td><button type='button' class='saveForecastBtn extndForecastBtn btn btn-default btn-sm'>Save</button></td>`;                    
                    str +=       `<td><a class="btn btn-social-icon btn-twitter"><span class="fa fa-twitter"></span></a> <a class="btn btn-social-icon btn-facebook"><span class="fa fa-facebook"></span></a></td>`;                    
                    str +=       `</tr>`;                                                 
                } 
            });                               
        });
        str +=      `</table>`;        
    } else {
        $('.forecastTitle').html(`5 Day Forecast for <span class='city-name-span'>${weather.city.name}</span>`);
        str +=     `<table class="table">`; 
        str +=       `<tr>`;                        
        str +=       `<th>Date</th>`;    
        str +=       `<th>High</th>`;                                             
        str +=       `<th>Conditions</th>`;                   
        str +=       `<th>Air Pressure</th>`;
        str +=       `<th>Wind Speed MP/H</th>`;
        str +=       `<th>My Weather</th>`;                                                  
        str +=       `<th>Share</th>`;                                                                                                    
        str +=       `</tr>`; 
        str +=       `<tr>`;   
        hourlyForecasts.forEach(( wthr, ind ) => {
            wthr.forEach(( dt, i ) => {                
                if (i === 4 || i === 12 || i === 20 || i === 28 || i === 36) {                                                                                                     
                    str +=       `<td class='time'>${moment().add(count++, 'day').format('LL')}</td>`;     
                    if (dt.main.temp_max.toFixed() <= 75 && dt.main.temp_max.toFixed() > 50) {                      
                        str +=       `<td><span class='current-temp temp-default'>${dt.main.temp_max.toFixed()}˚</span></td>`; 
                        } else if (dt.main.temp_max.toFixed() > 75) {  
                            str +=       `<td><span class='current-temp temp-high'>${dt.main.temp_max.toFixed()}˚</span></td>`; 
                        } else {
                            str +=       `<td><span class='current-temp temp-low'>${dt.main.temp_max.toFixed()}˚</span></td>`; 
                        }                           
                    str +=       `<td class='conditions'>${dt.weather[0].description}<img class='icon-path' src='http://openweathermap.org/img/w/${dt.weather[0].icon}.png'></td>`;                   
                    str +=       `<td class='air-pressure'>${dt.main.pressure}</td>`;                              
                    str +=       `<td class='wind-speed'>${dt.wind.speed}MP/H</td>`;                    
                    str +=       `<td><button type='button' class='saveForecastBtn extndForecastBtn btn btn-default btn-sm'>Save</button></td>`;                    
                    str +=       `<td><a class="btn btn-social-icon btn-twitter"><span class="fa fa-twitter"></span></a> <a class="btn btn-social-icon btn-facebook"><span class="fa fa-facebook"></span></a></td>`;                    
                    str +=       `</tr>`;                
                } 
            });          
        });
        str +=      `</table>`;
    }        
    printExtWthr(str);
};

const clearDom = (div) => {
    $(`#${div}`).empty();
};

const printCurrentWthr = (str, div) => {
    $(`#${div}`).html(str);
};

const clearExtDom = () => {
    $('#extendedForecast').empty();
};

const printExtWthr = (str) => {
    $('#extendedForecast').append(str);
};

module.exports = { clearDom, currentDayDomString, extendedForecastDomString, clearExtDom, printSavedWthr };