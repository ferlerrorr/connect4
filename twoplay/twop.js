var playerRed = "R";
var playerYellow = "Y";
var currPlayer = playerRed;

var gameOver = false;
var board;

var rows = 6;
var columns = 7;
var currColumns = []; //keeps track of which row each column is at.

window.onload = function() {
    setGame();
}


//Draggable Circle animation
jQuery(document).ready(function() {

    var mouseX = 0, mouseY = 0;
    var xp = 0, yp = 0;

    $(document).mousemove(function(e){
      mouseX = e.pageX - 30;
      mouseY = e.pageY - 30; 
    });

    setInterval(function(){
      xp += ((mouseX - xp)/6);
      yp += ((mouseY - yp)/6);
      $("#circle").css({left: xp +'px', top: yp +'px'});
    }, 20);

  });

// $('body span').click(function() {
//     $('.circle').removeClass('yellow-piece');
//     $('.circle').addClass('yellow-piece');
// });

// $('body').on('click', function(e){
//     $('span').removeClass('red-piece').addClass('yellow-piece');
//     e.preventDefault();
// });




function setGame() {
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5];

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            // JS
            row.push(' ');
            // HTML
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    
    }
}
let drawcount = 0;
function setPiece() {
    if (gameOver) {
        return;
    }

    //get coords of that tile clicked
    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    // figure out which row the current column should be on
    r = currColumns[c];

    if (r < 0) { // board[r][c] != ' '
        return;
    }

    board[r][c] = currPlayer; //update JS board
    let sp = document.getElementById('circle');
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if (currPlayer == playerRed) {
        tile.classList.add("red-piece");
        currPlayer = playerYellow;
        sp.classList.remove("red-piece");
        sp.classList.add("yellow-piece");
    }
    else {
        tile.classList.add("yellow-piece");
        currPlayer = playerRed;
        sp.classList.remove("yellow-piece");
        sp.classList.add("red-piece");
    }

    r -= 1; //update the row height for that column
    currColumns[c] = r; //update the array
         // Check for the draw condition

    // Check for the draw condition
    drawcount++;
    checkWinner();
    if(drawcount > 41){
     alert('draw');
    }
}


function checkWinner() {
     // horizontal
     for (let r = 0; r < rows; r++) {
         for (let c = 0; c < columns - 3; c++){
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
         }
    }

    // vertical
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // anti diagonal
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // diagonal
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

}

function setWinner(r, c) {
    let winner = document.getElementById("winner");
    if (board[r][c] == playerRed) {
        // alert('Red Wins');
        let confirmAction = confirm("Red Wins - Do you Want to play again?");
        if (confirmAction) {
          window.location.reload();
        } else {
          document.location.href = '../index.html';
        }
    } else if (board[r][c] == playerYellow) {
        // alert('Yellow Wins');
        let confirmAction = confirm("Yellow Wins - Do you Want to play again?");
        if (confirmAction) {
          window.location.reload();
        } else {
          document.location.href = '../index.html';
        }
    }
    gameOver = true;
}
