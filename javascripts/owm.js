'use strict';

let owmKey;

const tmdbConfiguration = () => {
    return new Promise((resolve, reject) => {
        $.ajax(`http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=${owmKey}`).done((data) => {
        resolve(data);
        console.log('data', data);
        }).fail((error) => {
            reject(error);
        });
    });
};

const setKey = (apiKey) => {
    owmKey = apiKey;
    tmdbConfiguration();
    // getConfig();
};

module.exports = { setKey };