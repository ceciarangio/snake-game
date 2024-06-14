const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Configuraciones del juego
const box = 40;  // Tamaño más grande para la cabeza y la manzana
const canvasSize = 600; // Ajusta el tamaño del canvas según tus necesidades
canvas.width = canvasSize;
canvas.height = canvasSize;

let snake;
let direction;
let food;
let game;

// Inicializar el juego
function initGame() {
    snake = [];
    snake[0] = {
        x: 9 * box,
        y: 10 * box
    };

    direction = null;
    food = {
        x: Math.floor(Math.random() * (canvas.width / box)) * box,
        y: Math.floor(Math.random() * (canvas.height / box)) * box
    };

    game = setInterval(draw, 100);
}

// Carga de imágenes
const snakeHead = new Image();
snakeHead.src = "./assets/cobra.png";

const foodImg = new Image();
foodImg.src = "./assets/manzana.png";

document.addEventListener("keydown", setDirection);

function setDirection(event) {
    if (event.keyCode === 37 && direction !== "RIGHT") {
        direction = "LEFT";
    } else if (event.keyCode === 38 && direction !== "DOWN") {
        direction = "UP";
    } else if (event.keyCode === 39 && direction !== "LEFT") {
        direction = "RIGHT";
    } else if (event.keyCode === 40 && direction !== "UP") {
        direction = "DOWN";
    } else if (event.keyCode === 32) { // Barra espaciadora para reiniciar
        clearInterval(game);
        initGame();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        if (i === 0) {
            ctx.drawImage(snakeHead, snake[i].x, snake[i].y, box, box);
        } else {
            ctx.fillStyle = "white";
            ctx.fillRect(snake[i].x, snake[i].y, box, box);

            ctx.strokeStyle = "red";
            ctx.strokeRect(snake[i].x, snake[i].y, box, box);
        }
    }

    ctx.drawImage(foodImg, food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === "LEFT") snakeX -= box;
    if (direction === "UP") snakeY -= box;
    if (direction === "RIGHT") snakeX += box;
    if (direction === "DOWN") snakeY += box;

    if (snakeX === food.x && snakeY === food.y) {
        food = {
            x: Math.floor(Math.random() * (canvas.width / box)) * box,
            y: Math.floor(Math.random() * (canvas.height / box)) * box
        };
    } else {
        snake.pop();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    // Fin del juego si toca los bordes o colisiona consigo misma
    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game);
        ctx.fillStyle = "red";
        ctx.font = "50px Arial";
        ctx.fillText("Game Over", canvas.width / 4, canvas.height / 2);
    } else {
        snake.unshift(newHead);
    }
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

// Iniciar el juego al cargar la página
initGame();
