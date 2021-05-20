const poller = require('./poll');
const constants = require('./constants');



module.exports.reCheckAvailability= function() {
    setTimeout(function(){ 
        poller.GetCowinStatus()
      }, constants.INTERVAL);
}