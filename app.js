let usersqn = [];
let gamesqn = [];

let started = false;
let level = 0;
let h5 = document.querySelector("h5"); 

const btns = ["red", "yellow", "green", "blue"];

document.addEventListener("keydown", function (event) {
    if (!started) {
        console.log("The game has been started");
        started = true;
        levelup();
    }
});

function gameflash(btn) {
    if (btn) {
        btn.classList.add("flash");
        setTimeout(() => {
            btn.classList.remove("flash");
        }, 250);
    } else {
        console.error("Button not found");
    }
}

function userflash(btn) {
    if (btn) {
        btn.classList.add("userflash");
        setTimeout(() => {
            btn.classList.remove("userflash");
        }, 250);
    } else {
        console.error("Button not found");
    }
}

function playSequence() {
    let i = 0;
    function flashNext() {
        if (i < gamesqn.length) {
            let btn = document.querySelector(`.${gamesqn[i]}`);
            gameflash(btn);
            setTimeout(flashNext, 600); // Delay between flashes
            i++;
        }
    }
    flashNext();
}

function levelup() {
    usersqn = [];
    level++;
    h5.innerText = `Level ${level}`;

    let rdnIdx = Math.floor(Math.random() * 4);
    let rdncolor = btns[rdnIdx];
    gamesqn.push(rdncolor);
  
    console.log("Game sequence:", gamesqn);

    playSequence(); // Flash the full sequence
}

function check(idx) {
    if (usersqn[idx] !== gamesqn[idx]) { // Wrong input
        h5.innerText = `!Game Over,Your Score was ${level} Press a Key to Restart`;
        reset();
        document.querySelector('body').style.backgroundColor="red";
        setTimeout(()=>{
            document.querySelector('body').style.backgroundColor="white";
        },500);
        return;
    }
  
    if (usersqn.length === gamesqn.length) { // User completed sequence
        setTimeout(levelup, 1000);
    }
}

function userpress() {
    let btn = this;
    userflash(btn);

    let usercolor = btn.getAttribute('class').split(" ")[1]; // Get button color
    usersqn.push(usercolor);

    check(usersqn.length - 1);
}

const allbtns = document.querySelectorAll('.btn');
for (let btn of allbtns) {
    btn.addEventListener('click', userpress);
}

function reset() {
    started = false;
    usersqn = [];
    gamesqn = [];
    level = 0;
}
// store the highest using a array or varibale Max score and dispalay it and compare it with the current score  in the game
