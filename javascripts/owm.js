'use strict';

const dom = require('./dom');

let owmKey;
let currentZip;
let averageTemp;
let highTemp;
let lowTemp;
let conditionsDescription;
let airPressure;
let windSpeed;

const owmConfiguration = ( zip ) => {
    return new Promise(( resolve, reject ) => {
        $.ajax(`http://api.openweathermap.org/data/2.5/forecast?zip=${zip},us&APPID=${owmKey}&units=imperial`).done((data) => {
        resolve( data );
        currentZip = zip;        
        }).fail(( error ) => {
            reject( error );
        });
    });
};

const getConfigData = (zip) => {
    owmConfiguration(zip).then(( weather ) => {         
        showCurrentDayForecast(weather);
        // showCurrentDayForecast(results);
    }).catch(( error ) => {
        console.log('error in getConfig:', error );
    });
};

const setKey = ( apiKey ) => {
    owmKey = apiKey;        
};

const showCurrentDayForecast = (weather) => {
    let hourlyForecasts = [];
    hourlyForecasts.push(weather.list);
    dom.currentDayDomString(weather, hourlyForecasts);
    // dom.currentDayDomString(weather);
};

const showExtendedForecast = (targetId) => {
    owmConfiguration(currentZip).then(( weather ) => { 
        let hourlyForecasts = [];
        hourlyForecasts.push(weather.list);
        dom.extendedForecastDomString(weather, hourlyForecasts, targetId);
    }).catch(( error ) => {
        console.log('error in getConfig:', error );
    });
};

const showFiveDayForecast = () => {

};

module.exports = { setKey, getConfigData, showExtendedForecast, showFiveDayForecast };