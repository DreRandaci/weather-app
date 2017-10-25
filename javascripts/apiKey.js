'use strict';

const owm = require('./owm');
const firebaseApi = require('./firebaseApi');

const apiKey = () => {
    return new Promise((resolve, reject) => {
        $.ajax('./db/apiKey.json').done((data) => {
            resolve(data.apiKey);
        }).fail((error) => {
            reject(error);
        });
    });
};

const retrieveKey = () => {
    apiKey().then((results) => {
        owm.setKey(results.owm.apiKey);
        firebaseApi.setKey(results.firebaseKeys);
        firebase.initializeApp(results.firebaseKeys);
    }).catch((error) => {
        console.log('error in retrieve:', error);
    });
};

module.exports = { retrieveKey };