const Twit = require('twit'); 
const Rita = require('rita'); 
const request = require('request'); 
const fs = require('fs'); 


config = require ("./config.js")
//creating JSON file for RiGrammar rules
rules = require("./rules.json");

var T = new Twit (config);

var page = "1"; 
var verbData; 
var verbs = []; 
var aVerb = "";
var verb_syll = {}; 
var syllablesCount; 

//searching for words in API that match POS parameter
//returns all the verbs
for (page = 1; page<2; page++){
    const options = {
        method: 'GET',
        url: 'https://wordsapiv1.p.rapidapi.com/words/?partOfSpeech=verb&page='+ page,
        headers: {
        'x-rapidapi-key': '1b9f2f48cbmshb62ef031fcc8cddp1d8730jsn583bd0a50f4b',
        'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
        useQueryString: true
        }
    };
    
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        verbData  = JSON.parse(body);
        //  console.log(verbData); 
    

        //pushing word data into verbs array 
        for(i=0; i<verbData.results.data.length; i++) {
            verbs.push(verbData.results.data[i]); 
            
        } 



        //for each word in the verbs array pass it through Rita.analyze to get the syllable count for each word
        for(w=0; w<verbs.length; w++){
            aVerb = verbs[w]; 
           
            var features = Rita.analyze(aVerb);
            // Just look at the syllables
            var syllables = features.syllables;
            // What's the count of syllables based on the slashes
            syllablesCount = syllables.split(/\//).length;

            //Verbs by Syllable Object 
            //key = syllablecount 
            //value = [v,v,v,...]
            verb_syll ={
                1: [], 
                2: [], 
                3: ['airbrush'], 
                4: []
            }
            //pushing word to verb_syll Object based on syllable count
                //Needs Fixing: only adds the last word from aVerb array
            if(syllablesCount in verb_syll){
                verb_syll[syllablesCount].push(verbs[w]);
            }
        }
        console.log(verb_syll);
    });
}




var noun_syll = {
    1: ['spring', 'fall', 'death', 'trees', 'wind', 'leaves', 'leaf', 'sprout', 'time', 'cave', 'pine', 'oak', 'rot', 'earth', 'eye', 'grief', 'light', 'hell', 'cliff', 'hill', 'will', 'bird'], 
    2: ['autumn', 'summer', 'winter', 'texture', 'newborn', 'repose', 'flower', 'petal', 'sunlight', 'moonlight', 'moonbeam', 'night sky', 'human', 'spiral', 'planet', 'orbit', 'feline', 'body', 'lion', 'tiger', 'beauty', 'darkness', 'shadow', 'lightness', 'goddess'], 
    3: ['mystery', 'harmony', 'memory', 'masculine', 'feminine', 'melody', 'existence', 'universe', 'infinte', 'violence', 'medicine', 'paradise', 'dopamine', 'innocence'], 
    4: ['dissolution', 'mortality', 'morality', 'phenomenon', 'melancholy', 'serenity', 'lonliness', 'silhouette', 'relationship', 'vegetable', 'homecoming', 'integrity', 'constellation', 'organism', 'ecosystem', 'territory', 'environment', 'destination', 'perimeter', 'bacteria', 'ressurection', 'awakening', 'biology', 'experiment', 'defloration', 'society']
}








