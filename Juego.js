const brazzer = document.getElementById("flappy-brazzer");
const pillarTop = document.getElementById("pillar-top");
const pillarBottom = document.getElementById("pillar-bottom");
const scoreDisplay = document.getElementById("score");
const menu = document.getElementById("menu");
const startButton = document.getElementById("start-button");
const gameOverScreen = document.getElementById("game-over");
const playAgainButton = document.getElementById("play-again");

let isGameStarted = false;
let isGameOver = false;
let brazzerPosition = 200;
let pillarPosition = 300;
let score = 0;

function startGame(){
    menu.style.display = "none";
    isGameStarted = true;
    gameOverScreen.style.display = "none";
    brazzerPosition = 200;
    pillarPosition = 300;
    score = 0;
    updateScore();
    updateGame();
}

function updateScore(){
    scoreDisplay.innerText = `Puntaje: ${score}`;
}

function updateGame(){
    if (isGameStarted && !isGameOver){
        brazzerPosition += 3;
        pillarPosition -= 2;

        if (brazzerPosition > 360 || brazzerPosition < 0){
            endGame();
        }

        if (pillarPosition < -50){
            pillarPosition = 350;
            score++;
            updateScore();
        }

        brazzer.style.top = brazzerPosition + "px";
        pillarTop.style.left = pillarPosition + "px";
        pillarBottom.style.left = pillarPosition + "px";

        if (checkCollision()){
            endGame();
        }

        requestAnimationFrame(updateGame);
    }
}

function checkCollision(){
    const brazzerRect = brazzer.getBoundingClientRect();
    const pillarTopRect = pillarTop.getBoundingClientRect();
    const pillarBottomRect = pillarBottom.getBoundingClientRect();

    if (
        (brazzerRect.top <= pillarTopRect.bottom && brazzerRect.left <= pillarTopRect.right && brazzerRect.right >= pillarTopRect.left) ||
        (brazzerRect.bottom >= pillarBottomRect.top && brazzerRect.left <= pillarBottomRect.right && brazzerRect.right >= pillarBottomRect.left)
    ){
        return true;
    }

    return false;
}

function endGame(){
    isGameStarted = false;
    isGameOver = true;
    gameOverScreen.style.display = "block";
}

function restartGame(){
    gameOverScreen.style.display = "none";
    isGameOver = false;
    startGame();
}

playAgainButton.addEventListener("click", restartGame);
startButton.addEventListener("click", startGame);

document.addEventListener("keydown", function(event){
    if ((event.key === " " || event.key === "ArrowUp") && !isGameOver){
        brazzerPosition -= 80;
    }
}
);