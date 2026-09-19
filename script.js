var Move_count = 0;

var timerId = null;
var totalSeconds = 0;

var button = document.querySelector(".start-btn");
var clockDisplay = document.querySelector(".clock-time");
var board = document.querySelector(".board");



// ĐỔI GIÂY THÀNH PHÚT:GIÂY


function formatTime(seconds) {
  var minutes = Math.floor(seconds / 60);
  var remainingSeconds = seconds % 60;

  // Nếu số nhỏ hơn 10 thì thêm số 0 phía trước
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  if (remainingSeconds < 10) {
    remainingSeconds = "0" + remainingSeconds;
  }

  return minutes + ":" + remainingSeconds;
}



// XÁO TRỘN BÀN CỜ


function shuffleBoard() {

  // Lấy tất cả các ô trong bàn cờ
  var tiles = Array.from(board.children);

  // Xáo trộn nhiều lần
  for (var count = 0; count < 100; count++) {

    // Đi từ ô cuối về ô đầu
    for (var i = tiles.length - 1; i > 0; i--) {

      // Chọn một vị trí ngẫu nhiên
      var randomIndex = Math.floor(Math.random() * (i + 1));

      // Đổi chỗ 2 ô
      var temp = tiles[i];

      tiles[i] = tiles[randomIndex];
      tiles[randomIndex] = temp;
    }
  }

  // Đưa các ô đã xáo trộn trở lại bàn cờ
  for (var i = 0; i < tiles.length; i++) {
    board.appendChild(tiles[i]);
  }
}

// DI CHUYỂN Ô ĐEN


function moveBlackTile(direction) {

  var tiles = Array.from(board.children);

  // Bàn cờ có 4 cột
  var columns = 4;


  // 1. TÌM Ô ĐEN


  var blackTileIndex = -1;

  for (var i = 0; i < tiles.length; i++) {

    if (tiles[i].classList.contains("tile-empty")) {
      blackTileIndex = i;
      break;
    }
  }


  // 2. TÌM HÀNG VÀ CỘT


  var row = Math.floor(blackTileIndex / columns);
  var column = blackTileIndex % columns;

  var newRow = row;
  var newColumn = column;

  // 3. XÁC ĐỊNH HƯỚNG DI CHUYỂN


  if (direction === "up") {
    newRow -= 1;
  }

  else if (direction === "down") {
    newRow += 1;
  }

  else if (direction === "left") {
    newColumn -= 1;
  }

  else if (direction === "right") {
    newColumn += 1;
  }



  // 4. KIỂM TRA CÓ RA NGOÀI


  if (newRow < 0 || newRow >= 3) {
    return;
  }

  if (newColumn < 0 || newColumn >= 4) {
    return;
  }


  // 5. TÌM Ô CẦN ĐỔI CHỖ


  var newTileIndex = newRow * columns + newColumn;

  var blackTile = tiles[blackTileIndex];
  var movingTile = tiles[newTileIndex];


  // 6. ĐỔI CHỖ 2 Ô
 

  tiles[blackTileIndex] = movingTile;
  tiles[newTileIndex] = blackTile;


  // 7. CẬP NHẬT BÀN CỜ


  for (var i = 0; i < tiles.length; i++) {
    board.appendChild(tiles[i]);
  }


  // Tăng số lượt đi
  count += 1
}



// ĐIỀU KHIỂN BẰNG BÀN PHÍM


window.addEventListener("keydown", function(event) {

  // Nếu game chưa bắt đầu thì không cho di chuyển
  if (timerId === null) {
    return;
  }

  var key = event.key.toLowerCase();


  if (key === "w" || key === "arrowup") {

    event.preventDefault();

    moveBlackTile("up");
  }

  else if (key === "s" || key === "arrowdown") {

    event.preventDefault();

    moveBlackTile("down");
  }

  else if (key === "a" || key === "arrowleft") {

    event.preventDefault();

    moveBlackTile("left");
  }

  else if (key === "d" || key === "arrowright") {

    event.preventDefault();

    moveBlackTile("right");
  }

});


// =========================
// NÚT BẮT ĐẦU / KẾT THÚC
// =========================

button.addEventListener("click", function() {


  // =========================
  // NẾU GAME CHƯA CHẠY
  // =========================

  if (timerId === null) {

    // Xáo trộn bàn cờ
    shuffleBoard();


    // Bắt đầu đếm thời gian
    timerId = setInterval(function() {

      totalSeconds = totalSeconds + 1;

      clockDisplay.textContent = formatTime(totalSeconds);

    }, 1000);


    // Đổi chữ của nút
    button.textContent = "Kết thúc";


    // Đổi màu nút
    button.style.backgroundColor = "#EF4444";
    button.style.color = "#ffffff";
  }


  // =========================
  // NẾU GAME ĐANG CHẠY
  // =========================

  else {

    // Dừng đồng hồ
    clearInterval(timerId);

    // Đặt lại timer
    timerId = null;


    // Đặt thời gian về 0
    totalSeconds = 0;

    clockDisplay.textContent = formatTime(totalSeconds);


    // Đổi nút về ban đầu
    button.textContent = "Bắt đầu";

    button.style.backgroundColor = "";
    button.style.color = "";
  }

});