'use strict';

const owm = require('./owm');
const dom = require('./dom');
const firebaseApi = require('./firebaseApi');

const submitBtnClick = () => {
    $('#subBtn').click( (e) => {        
        let zip = $('#input').val();        
        validateZip(zip);        
    });
};

const pressEnter = () => {
    $(document).keypress( (e) => {
        if (e.key === "Enter") {
            let zip = $('#input').val();
            validateZip(zip);
        } 
    });
};

const extendedForecastClick = () => {
    $(document).click(( e ) => {
        if (e.target.id === 'threeDayBtn') {
            let targetId = e.target.id;   
            dom.clearExtDom();                     
            owm.showExtendedForecast(targetId);
        } else if (e.target.id === 'fiveDayBtn') {
            let targetId = e.target.id; 
            dom.clearExtDom();                        
            owm.showExtendedForecast(targetId);
        }
    });
};

const validateZip = (zip) => {
    if ( typeof zip === 'string' ) {
        $('#invalidContainer').html(`<h5 class="text-danger">Please Enter A Valid <strong>Number</strong><h5>`);    
    }
    parseInt(zip);
    if (zip.length === 5) {
        $('#invalidContainer').empty();
        dom.clearDom();
        dom.clearExtDom();       
        owm.getConfigData(zip);
    } else {
        $('#invalidContainer').html(`<h5 class="text-danger">Please Enter A Valid <strong>Number</strong><h5>`);
    }                 
};

const showInputAndNavbar = () => {
    $('.inputContainer').removeClass('hidden');
    $("#authScreenContainer").remove();
    $('.navbar-fixed-top').removeClass('hidden');
};

const googleAuth = () => {
    $("#googleBtn").click( ( e ) => {
        firebaseApi.authenticateGoogle().then(( result ) => {
            console.log('results in googleAuth:', result);
            showInputAndNavbar();
        }).catch(( error ) => {
            console.log('error in authenticateGoogle');
        });
    });
};

const saveForecastEvents = () => {
    $('body').on('click', '.saveForecastBtn', (e) => {
        if (e.target.classList.contains('currentForecastBtn')) {
            let parentContainer = e.target.closest('.row');
            // console.log('parentContainer:', parentContainer);
            let newForecast = {
                "cityName": $(parentContainer).find('.city-name').html(),
                "cityCountry": $(parentContainer).find('.city-country').html(),
                "currentTemp": $(parentContainer).find('.current-temp').html().split(' ', 5).pop(),
                "highLow": $(parentContainer).find('.high-low').html(),
                "conditions": $(parentContainer).find('.conditions').html().split('<', 1).pop(),                
                "airPressure": $(parentContainer).find('.air-pressure').html().split(' ', 5).pop(),               
                "windSpeed": $(parentContainer).find('.wind-speed').html(),                
                "icon": $(parentContainer).find('.icon-path').attr('src').split('/').pop(),
                "uid": ""                
            };
            firebaseApi.saveWeather(newForecast).then((result) => {
                console.log('result:', result);
                // $(parentContainer).remove();
            }).catch((err) => {
                console.log(err);
            });
            console.log('newForecast:', newForecast);
            } else {
                let parentTable = e.target.closest('.table');                
                console.log('parentTable:', parentTable);
                // let newForecast = {
                //     "title": $(parentTable).find('.title').html(),
                //     "overview": $(parentTable).find('.overview').html(),
                //     "poster_path": $(parentTable).find('.poster_path').attr('src').split('/').pop(),
                //     "rating": 0,
                //     "isWatched": false,
                //     "uid": ""
                // };
            }        
        
        // firebaseApi.saveMovie(newForecast).then(() => {
        //     $(parentContainer).remove();
        // }).catch((err) => {
        //     console.log(err);
        // });
    });
};

const getMyWeather = () => {
    firebaseApi.getWeatherList().then((results) => {
        console.log('results in getMyWeather:', results);
        // dom.clearDom('moviesMine');
        // dom.domString(results, tmdb.getImgConfig(), 'moviesMine', false);
    }).catch((err) => {
        console.log("error in getMovieList:", err);
    });
};

const myLinks = () => {
    $('.navbar-fixed-top').click(( e ) => {
        if (e.target.id === 'forecastHome') {
            $('#weatherAndInputField').removeClass('hide');
            $('#myWeatherHeaderHidden').addClass('hidden');
            $('#myWeatherHeader').removeClass('hidden');                      
        } else if (e.target.id === 'myWeather') {            
            $('#weatherAndInputField').addClass('hide');
            $('#myWeatherHeaderHidden').removeClass('hidden');
            $('#myWeatherHeader').addClass('hidden');
            getMyWeather(); 
        } 
    });
};

const init = () => {
    pressEnter();
    submitBtnClick();
    extendedForecastClick();
    googleAuth();
    saveForecastEvents();
    myLinks();
};

module.exports = { init };