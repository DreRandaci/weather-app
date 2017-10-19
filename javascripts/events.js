'use strict';

const owm = require('./owm');
const dom = require('./dom');

const submitBtnClick = () => {
    $('#subBtn').click( (e) => {        
        let val = $('#input').val();
        validateZipLength(val);        
    });
};

const pressEnter = () => {
    $(document).keypress( (e) => {
        if (e.key === "Enter") {
            let zip = $('#input').val();
            validateZipLength(zip);
        } 
    });
};

const extendedForecastClick = () => {
    $(document).click(( e ) => {
        if (e.target.id === 'threeDayBtn') {
            let targetId = e.target.id;            
            owm.showExtendedForecast(targetId);
        } else if (e.target.id === 'fiveDayBtn') {
            let targetId = e.target.id;            
            owm.showExtendedForecast(targetId);
        }
    });
};

const validateZipLength = (zip) => {
    if (zip.length === 5) {
        dom.clearDom();
        owm.getConfigData(zip);
    } else {
        //enter a valid zip code        
        console.log('enter a valid zip');
    }                 
};

module.exports = { pressEnter, submitBtnClick, extendedForecastClick };