const Twit = require('twit'); 
const Rita = require('rita'); 
const request = require('request'); 
const fs = require('fs'); 


config = require ("./config.js")

var T = new Twit (config);