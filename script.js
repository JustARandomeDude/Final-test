var Move_count = 0;

var timerId = null;
var totalSeconds = 0;

var button = document.querySelector(".start-btn");
var clockDisplay = document.querySelector(".clock-time");
var board = document.querySelector(".board");

var winMessage = document.querySelector(".win-message");

function showWinMessage() {
  winMessage.style.display = "block";
}

function hideWinMessage() {
  winMessage.style.display = "none";
}

function hasPlayerWon() {
  var tiles = Array.from(board.children);

  for (var i = 0; i < tiles.length; i++) {
    if (i === tiles.length - 1) {
      if (!tiles[i].classList.contains("tile-empty")) {
        return false;
      }
    } else {
      if (tiles[i].classList.contains("tile-empty")) {
        return false;
      }

      var tileValue = Number(tiles[i].textContent.trim());

      if (tileValue !== i + 1) {
        return false;
      }
    }
  }

  return true;
}

// sec to min:sec
function formatTime(seconds) {
  var minutes = Math.floor(seconds / 60);
  var remainingSeconds = seconds % 60;

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  if (remainingSeconds < 10) {
    remainingSeconds = "0" + remainingSeconds;
  }

  return minutes + ":" + remainingSeconds;
}
// chịu em không biết 2.2 nghĩa là gì :)
function shuffleBoard() {
  var tiles = Array.from(board.children);

  for (var count = 0; count < 100; count++) {
    for (var i = tiles.length - 1; i > 0; i--) {
      var randomIndex = Math.floor(Math.random() * (i + 1));

      var temp = tiles[i];

      tiles[i] = tiles[randomIndex];
      tiles[randomIndex] = temp;
    }
  }

  for (var i = 0; i < tiles.length; i++) {
    board.appendChild(tiles[i]);
  }
}

function moveBlackTile(direction) {
  var tiles = Array.from(board.children);

  var columns = 4;

  var blackTileIndex = -1;

  for (var i = 0; i < tiles.length; i++) {
    if (tiles[i].classList.contains("tile-empty")) {
      blackTileIndex = i;
      break;
    }
  }

  var row = Math.floor(blackTileIndex / columns);
  var column = blackTileIndex % columns;

  var newRow = row;
  var newColumn = column;

  if (direction === "up") {
    newRow -= 1;
  } else if (direction === "down") {
    newRow += 1;
  } else if (direction === "left") {
    newColumn -= 1;
  } else if (direction === "right") {
    newColumn += 1;
  }

  if (newRow < 0 || newRow >= 3) {
    return;
  }

  if (newColumn < 0 || newColumn >= 4) {
    return;
  }

  var newTileIndex = newRow * columns + newColumn;

  var blackTile = tiles[blackTileIndex];
  var movingTile = tiles[newTileIndex];

  tiles[blackTileIndex] = movingTile;
  tiles[newTileIndex] = blackTile;

  for (var i = 0; i < tiles.length; i++) {
    board.appendChild(tiles[i]);
  }

  Move_count += 1;

  if (hasPlayerWon()) {
    showWinMessage();

    if (timerId !== null) {
      clearInterval(timerId);
      timerId = null;
    }
  }
}

window.addEventListener("keydown", function (event) {
  var key = event.key.toLowerCase();
  if (timerId === null) {
    return;
  }

  if (key === "w" || key === "arrowup") {
    event.preventDefault();

    moveBlackTile("up");
  } else if (key === "s" || key === "arrowdown") {
    event.preventDefault();

    moveBlackTile("down");
  } else if (key === "a" || key === "arrowleft") {
    event.preventDefault();

    moveBlackTile("left");
  } else if (key === "d" || key === "arrowright") {
    event.preventDefault();

    moveBlackTile("right");
  }
});

button.addEventListener("click", function () {
  if (timerId === null) {
    hideWinMessage();
    shuffleBoard();

    timerId = setInterval(function () {
      totalSeconds = totalSeconds + 1;

      clockDisplay.textContent = formatTime(totalSeconds);
    }, 1000);

    button.textContent = "Kết thúc";

    button.style.backgroundColor = "#EF4444";
    button.style.color = "#ffffff";
  } else {
    clearInterval(timerId);

    timerId = null;

    totalSeconds = 0;

    clockDisplay.textContent = formatTime(totalSeconds);
    hideWinMessage();

    button.textContent = "Bắt đầu";

    button.style.backgroundColor = "";
    button.style.color = "";
  }
});
