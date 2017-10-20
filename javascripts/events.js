'use strict';

const owm = require('./owm');
const dom = require('./dom');

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
        $('#invalidContainer').html(`<h5 class="text-danger">Please Enter A <strong>Valid</strong> Number<h5>`);    
    }
    parseInt(zip);
    if (zip.length === 5) {
        $('#invalidContainer').empty();
        dom.clearDom();
        dom.clearExtDom();
        owm.getConfigData(zip);
    } else {
        $('#invalidContainer').html(`<h5 class="text-danger">Please Enter A <strong>Valid</strong> Number<h5>`);    
    }                 
};

module.exports = { pressEnter, submitBtnClick, extendedForecastClick };