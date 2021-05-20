const request = require('request');
const rechecker = require('./recheck');
const colors = require('colors');
const notifier = require('node-notifier');
const constants = require('./constants');



 module.exports.GetCowinStatus = function(){
     let todaysDate = new Date();
     let thisMonth = todaysDate.getMonth() + 1
     if (thisMonth < 10) {
         thisMonth = `0${thisMonth}`
     }
     let today = `${todaysDate.getDate()}-${thisMonth}-${todaysDate.getFullYear()}`
     request(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${constants.PINCODE}&date=${today}`, function (error, response, body) {
      if(error) {
        console.log("error occured!".red)
        throw error
      }
      if(response && response.statusCode == 200) {
        checkAvailableCenters(JSON.parse(body))
      }else if(response.statusCode != 200) {
          console.log(`${response.statusCode} retrying`)
          rechecker.reCheckAvailability()
      }
    });
}
 
 


function checkAvailableCenters(response) {
    for(let i = 0; i < response.centers.length; i++) {
        for(let j = 0; j < response.centers[i].sessions.length;j++) {
            if (isVaccineAvailableForAgeLimit(response.centers[i].sessions[j]) && isPreferredVaccineAvailable(response.centers[i].sessions[j]) && isMinDoseAvailable(response.centers[i].sessions[j])) {
                notifier.notify({
                    title: `${response.centers[i].sessions[j].date} Vaccine slots available, Book now - `,
                    message: `${response.centers[i].sessions[j].available_capacity_dose1} Doses available on ${response.centers[i].sessions[j].date} at ${response.centers[i].name}, ${response.centers[i].address} , ${response.centers[i].block_name}`,
                    subtitle: `Slots - ${response.centers[i].sessions[j].slots}`,
                    sound:true,
                    open:'https://selfregistration.cowin.gov.in/'
                });
                console.log(`${response.centers[i].sessions[j].date} Vaccine slot available, book fast - `.green.bold)
                console.log(`${response.centers[i].sessions[j].available_capacity_dose1} Doses available on ${response.centers[i].sessions[j].date} at ${response.centers[i].name}, ${response.centers[i].address} , ${response.centers[i].block_name}`.yellow.bold)
                console.log(`Slots - ${response.centers[i].sessions[j].slots}`.blue.bold)
            }
        }
    }
    console.log(`${new Date()} No doses found!`.red)
    rechecker.reCheckAvailability()
}

function isVaccineAvailableForAgeLimit(vaccineDetails) {
    if(vaccineDetails.available_capacity >= constants.AVAILABLE_CAPACITY) {
        return true
    }
    return false
}

function isPreferredVaccineAvailable(vaccineDetails) {
    if (constants.PREFFERED_VACCINE == 'ANY') {
        return true
    }
    if(vaccineDetails.vaccine == constants.PREFFERED_VACCINE) {
        return true
    }
    return false
}

function isMinDoseAvailable(vaccineDetails) {
  if(vaccineDetails.available_capacity >= constants.AVAILABLE_CAPACITY) {
    return true
  }
  return false
}

