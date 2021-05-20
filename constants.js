const MIN_AGE_LIMIT = 45  //This is configurable (Possible values are 18 or 45)
const PREFERRED_VACCINE = 'ANY' //This is configurable (Possible values are COVAXIN or COVISHIELD or ANY)
const AVAILABLE_CAPACITY = 1 //Configurable value determines when the alert will be triggered
const INTERVAL = 10000 //Interval between each check in ms
const PINCODE = 600056 //PINCODE where the user lives

module.exports = {
    MIN_AGE_LIMIT : MIN_AGE_LIMIT,
    PREFERRED_VACCINE : PREFERRED_VACCINE,
    AVAILABLE_CAPACITY : AVAILABLE_CAPACITY,
    PINCODE : PINCODE,
    INTERVAL : INTERVAL,
}