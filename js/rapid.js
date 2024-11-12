


// Lấy thời gian từ localStorage
// let timePerPlayer = parseInt(localStorage.getItem("timePerPlayer"),10)|| 600; // Mặc định là 10 phút nếu không có giá trị
let timePerPlayer = 50;
let incrementPerMove = parseInt(localStorage.getItem("incrementPerMove"),10) || 5; // Mặc định là 5 giây nếu không có giá trị
let timeLeft = timePerPlayer;

// Hàm đếm ngược
function initTimer() {
    const timerElementDen = document.getElementById('timerDen');
    const timerElementDo = document.getElementById('timerDo');

    // Tính toán phút và giây
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    
    // Định dạng thời gian cho đẹp
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
    // Lấy phần tử DOM hiển thị đồng hồ cờ đen
    const blackTimerElement = document.getElementById('timerDen');
    

    // Bắt đầu đồng hồ cờ đen
    blackTimerInterval = setInterval(() => {
        const minutes = Math.floor(blackTime / 60); // Tính phút
        const seconds = blackTime % 60; // Tính giây
        blackTimerElement.innerText = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        if (blackTime <= 0) {
            clearInterval(blackTimerInterval); // Dừng đồng hồ khi hết giờ
            showWinner('người chơi 1');
        } else {
            blackTime--;
            blackTimeLeft--;  // Giảm thời gian mỗi giây

        }
    }, 1000); // Thực hiện mỗi giây
}

// Hàm này sẽ dừng đồng hồ của cờ đen và bắt đầu đồng hồ của cờ đỏ khi cờ đỏ đi xong
function startRedPlayerTimer() {
    redTime = redTimeLeft;
    const redTimerElement = document.getElementById('timerDo');


    redTimerInterval = setInterval(() => {
        const minutes = Math.floor(redTime / 60);
        const seconds = redTime % 60;
        redTimerElement.innerText = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        if (redTime <= 0) {
            clearInterval(redTimerInterval);
            showWinner('người chơi 2');
        } else {
            redTime--;
            redTimeLeft--;
        }
    }, 1000);
}

function switchPlayer() {
    // Khi người chơi cờ đỏ hoàn thành lượt đi, dừng đồng hồ cờ đỏ và bắt đầu đồng hồ cờ đen
    if (isRedTurn) {
        clearInterval(redTimerInterval);  // Dừng đồng hồ cờ đỏ
        startBlackPlayerTimer(); 
        redTimeLeft=  incrementPerMove+redTimeLeft+1;// Bắt đầu đồng hồ cờ đen
        isRedTurn = false; // Chuyển sang lượt cờ đen
        isBlackTurn = true; // Cờ đen tiếp theo
    } else {
        clearInterval(blackTimerInterval); // Dừng đồng hồ cờ đen
        startRedPlayerTimer();
        blackTimeLeft=incrementPerMove+blackTimeLeft+1; // Bắt đầu đồng hồ cờ đỏ
        isRedTurn = true; // Cờ đỏ tiếp theo
        isBlackTurn = false; // Chuyển sang lượt cờ đỏ
    }
}



