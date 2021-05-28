const MIN_AGE_LIMIT = 18  //This is configurable (Possible values are 18 or 45)
const PREFERRED_VACCINE = 'COVAXIN' //This is configurable (Possible values are COVAXIN or COVISHIELD or ANY)
const AVAILABLE_CAPACITY = 2 //Minimum capacity available
const DOSE = 1 //Indicates Dose 1 or 2
const INTERVAL = 10000 //Interval between each check in ms
const PINCODE = 560034 //PINCODE where the user lives

module.exports = {
    MIN_AGE_LIMIT : MIN_AGE_LIMIT,
    PREFERRED_VACCINE : PREFERRED_VACCINE,
    AVAILABLE_CAPACITY : AVAILABLE_CAPACITY,
    PINCODE : PINCODE,
    INTERVAL : INTERVAL,
    DOSE : DOSE
}