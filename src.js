
let totalClicks = 0;
let score = 0;
let misses = 0;
const maxMisses = 5;
let currentDucks = [];
let gameOver = false;

const gameContainer = document.getElementById('game-container');
const stats = document.getElementById('game-stats');
const game_over_Text = document.getElementById('game-over');
const duck_kill_sound=document.getElementById('duck-kill-sound');
const duck_miss_sound=document.getElementById('duck-miss-sound');
const replayButton =document.getElementById('replay-button');

function Xposition() {
    const container_W = gameContainer.offsetWidth;
    return Math.random() * (container_W - 100); 
}
function Yposition() {
    const container_H = gameContainer.offsetHeight;
    return Math.random() * (container_H - 100); 
}

function moveDuck(duck) {
    let xPos = 0;
    let yPos = Yposition();
    let xSpeed = Math.random() * 3 + 5;
    let ySpeed = Math.random() * 3 - 2.5;

    function animate() {
        xPos += xSpeed;
        yPos += ySpeed;

        if (yPos > gameContainer.offsetHeight - 100 || yPos < 0) {
            ySpeed = -ySpeed;
        }
        if (xPos > gameContainer.offsetWidth) {
            if (currentDucks.includes(duck)) {
                gameContainer.removeChild(duck);
                createDuck();
                currentDucks = currentDucks.filter(d => d !== duck);
                duck_miss_sound.play();
                misses++;
                updateStats();
                checkGameOver();
            }
            return;
        }
        duck.style.left = `${xPos}px`;
        duck.style.top = `${yPos}px`;
        
        if (!gameOver) {
            requestAnimationFrame(animate);
        }
    }
    animate();
}

function createDuck() {
    if (gameOver) return;

    const randomY = Yposition();
    const randomX = Xposition();
    const duck = document.createElement('img');

    duck.src = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/dbc71cc0-d758-451c-aa8c-fe9ff46baceb/de0hn13-527e3f64-5a3c-475b-8e3f-2a1cf200a11a.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2RiYzcxY2MwLWQ3NTgtNDUxYy1hYThjLWZlOWZmNDZiYWNlYlwvZGUwaG4xMy01MjdlM2Y2NC01YTNjLTQ3NWItOGUzZi0yYTFjZjIwMGExMWEuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.JYm59OuFGkZeK-PW3YTH_wuGwQLinNha7D9rO3nK5rc';
    duck.className = 'duck';
    duck.style.top = `${randomY}px`;
    duck.style.left = `${randomX}px`;
    duck.style.width='250px';
    duck.style.height='auto';
    gameContainer.appendChild(duck);
    currentDucks.push(duck); 
    moveDuck(duck);

    duck.addEventListener('click', () => {
        if (gameOver) return;
        gameContainer.removeChild(duck);
        currentDucks = currentDucks.filter(d => d !== duck);
        duck_kill_sound.play();
        misses=0;
        score++;
        totalClicks++;
        updateStats();
    });
}

function updateStats() {
    stats.textContent = `Total Clicks: ${totalClicks} | Score: ${score} | Misses: ${misses}`;
}

function checkGameOver() {
    if (misses >= maxMisses) {
        gameOver = true;
        game_over_Text.style.display = 'block';
        
        replayButton.style.display = 'inline-block';
        clearInterval(duckInterval); 
    }
}
function resetGame() {
    gameOver = false;
    totalClicks = 0;
    score = 0;
    misses = 0;
    currentDucks.forEach(duck => gameContainer.removeChild(duck));
    currentDucks = [];
    updateStats();
    game_over_Text.style.display = 'none';
    replayButton.style.display = 'none'; 
    startDuckInterval();
}
function startDuckInterval(){
    const duckInterval = setInterval(() => {
        if (!gameOver) {
            createDuck();
        }
    }, 1900); 

}
replayButton.addEventListener('click', resetGame);
startDuckInterval();
