
var wordData; 
var lines = [[], [], []]; 
var preps = ["for", "since", "within", "until", "before"];
var randPrep; 
var randLine = 0; 
var randNoun1; 
var randNoun2; 
var randNoun3; 
var randNoun4; 
var randVerb1; 
var randVerb2; 
var randVerb3; 
var randVerb4; 


function preload (){
    wordData = loadJSON('words.json'); 
}

function setup(){
    createCanvas(650, 200); 

    lines = [["click to", "generate", "a haiku"], ["", "", ""], ["", "", ""]];

}

function draw(){
    background(220); 
    
    for(i=0; i<lines.length; i++){
        text(lines[i][0], width / 2, 75);
        text(lines[i][1], width / 2, 110);
        text(lines[i][2], width / 2, 145);
    }
}


function mouseReleased() {
    randLine = int(random(0, 3)); 

    randNoun1 = wordData.noun_syll[1][int(random(0,wordData.noun_syll[1].length -1))];
    randNoun2 = wordData.noun_syll[2][int(random(0,wordData.noun_syll[2].length -1))];
    randNoun3 = wordData.noun_syll[3][int(random(0,wordData.noun_syll[3].length -1))]; 
    randNoun4 = wordData.noun_syll[4][int(random(0,wordData.noun_syll[4].length -1))];

    randVerb1 = wordData.verb_syll[1][int(random(0,wordData.verb_syll[1].length -1))]; 
    randVerb2 = wordData.verb_syll[2][int(random(0,wordData.verb_syll[2].length -1))];
    randVerb3 = wordData.verb_syll[3][int(random(0,wordData.verb_syll[3].length -1))]; 
    randVerb4 = wordData.verb_syll[4][int(random(0,wordData.verb_syll[4].length -1))]; 


    lines[0][0] = "Against an " + randNoun2; 
    lines[0][1] = "I allow " + randNoun1 + " to " + randVerb2; 
    lines[0][2] = "Altering " + randNoun2 + "s";
    
    lines[1][0] = "An " + randNoun4;
    //find solution for translating verbs to their infinitive form using Rita
    //delete the two word verbs 
    lines[1][1] = randVerb2 + "s" + " another " +  randNoun2;
    lines[1][2] = "All for " + randNoun3;

    lines[2][0] = "About to " + randVerb2; 
    lines[2][1] = randNoun4 + " is also ";
    lines[2][2] =  randVerb2 + "ing"  + " " + randNoun1;

    //add infinitive to 0 and 2 verbs
    lines[3][0] = randVerb4; 
    lines[3][1] = "And " + randVerb1 + " adds " + randNoun3;
    lines[3][2] =  "So " + wordData.verb_syll[4][int(random(0,wordData.verb_syll[4].length -1))];

    //add gerund to randVerb2
    lines[4][0] = "Although " + randNoun1 + randVerb2; 
    lines[4][1] = randNoun1 " also " + randVerb4;
    lines[4][2] =  "As to " + randNoun3;

    

    //maybe do two more haiku variations 
  }




  //idea: twitter bot that posts something very full and new moon


