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

    lines = [["click to", "generate", "a haiku"], ["", "", ""], []];

}

function draw(){
    background(220); 
    text(lines[randLine][0], width / 2, 75);
    text(lines[randLine][1], width / 2, 110);
    text(lines[randLine][2], width / 2, 145);
}


function mouseReleased() {
    randPrep = int (random(0, preps.length)); 
    randLine = int(random(0, 2)); 
    console.log(randLine);

    randNoun2 = wordData.noun_syll[2][int(random(0,wordData.noun_syll[2].length -1))];
    randNoun3 = wordData.noun_syll[3][int(random(0,wordData.noun_syll[3].length -1))]; 
    randVerb1 = wordData.verb_syll[1][int(random(0,wordData.verb_syll[1].length -1))]; 
    randVerb2 =  wordData.verb_syll[2][int(random(0,wordData.verb_syll[2].length -1))]
    randVerb3 =  wordData.verb_syll[3][int(random(0,wordData.verb_syll[3].length -1))]; 


    lines[0][0] = preps[randPrep] + " the " + randNoun3; 
    lines[0][1] = "I " + randVerb2 + " to " + wordData.noun_syll[3][int(random(0,wordData.noun_syll[3].length -1))]; 
    lines[0][2] = "But " + randVerb1 + " for " +  wordData.noun_syll[2][int(random(0,wordData.noun_syll[2].length -1))];
    // console.log(lines[0][0], lines[0][1], lines[0][2]);
    
    lines[1][0] = "Even with the " + randNoun2;
    lines[1][1] = "I feel the weight of " + wordData.noun_syll[2][int(random(0,wordData.noun_syll[2].length -1))];
    lines[1][2] = "Taking time to " + randVerb1;

    // line[2][0] = 
    // line[2][1] =
    // line[2][2] =
  }


