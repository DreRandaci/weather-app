'use strict';

const submitButtonEvent = () => {
    $('#subBtn').click( (e) => {        
        let val = $('#input').val();
        validateZipLength(val);        
    });
};

const pressEnter = () => {
    $(document).keypress( (e) => {
        if (e.key === "Enter") {
            let val = $('#input').val();
            validateZipLength(val);
        } 
    });
};

const validateZipLength = (val) => {
    if (val.length === 5) {
        
    } else {
        
    }                 
};

module.exports = {pressEnter, submitButtonEvent};