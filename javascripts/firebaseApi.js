'use strict';

let firebaseKey = '';
let userUid = '';

const setKey = ( key ) => {
    firebaseKey = key;
};

let authenticateGoogle = () => {
    return new Promise((resolve, reject) => {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider)
        .then((authData) => {
        	userUid = authData.user.uid;
            resolve(authData.user);
        }).catch((error) => {
            reject(error);
        });
    });
  };

const saveWeather = (newForecast) => {
    newForecast.uid = userUid;
    return new Promise((resolve, reject) => {
        $.ajax({
            method: "POST",
            url: `${firebaseKey.databaseURL}/weather.json`,
            data: JSON.stringify(newForecast)
        }).then((result) => {
            resolve(result);
        }).catch((err) => {
            reject(err);
        });
    });
};

const getWeatherList = () => {
    let weatherArray = [];
    return new Promise(( resolve, reject ) => {
        $.ajax(`${firebaseKey.databaseURL}/weather.json?orderBy="uid"&equalTo="${userUid}"`).then((fbWeather) => {
            if (fbWeather != null) {
            Object.keys(fbWeather).forEach(( key ) => {
                fbWeather[key].id = key;
                weatherArray.push(fbWeather[key]);
            });
        } 
            resolve(weatherArray);
            console.log('weatherArray:', weatherArray);
        }).catch(( err ) => {
            console.log('err in getWeatherList:', err);
        });
    });
};

module.exports = { setKey, authenticateGoogle, getWeatherList, saveWeather };