'use strict';

const currentDayDomString = (weather) => {                   
    let str = '';
    str += `<div class="row">`;
    str +=      `<div class="col-md-12">`;
    str +=          `<div class="panel panel-default">`;
    str +=              `<div class="panel-heading"><h2>${weather.city.name}</h2><p>${weather.city.country}</p></div>`;
    str +=                  `<div class="panel-body panel-color">`;
    str +=                      `<div class="caption">`;  
                                if (weather.list[0].main.temp.toFixed() <= 75 && weather.list[0].main.temp.toFixed() > 45) {                      
    str +=                          `<h3>Current Temperature: <span class='temp-default'>${weather.list[0].main.temp.toFixed()}˚F</span></h3>`;             
                                } else if (weather.list[0].main.temp.toFixed() > 75) {
    str +=                          `<h3>Current Temperature: <span class='temp-high'>${weather.list[0].main.temp.toFixed()}˚F</span></h3>`;             
                                } else {
    str +=                          `<h3>Current Temperature: <span class='temp-low'>${weather.list[0].main.temp.toFixed()}˚F</span></h3>`;             
                                }                                                          
    str +=                           `<h4>H/L: ${weather.list[0].main.temp_max.toFixed()}˚/${weather.list[2].main.temp_min.toFixed()}˚</h4>`;                   
    str +=                           `<h4>Conditions: ${weather.list[0].weather[0].description}</h4>`;                   
    str +=                           `<h4>Air Pressure: ${weather.list[0].main.pressure}</h4>`;                              
    str +=                           `<h4>Wind Speed: ${weather.list[0].wind.speed}mp/h</h4>`;                
    str +=                           `<button type='button' id="threeDayBtn" class="btn btn-success" data-toggle="modal" data-target=".bs-example-modal-lg">3 Day Forecast</button> <button type='button' id="fiveDayBtn" class="btn btn-success" data-toggle="modal" data-target=".bs-example-modal-lg">5 Day Forecast</button>`;
    str +=                      `</div>`;
    str +=                  `</div>`;
    str +=              `</div>`;
    str +=          `</div>`;           
    str +=      `</div>`;
    str +=      `</div>`;
    printCurrentWthr(str);
};

const extendedForecastDomString = (weather, hourlyForecasts, targetId) => {                 
    let str = '';
    if (targetId === 'threeDayBtn') {        
        str +=     `<table class="table">`;
        str +=       `<tr>`;                        
        str +=       `<th>Date</th>`;    
        str +=       `<th>Temperature H/L</th>`;                                             
        str +=       `<th>Conditions</th>`;                   
        str +=       `<th>Air Pressure</th>`;
        str +=       `<th>Wind Speed MP/H</th>`;                                                  
        str +=       `</tr>`; 
        str +=       `<tr>`;        
        hourlyForecasts.forEach((wthr, ind) => {            
            wthr.forEach(( dt, i ) => {                
                if (i === 4 || i === 12 || i === 20) {                                                                                                                                                                                                            
                    str +=       `<td>${dt.dt_txt}</td>`;
                if (dt.main.temp.toFixed() <= 75 && dt.main.temp.toFixed() > 45) {                      
                    str +=       `<td><span class='temp-default'>${dt.main.temp_max.toFixed()}˚/${weather.list[i].main.temp_min.toFixed()}˚</span></td>`;             
                                } else if (dt.main.temp.toFixed() > 75) {
                    str +=       `<td><span class='temp-high'>${dt.main.temp_max.toFixed()}˚/${weather.list[i].main.temp_min.toFixed()}˚</span></td>`;             
                                } else {
                    str +=       `<td><span class='temp-low'>${weather.list[ind].main.temp_max.toFixed()}˚/${weather.list[i].main.temp_min.toFixed()}˚</span></td>`;             
                                }                        
                    str +=       `<td>${dt.weather[0].description}</td>`;                   
                    str +=       `<td>${dt.main.pressure}</td>`;                              
                    str +=       `<td>${dt.wind.speed}MP/H</td>`;                    
                    str +=       `</tr>`;                                                 
                } 
            });                               
        });
        str +=      `</table>`;        
    } else {
        str +=     `<table class="table">`; 
        hourlyForecasts.forEach((wthr) => {
            wthr.forEach(( dt, i ) => {                
                if (i === 4 || i === 12 || i === 20 || i === 28 || i === 36) {                                                                                                     
                    str +=       `<tr>`;                        
                    str +=       `<th>Date: ${dt.dt_txt}</th>`;  
                                if (dt.main.temp.toFixed() <= 75 && dt.main.temp.toFixed() > 45) {                      
                    str +=       `<td>Temperature: <span class='temp-default'>${dt.main.temp.toFixed()}˚F</span></td>`;             
                                } else if (dt.main.temp.toFixed() > 75) {
                    str +=       `<td>Temperature: <span class='temp-high'>${dt.main.temp.toFixed()}˚F</span></td>`;             
                                } else {
                    str +=       `<td>Temperature: <span class='temp-low'>${dt.main.temp.toFixed()}˚F</span></td>`;             
                                }
                    str +=       `<td>Conditions: ${dt.weather[0].description}</td>`;                   
                    str +=       `<td>Air Pressure: ${dt.main.pressure}</td>`;                              
                    str +=       `<td>Wind Speed: ${dt.wind.speed}MP/H</td>`;                    
                    str +=       `</tr>`;                    
                } 
            });          
        });
        str +=      `</table>`;
    }        
    printExtWthr(str);
};

const clearDom = () => {
    $('#weather').empty();
};

const printCurrentWthr = (str) => {
    $('#weather').append(str);
};

const clearExtDom = () => {
    $('#extendedForecast').empty();
};

const printExtWthr = (str) => {
    $('#extendedForecast').append(str);
};

module.exports = { clearDom, currentDayDomString, extendedForecastDomString, clearExtDom };