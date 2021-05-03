const Rita = require('rita'); 
const request = require('request'); 
const fs = require('fs'); 


var noun_syll = {
    1: ['spring', 'fall', 'death', 'trees', 'wind', 'leaves', 'leaf', 'sprout', 'time', 'cave', 'pine', 'oak', 'rot', 'earth', 'eye', 'grief', 'light', 'hell', 'cliff', 'hill', 'will', 'bird'], 
    2: ['autumn', 'summer', 'winter', 'texture', 'newborn', 'repose', 'flower', 'petal', 'sunlight', 'moonlight', 'moonbeam', 'night sky', 'human', 'spiral', 'planet', 'orbit', 'feline', 'body', 'lion', 'tiger', 'beauty', 'darkness', 'shadow', 'lightness', 'goddess'], 
    3: ['mystery', 'harmony', 'memory', 'masculine', 'feminine', 'melody', 'existence', 'universe', 'infinte', 'violence', 'medicine', 'paradise', 'dopamine', 'innocence'], 
    4: ['dissolution', 'mortality', 'morality', 'phenomenon', 'melancholy', 'serenity', 'lonliness', 'silhouette', 'relationship', 'vegetable', 'homecoming', 'integrity', 'constellation', 'organism', 'ecosystem', 'territory', 'environment', 'destination', 'perimeter', 'bacteria', 'ressurection', 'awakening', 'biology', 'experiment', 'defloration', 'society']
}

let wordData = JSON.stringify(noun_syll, null, 2);
fs.writeFileSync('words.json', wordData);



var page = "1"; 
var verbData; 
var verbs = []; 
var aVerb = "";
var verb_syll = {}; 
var syllablesCount; 


//searching for words in API that match POS parameter
//returns all the verbs
//page < 1150
for (page = 1; page<4; page++){
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

            //pushing word to verb_syll Object based on syllable count
            //Needs Fixing: only adds the last word from aVerb array
            if(syllablesCount in verb_syll){
                verb_syll[syllablesCount].push(aVerb);
                console.log(verb_syll[1]);
                console.log(verb_syll[2]);
            } else {
                verb_syll[syllablesCount] = [];
                verb_syll[syllablesCount].push(aVerb);
            } 
        } 
        //   let wordData2 = JSON.stringify(verb_syll, null, 2);
        //   fs.appendFileSync('words.json', wordData2);
        
    }); 
}













//Demo 
//a way to call a random one syllable word 
var syll1 = noun_syll[1];
var rando_syll1 = Math.floor(Math.random()*syll1.length);
// console.log(rando_syll1);
// console.log(noun_syll[1][rando_syll1]);









