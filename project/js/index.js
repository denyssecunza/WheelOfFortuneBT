/* 
* have to create a function that displays the amount of letters in the random words as underscores
* create a start button, which onclick, would display if the word has the letters R,S,T,L,N  
* 
* 
*/
const body = document.body
const wordDiv = document.getElementById("word");

let rand =  getRandomWord();
let dash = '_ ';
wordDiv.innerText = dash.repeat(rand.length);

/*
    if the letters in the random word === r,s,t,l,n,e
    take away the dash / replace the dash with the correct letter

*/

const revChar = "RSTLNE";

let gameStart = document.getElementById('gameStart')
let dashes = wordDiv.innerText.split(' ')
wordDiv.style.fontSize = "45px"

gameStart.onclick = function reveal(){
    for(let i = 0; i < rand.length; i++){
        if(revChar.includes(rand[i].toUpperCase())){
            dashes[i] = rand[i]
        }
    }
    console.log(rand)
    wordDiv.innerText = dashes.join(' ').toUpperCase()
}


/**
 * iterate thru string and if it includes more than one vowel 
 *      then alert them too many vowels entered
 * if the input does not include at least one of the vowels
 * 
*/


const vowels = "aeiou"
//get the value of the text field
const guessForm = document.getElementById("guess")
const inputPers = document.getElementById("guessed-letters")

/// maybe later ?  can change start game button to submit once its clicked once 
//then they can submit their guess

//pushed the guesses into another array

let vowelsGiven = false;
let guessed = [];
const noLoss = function(e){
    e.preventDefault();
    const texts = inputPers.value;
    if(guessed.length === 3){
        inputPers.disabled = true;
    }
    if(vowelsGiven === true && vowels.includes(texts)){
        window.alert("Only one vowel guess allowed.")
    }
    else{
        if(vowels.includes(texts)){
            vowelsGiven = true;
            guessed.push(texts);
        }
        else{
            guessed.push(texts);
        }
    }
    //this changes the dashes to the correct letter if they guess it right
    for(let i = 0; i < rand.length; i++){
        if(rand[i] === texts){
            dashes[i] = rand[i]
        }
    }
    wordDiv.innerText = dashes.join(' ').toUpperCase()

    let g = guessed.join(' ').toString().toUpperCase()

    //try to append the guessed array to the div
    let guessedDiv = document.getElementById("guess-arr")
    
    guessedDiv.innerHTML = (g);
    guessedDiv.style.fontSize = "25px"
    document.body.appendChild(guessedDiv)


    guessForm.reset();
}

guessForm.addEventListener("submit", noLoss);

//get the input of the final guess and make sure that if its correct then correct the letters on the dashes

const finalForm = document.getElementById('final-guess')
const inputFin = document.getElementById('final-letters')

const lastGuess = function(e){
    e.preventDefault();
    let fval = inputFin.value;
    for(let i = 0; i < rand.length; i++){
        if(rand[i] === fval[i]){
            dashes[i] = rand[i]
            inputFin.disabled = true;         
        }
    }
    wordDiv.innerText = dashes.join(' ').toUpperCase()
    finalForm.reset();
}

finalForm.addEventListener("submit", lastGuess);

//now to validate the form to make sure they only insert a-z or A-Z
function validated(){
    const checkFor = /[a-zA-Z]/g
    let gval = inputPers.value
    if(!gval.match(checkFor)){
        inputPers.setCustomValidity("Enter only a-z or A-Z")
        // inputPers.reportValidity()
    }
    else{
        // input is fine -- reset the error message
        inputPers.setCustomValidity('');
    }
    let fval = inputFin.value
    if(!fval.match(checkFor)){
        inputFin.setCustomValidity("Enter only a-z or A-Z")
        //inputFin.reportValidity()
    }
    else{
        // input is fine -- reset the error message
        inputFin.setCustomValidity('');
    }
}

window.onload = function(){
    inputPers.onchange = validated;
    inputFin.onchange = validated;
}

/**
 * Now to make it so that when the user guessed the word fully turn the screen into something cool
 * 
 * 
 */
const title = document.getElementById("wtitle")
const congrats = document.getElementById('win-lose')
let gameWon = true;
function isCorrect(){
    let fval = inputFin.value;
    let gArr = guessed.value
    for(let i = 0; i < rand.length; i++){
        if(rand[i] === fval[i]){
            gameWon = true;
        }
        else{
            gameWon = false;
        }
    }
    if(gameWon === true){
        wordDiv.style.backgroundColor = "green";
        title.style.backgroundColor = 'green';
        const winner =  document.createElement('h1');
        const won = document.createTextNode("CONGRATS WORD CORRECT!")
        winner.appendChild(won);
        congrats.appendChild(winner);
    }
    else{
        wordDiv.style.backgroundColor = "#cc0000";
        title.style.backgroundColor = "#cc0000";
        const loser =  document.createElement('h1');
        const lost = document.createTextNode("SORRY YOU LOST")
        loser.appendChild(lost);
        congrats.appendChild(loser);
    }
}

//tried to use this code borrowed from https://codepen.io/fionnachan/pen/ENdYqK
// function create(i) {
//     var width = Math.random() * 8;
//     var height = width * 0.4;
//     var colourIdx = Math.ceil(Math.random() * 3);
//     var colour = "red";
//     switch(colourIdx) {
//       case 1:
//         colour = "yellow";
//         break;
//       case 2:
//         colour = "blue";
//         break;
//       default:
//         colour = "red";
//     }
//     $('<div class="confetti-'+i+' '+colour+'"></div>').css({
//       "width" : width+"px",
//       "height" : height+"px",
//       "top" : -Math.random()*20+"%",
//       "left" : Math.random()*100+"%",
//       "opacity" : Math.random()+0.5,
//       "transform" : "rotate("+Math.random()*360+"deg)"
//     }).appendTo('wrapper');  
    
//     drop(i);
// }
  
// function drop(x) {
//     $('.confetti-'+x).animate({
//         top: "100%",
//         left: "+="+Math.random()*15+"%"
//     }, Math.random()*2000 + 2000, function() {
//         reset(x);
//     });
// }

// function reset(x) {
//     $('.confetti-'+x).animate({
//         "top" : -Math.random()*20+"%",
//         "left" : "-="+Math.random()*15+"%"
//     }, 0, function() {
//         drop(x);             
//     });
// }


window.onload = function(){
    inputFin.onchange = isCorrect;
}