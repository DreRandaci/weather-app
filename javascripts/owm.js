'use strict';

const dom = require('./dom');

let owmKey;
let currentZip;

const owmConfiguration = ( zip ) => {
    return new Promise(( resolve, reject ) => {
        $.ajax(`http://api.openweathermap.org/data/2.5/forecast?zip=${zip},us&APPID=${owmKey}&units=imperial`).done((data) => {
        resolve( data );
        console.log('data:', data);
        currentZip = zip;        
        }).fail(( error ) => {
            reject( error );
        });
    });
};

const getConfigData = (zip) => {
    owmConfiguration(zip).then(( weather ) => {         
        showCurrentDayForecast(weather);        
    }).catch(( error ) => {
        console.log('error in getConfigData:', error );
        $('#invalidContainer').html(`<h5 class="text-danger">Please Enter A Valid <strong>Zip Code</strong><h5>`);
    });
};

const setKey = ( apiKey ) => {
    owmKey = apiKey;        
};

const showCurrentDayForecast = (weather) => {
    dom.currentDayDomString(weather);
};

const showExtendedForecast = (targetId) => {    
    owmConfiguration(currentZip).then(( weather ) => { 
        let hourlyForecasts = [];
        hourlyForecasts.push(weather.list);        
        dom.extendedForecastDomString(weather, hourlyForecasts, targetId);
    }).catch(( error ) => {
        console.log('error in getConfig:', error );
        $('#invalidContainer').html(`<h5 class="text-danger"><strong>Error</strong> please try again<h5>`);
    });
};

module.exports = { setKey, getConfigData, showExtendedForecast };