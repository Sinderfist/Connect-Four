//tableRow and tableID are going to work as the coordinates for each location of the slots
var tableRow = document.getElementsByTagName("tr")
var tableId = document.getElementsByTagName("td")
// tableSlot will be the used to modify the colors of each individual slot on the board
var tableSlot = document.querySelector(".slot")
// this constant will hold display the player's turn every time it rotates between turns
const playerTurn = document.querySelector(".playerTurn")
// 
const reset = document.querySelector(".reset")


//This for loop will be our listener for each click on the game board, it produces the coordiantes to be used for the win game logic

for (let i = 0; i < tableId.length; i++) {
    tableId[i].addEventListener('click', (e) => {
        console.log('${e.target.parentElement.rowIndex}', '${e.target.cellIndex}')
    })
}

// Player Name Logic 

// while player 1 has no name a prompt comes on screen asking for your name and tells you your color
while (!player1) {
    var player1 = prompt('Red player: Enter your name')
}

player1Color = 'red';

// while player 2 has no name a prompt comes on screen asking for your name and tells you your color
while (!player2) {
    var player2 = prompt('Black player: Enter your name')
}

player2Color = 'black';

//current player will always return to 1 after the second player's turn
var currentPlayer = 1;
playerTurn.textContent = '${player1}s Turn';



Array.prototype.forEach.call(tableId, (cell) => {
    cell.addEventListener('click', colorChange)
    cell.style.backgroundColor = 'white';
})


// Color Change Function

var colorChange = () => {
//e.target cell refers to the event that is happening within a specifically clicked cell on a column
    let column = e.target.cellIndex;
//row will be our empty array
    let row = [];
//letting i start at 5 means it will start at the bottom of the column and -1 will mean that it will count upwards for every iteration 
    for (let i = 5; i > -1; i--) {
//if the row is 5 and column background color are equal to white then when clicked will transfer to player 1's color
        if (tableRow[i].children[column].style.backgroundColor == 'white') {
// if the selected cell is white then it gets pushed into a new array
            row.push(tableRow[i].children[column]);
//when that cell gets pushed into a new array it is then colored with the current player's color
            if (currentPlayer === 1) {
                row[0].style.backgroundColor = player1Color;
            }
        }
    }
}

