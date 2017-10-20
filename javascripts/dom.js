'use strict';

const currentDayDomString = (weather) => {                   
    let str = '';
    str += `<div class="row">`;
    str +=      `<div class="col-md-12">`;
    str +=          `<div class="panel panel-default">`;
    str +=              `<div class="panel-heading"><h3>${weather.city.name}</h3><p>${weather.city.country}</p></div>`;
    str +=                  `<div class="panel-body">`;
    str +=                      `<div class="caption">`;                                                            
    str +=                           `<h5>Current Temperature: ${weather.list[0].main.temp.toFixed()}˚F</h5>`;             
    str +=                           `<h5>Conditions: ${weather.list[0].weather[0].description}</h5>`;                   
    str +=                           `<h5>Air Pressure: ${weather.list[0].main.pressure}</h5>`;                              
    str +=                           `<h5>Wind Speed: ${weather.list[0].wind.speed}mp/h</h5>`;                
    str +=                           `<p><a href="#" id="threeDayBtn" class="btn btn-success" role="button">3 Day Forecast</a> <a href="#" id="fiveDayBtn" class="btn btn-success" role="button">5 Day Forecast</a></p>`;
    str +=                      `</div>`;
    str +=                  `</div>`;
    str +=              `</div>`;
    str +=          `<div id='extendedForecast'></div>`;         
    str +=          `</div>`;           
    str +=      `</div>`;
    str +=      `</div>`;
    printCurrentWthr(str);
};

const extendedForecastDomString = (weather, hourlyForecasts, targetId) => {                 
    let str = '';
    if (targetId === 'threeDayBtn') {
        hourlyForecasts.forEach((wthr) => {            
            wthr.forEach(( dt, i ) => {                
                if (i === 4 || i === 12 || i === 20) {                                                                                                      
                    str +=     `<table class="table">`;                                                              
                    str +=       `<tr>`;                        
                    str +=       `<th>Day: ${dt.dt_txt}</th>`;  
                                if (dt.main.temp.toFixed() <= 75) {                      
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
                    str +=      `</table>`;                             
                } 
            });                               
        });
    } else {
        str += `<div class="row">`;
        hourlyForecasts.forEach((wthr) => {
            wthr.forEach(( dt, i ) => {                
                if (i === 4 || i === 12 || i === 20 || i === 28 || i === 36) {                    
                    str += `<div class="col-sm-6 col-md-4">`;
                    str +=   `<div class="thumbnail">`;
                    str +=     `<div class="caption">`;                       
                    str +=       `<h5>Day: ${dt.dt_txt}</h5>`;                        
                    str +=       `<h5>Temperature: ${dt.main.temp.toFixed()}˚F</h5>`;             
                    str +=       `<h5>Conditions: ${dt.weather[0].description}</h5>`;                   
                    str +=       `<h5>Air Pressure: ${dt.main.pressure}</h5>`;                              
                    str +=       `<h5>Wind Speed: ${dt.wind.speed}MP/H</h5>`;                                    
                    str +=     `</div>`;
                    str +=   `</div>`;
                    str += `</div>`;
                } 
            });          
        });
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