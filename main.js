var express = require('express');
var app = express();
const poller = require('./poll');
const constants = require('./constants');

console.log("Vaccination Alert Utility Started!")

setTimeout(() => {
  poller.GetCowinStatus()
}, constants.INTERVAL);