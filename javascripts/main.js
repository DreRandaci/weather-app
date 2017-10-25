'use strict';

const apiKey = require('./apiKey');
const events = require('./events');

$(document).ready(function(){
    apiKey.retrieveKey();
    events.init();    
});