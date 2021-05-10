const Rita = require('rita'); 
const wordData = require('./words.json');
const request = require('request'); 
const fs = require('fs'); 
const Twit = require('twit'); 

config = require("./config.js"); 
var T = new Twit (config); 
var tweet; 

//options object for Rita.conjugate
opts = {
    tense: Rita.PRESENT,
    number: Rita.SINGULAR,
    person: Rita.THIRD
};

opts2 = {
  form: Rita.GERUND

};

opts3 = {
    form: Rita.INFINITIVE
  
  };


//word variables 
var randNoun1 = wordData.noun_syll[1][Math.floor(Math.random() * wordData.noun_syll[1].length)];
var randNoun2 = wordData.noun_syll[2][Math.floor(Math.random() * wordData.noun_syll[2].length)];
var randNoun3 = wordData.noun_syll[3][Math.floor(Math.random() * wordData.noun_syll[3].length)]; 
var randNoun4 = wordData.noun_syll[4][Math.floor(Math.random() * wordData.noun_syll[1].length)];

var randVerb1 = wordData.verb_syll[1][Math.floor(Math.random() * wordData.verb_syll[1].length)]; 
var randVerb2 = wordData.verb_syll[2][Math.floor(Math.random() * wordData.verb_syll[2].length)];
var randVerb3 = wordData.verb_syll[3][Math.floor(Math.random() * wordData.verb_syll[3].length)]; 
var randVerb4 = wordData.verb_syll[4][Math.floor(Math.random() * wordData.verb_syll[4].length)]; 

var lines = [["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["","",""]];
var i = 0; 

//used in T.post to capitalize nouns and verbs
const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}


tweetBot();

//tweets every 3 minutes
setInterval(tweetBot, 60*3*1000);

function tweetBot(err, data, rspns){

    lines[0][0] = "Against an " + randNoun2; 
    lines[0][1] = "I allow " + randNoun1 + " to " + randVerb2; 
    lines[0][2] = "Altering " + Rita.pluralize(randNoun2);
    
    lines[1][0] = "An " + randNoun4;
    lines[1][1] = Rita.conjugate(capitalize(randVerb2), opts) + " another " +  randNoun2;
    lines[1][2] = "All for " + randNoun3;

    lines[2][0] = "About to " + randVerb2; 
    lines[2][1] = capitalize(randNoun4) + " is also ";
    lines[2][2] = Rita.conjugate(capitalize(randVerb2), opts2) + " " + randNoun1;

    lines[3][0] = Rita.conjugate(capitalize(randVerb4), opts3); 
    lines[3][1] = "And " + randVerb1 + " adds " + randNoun3;
    lines[3][2] =  "So " + Rita.conjugate(capitalize(wordData.verb_syll[4][Math.floor(Math.random() * wordData.verb_syll[4].length)]), opts3);

    
    lines[4][0] = "Although " + randNoun1 + Rita.conjugate(capitalize(randVerb2), opts2); 
    lines[4][1] = randNoun1 + " also " + randVerb4;
    lines[4][2] =  "As to " + randNoun3;


    T.post('statuses/update', {status: lines[i][0] + " / " + lines[i][1] + " / " + lines[i][2]}, tweeted);
   
    if(i == 4){
        i = 0; 
    } else{
        i++; 
    }
   

    function tweeted(err, data, rspns){
        if(err){
        console.log(err);
        } else {
        console.log("You're doing great! " + data.text);
        }
    }

}








