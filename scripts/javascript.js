let userPick = NaN;
            
// Gets saved score data or set default values
let score = JSON.parse(localStorage.getItem('score')) ||{
    Wins: 0,
    Losses: 0,
    Ties: 0
};


// Funtion to pick a random guess
function computerPick(){
    randomNumber = Math.random(); //Generating:   0 <= random number <1
    let guess = '';
    
    if (randomNumber <= 1/3){ // Rock is randomNumber <= 1/3
        guess = 'rock';
    } else if (randomNumber <= 2/3){ //Paper is b/w 1/3 randomNumber <= 2/3
        guess = 'paper'
    } else{
        guess = 'scissors'
    }

    return guess;
}

// Funtion to check result of play
function check(userPick){                    
    let result = '';
    const computerGuess = computerPick();

    if (userPick === 'rock'){
        if (computerGuess === 'rock'){ 
            result = 'tie';
        } else if (computerGuess === 'paper'){
            result = 'loss';
        } else{
            result = 'win';
        }
    } else if ( userPick === 'paper'){
        if (computerGuess === 'rock'){ 
            result = 'win';
        } else if (computerGuess === 'paper'){ 
            result = 'tie';
        } else{
            result = 'loss';
        }
    } else {
        if (computerGuess === 'rock'){ 
            result = 'loss';
        } else if (computerGuess === 'paper'){ 
            result = 'win';
        } else{
            result = 'tie';
        }
    }

    // alert(` ${result.toUpperCase()} \n Your Pick: ${userPick} \n Computer Pick: ${computerGuess}`);
    updateScore(result);
    //Hide Show result code: displayMatchResult(userPick, computerGuess, result);
    displayScores();
    changeButtonColor(userPick, computerGuess, result);
    return result;
}

// Saves data
function saveData(score){    
    const data = JSON.stringify(score);
    console.log(JSON.stringify(score));
    localStorage.setItem('score', data);
}

// Updating Scores
function updateScore(result){
    if (result === 'win'){
        score.Wins += 1;
    } else if(result === 'loss'){
        score.Losses += 1;
    } else{
        score.Ties += 1;
    }

    saveData(score);
}

// Display Scores on page
function displayScores(userPick, computerGuess, result){
    const winElem =  document.querySelector(".js-wins");
    winElem.innerText = `Wins: ${score.Wins}` 
    
    const lossElem =  document.querySelector(".js-losses");
    lossElem.innerText = `Losses: ${score.Losses}` 
    
    const tieElem =  document.querySelector(".js-ties");
    tieElem.innerText = `Ties: ${score.Ties}` 

}

/* Hide show result code:
// Display match result
function displayMatchResult(userPick, computerGuess, result){
    const pickSomethingElem = document.querySelector('.js-pick-something');
    pickSomethingElem.innerText = `${result} \n You Picked: ${userPick} \n Computer Picked: ${computerGuess}`;
}
*/

// Change Button Color
function changeButtonColor(userPick, computerGuess, result){    
    const userbuttonElem = document.querySelector(`.js-${userPick}-button`)
    const computerGuessButtonElem = document.querySelector(`.js-${computerGuess}-button`);
    
    //Call to reset button border colors
    resetBorderColor();

    //Changing color according to who wins
    if (result === 'win'){
        userbuttonElem.classList.add('green-border');
        computerGuessButtonElem.classList.add('red-border');
    } else if(result === 'loss'){
        userbuttonElem.classList.add('red-border');
        computerGuessButtonElem.classList.add('green-border');
    } else{
        computerGuessButtonElem.classList.add('blue-border');
    }              
    

}
// Buttons border color reset funtion
function resetBorderColor(){
    const rockButtonElem = document.querySelector('.js-rock-button');
    const paperButtonElem = document.querySelector('.js-paper-button');
    const scissorsButtonElem = document.querySelector('.js-scissors-button');

    rockButtonElem.classList.remove('red-border');
    rockButtonElem.classList.remove('blue-border');
    rockButtonElem.classList.remove('green-border');

    paperButtonElem.classList.remove('red-border');
    paperButtonElem.classList.remove('blue-border');
    paperButtonElem.classList.remove('green-border');

    scissorsButtonElem.classList.remove('red-border');
    scissorsButtonElem.classList.remove('blue-border');
    scissorsButtonElem.classList.remove('green-border');


}

displayScores();