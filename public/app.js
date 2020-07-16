const canvas = document.querySelector('canvas');
const scoreNum = document.querySelector('.score');
const maxScoreNum = document.querySelector('.maxscore');
const up = document.querySelector('#up');
const down = document.querySelector('#down');
const left = document.querySelector('#left');
const right = document.querySelector('#right');


const ctx = canvas.getContext('2d');

let primary = '#f5a31a';
let red = '#d32626';

const grid = 16;
let count = 0;

let score = 0;
let maxscore = localStorage.getItem('maxscore') || 0;

let snake = {
    x: grid * 5,
    y: grid * 5,
    vx: grid,
    vy: 0,
    cells:  [],
    maxCells: 4
};

let apple = {
    x: grid * 10,
    y: grid * 10
}

function update() {
    requestAnimationFrame(update);
    score += .5;


    if (++count < 4) {
        return;
    }
    count = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    snake.x += snake.vx;
    snake.y += snake.vy;

    if (snake.x < 0) {
        snake.x = canvas.width - grid;
    } else if (snake.x >= canvas.width) {
        snake.x = 0;
    }

    if (snake.y < 0) {
        snake.y = canvas.height - grid;
    } else if (snake.y >= canvas.height) {
        snake.y = 0;
    }


    snake.cells.unshift({x: snake.x, y: snake.y})
    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop()
    }

    //Draw Apple
    ctx.fillStyle = primary;
    ctx.fillRect(apple.x, apple.y, grid-1, grid-1);

    //Draw Snake
    ctx.fillStyle = red;
    snake.cells.forEach((cell, index) => {
        ctx.fillRect(cell.x, cell.y, grid-1, grid-1);
        if (cell.x === apple.x && cell.y === apple.y) {
            snake.maxCells++
            score = score + (50 * snake.cells.length) ;

            apple.x = getRandomInt(0, 24) * grid;
            apple.y = getRandomInt(0, 14) * grid;
        }
        for (let i = index + 1; i < snake.cells.length; i++) {
            if(cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                window.location.reload();
            }
        }
        printScore();
        printMaxScore();
        if (score > maxscore) {
            maxscore = score
        
        }
        
    })
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function printScore() {
    scoreNum.innerHTML = `<p>Score: ${Math.floor(score)}</p>`
}
function printMaxScore() {
    localStorage.setItem("maxscore", maxscore)
    maxScoreNum.innerHTML = `<p>Your Record: ${Math.floor(maxscore)}</p>`
}

document.addEventListener('keydown', function(e) {
    if (e.which === 37 && snake.vx === 0) {
        snake.vx = -grid;
        snake.vy = 0;
    } else if (e.which === 38 && snake.vy === 0) {
        snake.vx = 0;
        snake.vy = -grid;
    } else if (e.which === 39 && snake.vx === 0) {
        snake.vx = grid;
        snake.vy = 0;
    } else if (e.which === 40 && snake.vy === 0) {
        snake.vx = 0;
        snake.vy = grid;
    }
})

up.addEventListener('click', function() {
    if(snake.vy === 0) {
        snake.vx = 0;
        snake.vy = -grid;
    }
})
down.addEventListener('click', function() {
    if(snake.vy === 0) {
        snake.vx = 0;
        snake.vy = grid;
    }
})
left.addEventListener('click', function() {
    if(snake.vx === 0) {
        snake.vx = -grid;
        snake.vy = 0;
    }
})
right.addEventListener('click', function() {
    if(snake.vx === 0) {
        snake.vx = grid;
        snake.vy = 0;
    }
})


requestAnimationFrame(update);


