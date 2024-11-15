


// Lấy thời gian từ localStorage
let timePerPlayer = parseInt(localStorage.getItem("timePerPlayer"),10)|| 600; // Mặc định là 10 phút nếu không có giá trị
// let timePerPlayer = 5;
let incrementPerMove = parseInt(localStorage.getItem("incrementPerMove"),10) || 5; // Mặc định là 5 giây nếu không có giá trị
let timeLeft = timePerPlayer;

// Hàm đếm ngược
function initTimer() {
    const timerElementDen = document.getElementById('timerDen');
    const timerElementDo = document.getElementById('timerDo');

    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    
    seconds = seconds < 10 ? '0' + seconds : seconds;
    timerElementDo.innerText = `${minutes}:${seconds}`;
    timerElementDen.innerText = `${minutes}:${seconds}`;
    
}


let blackTimeLeft =  timePerPlayer; // Thời gian còn lại của người chơi cờ đen
let blackTime;
let redTimeLeft = timePerPlayer;//Thời gian còn lại của người chơi cờ đo
let redTime;
let blackTimerInterval; // Interval của đồng hồ cờ đen
let isBlackTurn = true; // Biến kiểm tra lượt đi của người chơi, bắt đầu với cờ đỏ
let isRedTurn = false; // Cờ đen sẽ bắt đầu đếm khi đến lượt của nó

function startBlackPlayerTimer() {

    blackTime = blackTimeLeft;
    const blackTimerElement = document.getElementById('timerDen');

    blackTimerInterval = setInterval(() => {
        const minutes = Math.floor(blackTime / 60); 
        const seconds = blackTime % 60; 
        blackTimerElement.innerText = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        if (blackTime <= 0) {
            clearInterval(blackTimerInterval); 
            showWinner('người chơi 2');
        } else {
            blackTime--;
            blackTimeLeft--;  

        }
    }, 1000); 
}


function startRedPlayerTimer() {
    redTime = redTimeLeft;
    const redTimerElement = document.getElementById('timerDo');


    redTimerInterval = setInterval(() => {
        const minutes = Math.floor(redTime / 60);
        const seconds = redTime % 60;
        redTimerElement.innerText = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        if (redTime <= 0) {
            clearInterval(redTimerInterval);
            showWinner('người chơi 1');
        } else {
            redTime--;
            redTimeLeft--;
        }
    }, 1000);
}

function stopTime() {
    if (isRedTurn) {
        clearInterval(redTimerInterval); 
    } else {
        clearInterval(blackTimerInterval);
    }
}

function startTime() {
    if (isRedTurn) {
        startRedPlayerTimer();
    } else {
        startBlackPlayerTimer(); 
    }
}

function switchPlayer() {
    if (isRedTurn) {
        clearInterval(redTimerInterval); 
        startBlackPlayerTimer(); 
        redTimeLeft=  incrementPerMove+redTimeLeft+1;
        isRedTurn = false; 
        isBlackTurn = true; 
    } else {
        clearInterval(blackTimerInterval); 
        startRedPlayerTimer();
        blackTimeLeft=incrementPerMove+blackTimeLeft+1; 
        isRedTurn = true; 
        isBlackTurn = false;
    }
}



