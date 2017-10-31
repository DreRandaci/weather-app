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
        dom.clearDom('weather');
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
            showInputAndNavbar();
        }).catch(( error ) => {
            console.log('error in authenticateGoogle');
        });
    });
};

const saveForecastEvents = () => {
    $('body').on('click', '.saveForecastBtn', (e) => {
        if (e.target.classList.contains('currentForecastBtn')) {
            let parent = e.target.closest('.row');
            let newForecast = {
                "cityName": $(parent).find('.city-name').html(),
                "time": $(parent).find('.time').html(),
                "currentTemp": $(parent).find('.current-temp').html().split(' ', 5).pop(),
                "conditions": $(parent).find('.conditions').html().split('<', 1).pop(),                
                "airPressure": $(parent).find('.air-pressure').html().split(' ', 5).pop(),               
                "windSpeed": $(parent).find('.wind-speed').html(),                
                "icon": $(parent).find('.icon-path').attr('src').split('/').pop(),
                "uid": ""                
            };
            firebaseApi.saveWeather(newForecast).then((result) => {
                $('.currentForecastBtn').addClass('disabled').html('Saved');
            }).catch((err) => {
                console.log('err in saveForecastEvents promise', err);
            });

            } else {
                let title = e.target.closest('.modal');                
                let parent = e.target.closest('tr');                
                let newForecast = {
                    "cityName": $(title).find('.city-name-span').html(),
                    "time": $(parent).find('.time').html(),
                    "currentTemp": $(parent).find('.current-temp').html(),
                    "conditions": $(parent).find('.conditions').html().split('<', 1).pop(),                
                    "airPressure": $(parent).find('.air-pressure').html().split(' ', 5).pop(),               
                    "windSpeed": $(parent).find('.wind-speed').html(),                
                    "icon": $(parent).find('.icon-path').attr('src').split('/').pop(),
                    "uid": ""                
                };               
                firebaseApi.saveWeather(newForecast).then((result) => {
                    $(e.target).addClass('disabled').html('Saved');
                    // $(parent).closest('tr').remove();
                }).catch((err) => {
                    console.log('err in saveForecastEvents promise', err);
                });
            }                        
    });
};

const getMyWeather = () => {
    firebaseApi.getWeatherList().then((savedWthr) => {
        dom.clearDom('savedWeather');
        dom.printSavedWthr( savedWthr );
    }).catch((err) => {
        console.log("error in getMovieList:", err);
    });
};

const myLinks = () => {
    $('.navbar-fixed-top').click(( e ) => {
        if (e.target.id === 'forecastHome') {
            $('#weather').removeClass('hide');
            $('#myWeatherHeaderHidden').addClass('hidden');
            $('#myWeatherHeader').removeClass('hidden');                      
            $('#savedWeather').addClass('hidden');
            $('.inputContainer').removeClass('hide');                      
        } else if (e.target.id === 'myWeather') {            
            $('#weather').addClass('hide');
            $('.inputContainer').addClass('hide');
            $('#myWeatherHeaderHidden').removeClass('hidden');
            $('#myWeatherHeader').addClass('hidden');
            $('#savedWeather').removeClass('hidden');
            getMyWeather(); 
        } 
    });
};

const deleteWeatherEvent = () => {
    $('body').on('click', '.delete', ( e ) => {
        let weatherId = $( e.target ).data( 'firebase-id' );
        firebaseApi.deleteWeather( weatherId ).then(( results ) => {
            getMyWeather();
        }).catch(( err ) => {
            console.log( 'error in deleteMovie:', err );
        });
    });
};

const init = () => {
    pressEnter();
    submitBtnClick();
    extendedForecastClick();
    googleAuth();
    saveForecastEvents();
    myLinks();
    deleteWeatherEvent();
};

module.exports = { init };