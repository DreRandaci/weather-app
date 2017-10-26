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

const showInputAndMyWeather = () => {
    $('.inputContainer').removeClass('hidden');
    $("#authScreenContainer").remove();
    $('.navbar-fixed-top').removeClass('hidden');
};

const googleAuth = () => {
    $("#googleBtn").click( ( e ) => {
        firebaseApi.authenticateGoogle().then(( result ) => {
            console.log('results in googleAuth:', result);
            showInputAndMyWeather();
        }).catch(( error ) => {
            console.log('error in authenticateGoogle');
        });
    });
};

const saveForecastEvents = () => {
    $('body').on('click', '.saveForecastBtn', (e) => {
        if (e.target.classList.contains('currentForecastBtn')) {
            let parentContainer = e.target.closest('.row');
            console.log('parentContainer:', parentContainer);
            // let newForecast = {
            //     "title": $(parentContainer).find('.title').html(),
            //     "overview": $(parentContainer).find('.overview').html(),
            //     "poster_path": $(parentContainer).find('.poster_path').attr('src').split('/').pop(),
            //     "rating": 0,
            //     "isWatched": false,
            //     "uid": ""
            // };
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
        
        // firebaseApi.saveMovie(newMovie).then(() => {
        //     $(parentContainer).remove();
        // }).catch((err) => {
        //     console.log(err);
        // });
    });
};

const myLinks = () => {
    $('.navbar-fixed-top').click(( e ) => {
        if (e.target.id === 'weatherHome') {
            $('#searchContainer').addClass('hide');
            $('#myMoviesContainer').removeClass('hide');
            $('#authScreenContainer').addClass('hide'); 
            // getMahMovies();           
        } else if (e.target.id === 'myWeather') {            
            $('#searchContainer').addClass('hide');
            $('#myMoviesContainer').addClass('hide');
            $('#authScreenContainer').removeClass('hide');
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