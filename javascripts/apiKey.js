'use strict';

const owm = require('./owm');

const apiKey = () => {
    return new Promise((resolve, reject) => {
        $.ajax('./db/apiKey.json').done((data) => {
            resolve(data.apiKey.owm.apiKey);
        }).fail((error) => {
            reject(error);
        });
    });
};

const retrieveKey = () => {
    apiKey().then((results) => {
        owm.setKey(results);
    }).catch((error) => {
        console.log('error in retrieve:', error);
    });
};

module.exports = { retrieveKey };