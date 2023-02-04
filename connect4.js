/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  // iterate (HEIGHT = 6) number of times
  for (let y = 0; y <HEIGHT; y++) {
    // after each iteration push an array with WIDTH
    // number of elements to the empty board array
    board.push(Array.from({length: WIDTH}));
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const board = document.getElementById('board');

  // TODO: add comment for this code
  // create a table row assigned assigned to 'top' variable 
  // top will not be part of actual game board
  const top = document.createElement("tr");
  // add element id of column top
  top.setAttribute("id", "column-top");
  // add a click event listener with function name of handleClick
  top.addEventListener("click", handleClick);

  // iterate (WIDTH =7) number of times
  for (let x = 0; x < WIDTH; x++) {
    // create a table data element with variable of headCell
    const headCell = document.createElement("td");
    // add an id of 'id' where x icrements with each iteration
    // each td element will have different id
    headCell.setAttribute("id", x);
    // add the headcell to the 'top' table row
    top.append(headCell);
  } //once complete add to the board
  board.append(top);

  // TODO: add comment for this code
  // do the same and iterate (HEIGHT=6) number of times
  for (let y = 0; y < HEIGHT; y++) {
    // create table row with a variable of row
    const row = document.createElement("tr");
    // iterate (WIDTH =7) number of times 
    for (let x = 0; x < WIDTH; x++) {
      // create the table data element with variable of cell
      const cell = document.createElement("td");
      // give each new cell a unique id of 'y-x' using a template literal
      cell.setAttribute("id", `${y}-${x}`);
      // add the td element to the row with append
      row.append(cell);
    }
    // add row to to the htmlBoard
    board.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
    // loop through rows from bottom
    for (let y = HEIGHT - 1; y >= 0; y--) {
      // is current cell empty?
      if (!board[y][x]) {
        // if it is return y, row number
        return y;
      }
    }
    return null;
  }

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement('div');
  // add class of piece
  piece.classList.add('piece')
  // add class name of curremt player using template literal
  piece.classList.add(`p${currPlayer}`);
  // add css style
  piece.style.top = -10 * (y + 2);

  // **
  const spot = document.getElementById(`${y}-${x}`);
  spot.append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);
  

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (board.every(row => row.every(cell => cell)))
    return endGame('Tie!');

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  if (currPlayer === 1) {
    currPlayer = 2;
  } else {
    currPlayer = 1;
  }
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 && y < HEIGHT && x >= 0 && x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.
  // iterate over every cell row/column on the board with for loops
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {

      // these arrays display the win combinations
      // horizontal, vertical and diagnals
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      // run _win function with each of arrays
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        // return true if _win returns true
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
