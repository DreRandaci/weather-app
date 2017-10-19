'use strict';

const currentDayDomString = (weather) => {                   
    let str = '';
    str += `<div class="row">`;
    str += `<div class="col-md-12">`;
    str +=   `<div class="thumbnail">`;
    str +=     `<div class="caption">`;
    str +=       `<h3>${weather.city.name}</h3>`;
    str +=       `<p>${weather.city.country}</p>`;                        
    str +=       `<h5>Current Temperature: ${weather.list[0].main.temp}</h5>`;             
    str +=       `<h5>Conditions: ${weather.list[0].weather[0].description}</h5>`;                   
    str +=       `<h5>Air Pressure: ${weather.list[0].main.pressure}</h5>`;                              
    str +=       `<h5>Wind Speed: ${weather.list[0].wind.speed}mp/h</h5>`;                
    str +=       `<p><a href="#" id="threeDayBtn" class="btn btn-success" role="button">3 Day Forecast</a> <a href="#" id="fiveDayBtn" class="btn btn-success" role="button">5 Day Forecast</a></p>`;
    str +=     `</div>`;
    str +=   `</div>`;
    str += `</div>`;        
    str += `</div>`;    
    printToDom(str);
};

const extendedForecastDomString = (weather, hourlyForecasts, targetId) => {                 
    let str = '';
    if (targetId === 'threeDayBtn') {
        hourlyForecasts.forEach((wthr) => {
            wthr.forEach(( dt, i ) => {                
                if (i < 3) {
                    str += `<div class="row">`;
                    str += `<div class="col-sm-6 col-md-4">`;
                    str +=   `<div class="thumbnail">`;
                    str +=     `<div class="caption">`;
                    str +=       `<h3>${weather.city.name}</h3>`;
                    str +=       `<p>${weather.city.country}</p>`;                        
                    str +=       `<h5>Day: ${dt.dt_txt}</h5>`;                        
                    str +=       `<h5>Current Temperature: ${dt.main.temp}</h5>`;             
                    str +=       `<h5>Conditions: ${dt.weather[0].description}'s</h5>`;                   
                    str +=       `<h5>Air Pressure: ${dt.main.pressure}</h5>`;                              
                    str +=       `<h5>Wind Speed: ${dt.wind.speed}MP/H</h5>`;                
                    str +=       `<p><a href="#" id="fiveDayBtn" class="btn btn-success" role="button">5 Day Forecast</a></p>`;
                    str +=     `</div>`;
                    str +=   `</div>`;
                    str += `</div>`;
                } 
            });          
        });
    } else {
        hourlyForecasts.forEach((wthr) => {
            wthr.forEach(( dt, i ) => {                
                if (i < 5) {
                    str += `<div class="row">`;
                    str += `<div class="col-sm-6 col-md-4">`;
                    str +=   `<div class="thumbnail">`;
                    str +=     `<div class="caption">`;
                    str +=       `<h3>${weather.city.name}</h3>`;
                    str +=       `<p>${weather.city.country}</p>`;                        
                    str +=       `<h5>Day: ${dt.dt_txt}</h5>`;                        
                    str +=       `<h5>Current Temperature: ${dt.main.temp}</h5>`;             
                    str +=       `<h5>Conditions: ${dt.weather[0].description}'s</h5>`;                   
                    str +=       `<h5>Air Pressure: ${dt.main.pressure}</h5>`;                              
                    str +=       `<h5>Wind Speed: ${dt.wind.speed}MP/H</h5>`;                                    
                    str +=     `</div>`;
                    str +=   `</div>`;
                    str += `</div>`;
                } 
            });          
        });
    }        
    printToDom(str);
};

const clearDom = () => {
    $('#weather').empty();
};

const printToDom = (str) => {
    $('#weather').append(str);
};

module.exports = { clearDom, currentDayDomString, extendedForecastDomString };