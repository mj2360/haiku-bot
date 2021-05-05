const Rita = require('rita'); 
const request = require('request'); 
const fs = require('fs'); 

var page = "1"; 
var verbData; 
var verbs = []; 
var aVerb = "";
var verb_syll = {}; 
var noun_syll = {}; 
var syllablesCount; 
var wordObj = {};

writeData();
function writeData(){
    wordObj = {
        noun_syll : {
            1: ['spring', 'fall', 'death', 'trees', 'wind', 'leaves', 'leaf', 'sprout', 'time', 'cave', 'pine', 'oak', 'rot', 'earth', 'eye', 'grief', 'light', 'hell', 'cliff', 'hill', 'will', 'bird'], 
            2: ['autumn', 'summer', 'winter', 'texture', 'newborn', 'repose', 'flower', 'petal', 'sunlight', 'moonlight', 'moonbeam', 'night sky', 'human', 'spiral', 'planet', 'orbit', 'feline', 'body', 'lion', 'tiger', 'beauty', 'darkness', 'shadow', 'lightness', 'goddess'], 
            3: ['mystery', 'harmony', 'memory', 'masculine', 'feminine', 'melody', 'existence', 'universe', 'infinte', 'violence', 'medicine', 'paradise', 'dopamine', 'innocence'], 
            4: ['dissolution', 'mortality', 'morality', 'phenomenon', 'melancholy', 'serenity', 'lonliness', 'silhouette', 'relationship', 'vegetable', 'homecoming', 'integrity', 'constellation', 'organism', 'ecosystem', 'territory', 'environment', 'destination', 'perimeter', 'bacteria', 'ressurection', 'awakening', 'biology', 'experiment', 'defloration', 'society']
        },

        verb_syll : {
            1: [],
        }
    }
}



//searching for words in API that match POS parameter
//returns all the verbs
for (page = 1; page<114; page++){
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

        //pushing data from WordsAPI into verbs array 
        for(i=0; i<verbData.results.data.length; i++) {
            //if word is already in verbs (array) do nothing
            //else push 
            if(verbData.results.data[i] in verbs){

            } else {
                verbs.push(verbData.results.data[i]); 
            }
            
        } 

        //for each word in the verbs array pass it through Rita.analyze to get the syllable count for each word
        for(w=0; w<verbs.length; w++){
            aVerb = verbs[w]; 
           
            var features = Rita.analyze(aVerb);
            // Just look at the syllables
            var syllables = features.syllables;
            // What's the count of syllables based on the slashes
            syllablesCount = syllables.split(/\//).length.toString();

            //pushing word to verb_syll Object based on syllable count
            if(syllablesCount in wordObj.verb_syll){
                wordObj.verb_syll[syllablesCount].push(aVerb);
            } else {
                wordObj.verb_syll[syllablesCount] = [];
                wordObj.verb_syll[syllablesCount].push(aVerb);
            } 
        } 
        // console.log(verbs)
        // console.log(wordObj);
        // let wordData = JSON.stringify(wordObj, null, 2);
        // fs.writeFileSync('words.json', wordData);
    }); 
}

console.log(verbs); 

















// //Demo 
// //a way to call a random one syllable word 
// var syll1 = noun_syll[1];
// var rando_syll1 = Math.floor(Math.random()*syll1.length);
// // console.log(rando_syll1);
// // console.log(noun_syll[1][rando_syll1]);









