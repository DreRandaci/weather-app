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

const showInputContainer = () => {
    $('.inputContainer').removeClass('hidden');
    $("#authScreenContainer").remove();
};

const googleAuth = () => {
    $("#googleBtn").click( ( e ) => {
        firebaseApi.authenticateGoogle().then(( result ) => {
            console.log('results in googleAuth:', result);
            showInputContainer();
        }).catch(( error ) => {
            console.log('error in authenticateGoogle');
        });
    });
};

const saveForecast = () => {
    $('body').on('click', '.saveForecastBtn', (e) => {
        if (e.target.classList.contains('currentForecastBtn')) {
            let parentContainer = e.target.closest('.row');
            console.log('parentContainer:', parentContainer);
        } else {
            let parentTable = e.target.closest('.table');                
            console.log('parentTable:', parentTable);
        }        
        // let newMovie = {
        //     "title": $(parentContainer).find('.title').html(),
        //     "overview": $(parentContainer).find('.overview').html(),
        //     "poster_path": $(parentContainer).find('.poster_path').attr('src').split('/').pop(),
        //     "rating": 0,
        //     "isWatched": false,
        //     "uid": ""
        // };
        // firebaseApi.saveMovie(newMovie).then(() => {
        //     $(parentContainer).remove();
        // }).catch((err) => {
        //     console.log(err);
        // });
    });
};

const init = () => {
    pressEnter();
    submitBtnClick();
    extendedForecastClick();
    googleAuth();
    saveForecast();
};

module.exports = { init };