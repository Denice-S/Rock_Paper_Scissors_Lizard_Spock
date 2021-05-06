const options={
    rock: { beats: ["scissors", "lizard"], loses: ["paper", "spock"] },
    paper: { beats: ["rock", "spock"], loses: ["scissors", "lizard"] },
    scissors: { beats: ["lizard", "paper"], loses: ["rock", "spock"] },
    lizard: { beats: ["spock", "paper"], loses: ["scissors", "rock"] },
    spock: { beats: ["scissors", "rock"], loses: ["lizard", "paper"] }
}
const keys=Object.keys(options);
//computer must choose a random icon
const compChoice=keys[Math.floor(Math.random()*keys.length)];

const modal=document.getElementById("rulesModal");
const chosenSection=document.getElementById("chosen");
const playerChoice=document.getElementById("playerChoice");
const player=document.querySelector(".playerPick");
const computer=document.querySelector(".compPick")
const result=document.getElementById("result");
const icons=document.querySelectorAll(".icon");
const playAgain=document.getElementById("again");
const pscore=document.getElementById("playerScore");
const cscore=document.getElementById("computerScore");
const computerChoice=document.getElementById("computerChoice");
const newGame=document.getElementById("new");
let level=document.querySelector('.level');
let userChoice="";
let playerScore="";
let computerScore="";
let winningScore=3;


/* code to add click listeners to all the icons,buttons,and level to play to grab what the user has clicked, identify the icon and save it to a variable,run a function to select user and computer choices, then a function to compare to see who has won*/
function addClickListeners() {
    playAgain.addEventListener("click", nextTurn);
    newGame.addEventListener("click", reset);
    level.addEventListener('change', function () {
        winningScore=parseInt(this.value);
        console.log(this.value)
        reset();
    })
    for (let icon of icons) {
        icon.addEventListener("click", (e) => {
            console.log(icon.classList[1])
            userChoice=icon.classList[1];
            showChoices();
            compare();
        });
    }
};

//code to display the chose user and computer icon on the screen 
function showChoices() {
    chosen.style.display="block";
    icons.forEach(icon => {
        if (icon.classList[1]==userChoice&&icon.classList[1]==compChoice) {
            let drawClone=icon.cloneNode(true);
            let playerDraw=icon.cloneNode(true)
            playerChoice.appendChild(playerDraw);
            computerChoice.appendChild(drawClone);
            icon.style.display="none"
        } else if (icon.classList[1]==userChoice) {
            let playerClone=icon.cloneNode(true)
            playerChoice.appendChild(playerClone);
            icon.style.display="none"
        } else if (icon.classList[1]==compChoice) {
            let compClone=icon.cloneNode(true);
            computerChoice.appendChild(compClone);
            icon.style.display="none"
        } else {
            icon.style.display="none"
        }
    })
}

//code to comapare users chosen icon to computers chosen icon
function compare() {
    result.classList.add("show");
    if (userChoice==compChoice) {
        result.innerHTML="Draw"
        player.classList.add("green");
        computer.classList.add("green");
    } else if (options[userChoice].beats.includes(compChoice)) {
        result.innerHTML=`<b><i>${userChoice} beats ${compChoice}</i>`
        player.classList.add("green");
        computer.classList.add("red");
        playerScore++;
        pscore.innerHTML=playerScore;
    } else {
        result.innerHTML=` <i>${compChoice} beats ${userChoice}</i>`
        computer.classList.add("green")
        player.classList.add("red")
        computerScore++;
        cscore.innerHTML=computerScore;
    }
    winner()

}

//code to determine if someone has won
function winner() {
    if (playerScore==winningScore) {
        console.log("player wins game")
        playAgain.style.display="none";
        newGame.style.display="block";
        pscore.innerHTML=`WINNER!
         score: ${playerScore}`;
        pscore.classList.add("green");
        cscore.classList.add("red");
    } else if (computerScore==winningScore) {
        playAgain.style.display="none";
        newGame.style.display="block";
        cscore.innerHTML=` WINNER!
        score: ${computerScore}`;
        cscore.classList.add("green");
        pscore.classList.add("red");
        console.log("Computer wins game");
    }
}


//code to play the next turn
function nextTurn() {
    chosen.style.display="none";
    result.classList.remove("show");
    result.classList.add("hide")
    computer.classList.remove("green", "red")
    player.classList.remove("red", "green");
    playerChoice.innerHTML="";
    computerChoice.innerHTML="";
    icons.forEach(icon => {
        icon.style.display="block"
        icon.classList.remove("hide", "show");
    })
}
//code to reset all options and start brand new game
function reset() {
    chosen.style.display="none";
    result.classList.remove("show");
    result.classList.add("hide")
    computer.classList.remove("green", "red")
    player.classList.remove("red", "green");
    cscore.classList.remove("green", "red");
    pscore.classList.remove("green", "red");
    playerChoice.innerHTML="";
    computerChoice.innerHTML="";
    pscore.innerHTML="";
    cscore.innerHTML="";
    playerScore=0;
    computerScore=0;
    userChoice="";
    playAgain.style.display="block";
    newGame.style.display="none";
    icons.forEach(icon => {
        icon.style.display="block"
        icon.classList.remove("hide", "show");
    })
}

//code to run the pop up modal with the game rules
document.getElementById("rulesButton").addEventListener("click", () => {
    modal.style.display="block"
})
document.getElementById("closeModal").addEventListener("click", () => {
    modal.style.display="none"
})
window.addEventListener("click", (e) => {
    if (e.target==modal) {
        modal.style.display="none"
    }
});



addClickListeners();





