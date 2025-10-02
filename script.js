
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
const canvasSize = 400;
canvas.width = canvasSize;
canvas.height = canvasSize;

let snake = [{ x: 9 * box, y: 9 * box }];
let direction = null;
let food = {
    x: Math.floor(Math.random() * (canvasSize / box)) * box,
    y: Math.floor(Math.random() * (canvasSize / box)) * box
};
let score = 0;
let gameStarted = false;

// 倒數計時顯示
let countdown = 5;
const countdownElement = document.getElementById("countdown");
countdownElement.innerText = `遊戲將在 ${countdown} 秒後開始`;

const countdownInterval = setInterval(() => {
    countdown--;
    if (countdown > 0) {
        countdownElement.innerText = `遊戲將在 ${countdown} 秒後開始`;
    } else {
        countdownElement.innerText = "";
        gameStarted = true;
        clearInterval(countdownInterval);
    }
}, 1000);

// 監聽鍵盤事件
document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    if (event.key === "ArrowLeft" && direction !== "RIGHT") {
        direction = "LEFT";
    } else if (event.key === "ArrowUp" && direction !== "DOWN") {
        direction = "UP";
    } else if (event.key === "ArrowRight" && direction !== "LEFT") {
        direction = "RIGHT";
    } else if (event.key === "ArrowDown" && direction !== "UP") {
        direction = "DOWN";
    }
}

function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvasSize, canvasSize);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "lime" : "green";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("得分: " + score, box, canvasSize - box);

    if (!gameStarted) return;

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === "LEFT") snakeX -= box;
    if (direction === "UP") snakeY -= box;
    if (direction === "RIGHT") snakeX += box;
    if (direction === "DOWN") snakeY += box;

    if (
        snakeX < 0 || snakeX >= canvasSize ||
        snakeY < 0 || snakeY >= canvasSize ||
        collision({ x: snakeX, y: snakeY }, snake)
    ) {
        alert("遊戲結束！得分：" + score);
        document.location.reload();
        return;
    }

    let newHead = { x: snakeX, y: snakeY };

    if (snakeX === food.x && snakeY === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * (canvasSize / box)) * box,
            y: Math.floor(Math.random() * (canvasSize / box)) * box
        };
    } else {
        snake.pop();
    }

    snake.unshift(newHead);
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

setInterval(draw, 100);
