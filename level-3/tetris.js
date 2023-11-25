const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');
const back = document.getElementById('back')

// Game arena matrix initialization
const arena = createMatrix(
    20, 22);

// Player object containing position, matrix, and score
const player = {
    pos: {x: 5, y: 5},
    matrix: null,
    score: 0,
};


context.scale(20, 20);

// Function to clear completed rows in the game arena and update the player score
function arenaSweep() {
    let rowCount = 1;
    outer: for (let y = arena.length -1; y > 0; --y) {
        for (let x = 0; x < arena[y].length; ++x) {
            if (arena[y][x] === 0) {
                continue outer;
            }
        }

        const row = arena.splice(y, 1)[0].fill(0);
        arena.unshift(row);
        ++y;

        player.score += rowCount * 10;
        rowCount *= 2;
    }
}

// Function to check if the player's piece collides with the game arena
function collide(arena, player) {
    const m = player.matrix;
    const o = player.pos;
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 &&
               (arena[y + o.y] &&
                arena[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

// Function to create a 2D array filled with zeros
function createMatrix(w, h) {
    const matrix = [];
    while (h--) {
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}

// Function to create a matrix representing a Tetris piece based on the provided type
function createPiece(type)
{
    if (type === 'I') {
        return [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
        ];
    } else if (type === 'L') {
        return [
            [0, 2, 0],
            [0, 2, 0],
            [0, 2, 2],
        ];
    } else if (type === 'J') {
        return [
            [0, 3, 0],
            [0, 3, 0],
            [3, 3, 0],
        ];
    } else if (type === 'O') {
        return [
            [4, 4],
            [4, 4],
        ];
    } else if (type === 'Z') {
        return [
            [5, 5, 0],
            [0, 5, 5],
            [0, 0, 0],
        ];
    } else if (type === 'S') {
        return [
            [0, 6, 6],
            [6, 6, 0],
            [0, 0, 0],
        ];
    } else if (type === 'T') {
        return [
            [0, 7, 0],
            [7, 7, 7],
            [0, 0, 0],
        ];
    }
}

//Function to draw a matrix on the canvas with a specified offset
function drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = colors[value];
                context.fillRect(x + offset.x,
                                 y + offset.y,
                                 1, 1);
            }
        });
    });
}

// Function to draw the game on the canvas
function draw() {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    drawMatrix(arena, {x: 0, y: 0});
    drawMatrix(player.matrix, player.pos);
}

// Function to merge the player's piece into the game arena
function merge(arena, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                arena[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });
}

// Function to rotate a matrix in either clockwise or anticlockwise direction
function rotate(matrix, dir) {
    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < y; ++x) {
            [
                matrix[x][y],
                matrix[y][x],
            ] = [
                matrix[y][x],
                matrix[x][y],
            ];
        }
    }

    if (dir > 0) {
        matrix.forEach(row => row.reverse());
    } else {
        matrix.reverse();
    }
}

// Function to handle the player dropping the piece down
function playerDrop() {
    player.pos.y++;
    if (collide(arena, player)) {
        player.pos.y--;
        merge(arena, player);
        playerReset();
        arenaSweep();
        updateScore();
    }
    dropCounter = 0;
}

// Function to handle the player moving left or right
function playerMove(offset) {
    player.pos.x += offset;
    if (collide(arena, player)) {
        player.pos.x -= offset;
    }
}

// Function to reset the player's position and matrix, check for game-over, and update the score
function playerReset() {
    const pieces = 'TJLOSZI';
    player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
    player.pos.y = 0;
    player.pos.x = (arena[0].length / 2 | 0) -
                   (player.matrix[0].length / 2 | 0);

    var sound = document.getElementById("game-over")

      //game over condition              
    
        if (collide(arena, player)) {   
            window.location.href = "../score/score.html"
            
    
            localStorage.setItem("scoreValue",player.score)
            console.log(localStorage)
    
    
            player.score = 0;
            updateScore();
        }
   
}

// Function to handle the player rotating the piece
function playerRotate(dir) {
    const pos = player.pos.x;
    let offset = 1;
    rotate(player.matrix, dir);
    while (collide(arena, player)) {
        player.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > player.matrix[0].length) {
            rotate(player.matrix, -dir);
            player.pos.x = pos;
            return;
        }
    }
}

let dropCounter = 0;

let dropInterval = 90;

let lastTime = 0;

// Update function for the game loop
function update(time = 0) {
    const deltaTime = time - lastTime;

    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        playerDrop();
    }

    lastTime = time;

    draw();
    requestAnimationFrame(update);
}

// Retrieve the player's name from local storage
var getname = localStorage.getItem("n")

// Function to update the displayed score on the scoreboard
function updateScore() {
    document.getElementById('scoreboard').innerHTML = "<span id=hi> Hey "+getname+ " <br>  Welcome to Tetris " + "<br> <br> <u>Your socre is: "+ player.score +"</span";
    
}

// Event handling for button clicks on mobile version(e.g., rotation, movement)
const move1 = document.getElementById("rotate")
const move2 = document.getElementById("down")
const move3 = document.getElementById("left")
const move4 = document.getElementById("right")


move1.onclick =  function(){
    console.log("veu2")
    playerRotate(1)
}

move2.onclick =  function(){
    console.log("veu2")
    playerDrop()
}
move3.onclick =  function(){
    console.log("veu2")
    playerMove(-1)
}

move4.onclick =  function(){
    console.log("veu2")
    playerMove(1)
}

// Event listener for keyboard input (desktop/laptop version)
document.addEventListener('keydown', event => {
    // left
    if (event.keyCode === 37 ) {
        playerMove(-1);
    }
    // right
     else if (event.keyCode === 39) {
        playerMove(1);
        
    } 
    // down
    else if (event.keyCode === 40) {
        playerDrop();
    }
    // clockwise (up arrow)
     else if (event.keyCode === 38) {
        playerRotate(-1);
    }
    // anticlockwise ("W")
     else if (event.keyCode === 87) {
        playerRotate(1);
    }
});

// Color palette for Tetris pieces
const colors = [
    null,
    '#FF0D72',
    '#0DC2FF',
    '#0DFF72',
    '#F538FF',
    '#FF8E0D',
    '#FFE138',
    '#3877FF',
];


// Function to reset player state, update the score, and start the game loop
playerReset();
updateScore();
update();



// AUDIO
// Initialize and play the opening audio on window load
const openingAudio = new Audio("../audio/mainpage audio.mp3")

window.onload = function(){
    openingAudio.pause()
    openingAudio.currentTime = 0;
    openingAudio.loop=true;
    openingAudio.play()
}
