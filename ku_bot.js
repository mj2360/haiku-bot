const Twit = require('twit'); 
const Rita = require('rita'); 
const request = require('request'); 
const fs = require('fs'); 


config = require ("./config.js")
rules = require("./rules.json");

var T = new Twit (config);

var grammar = Rita.grammar(rules); 
console.log(grammar.expand());

// var rules = {
//     start: "$subject $verb $object.",
//     subject: "I | You | They",
//     object:  "coffee | bread | milk", 
//     verb: "want | hate | like | love"
// }

