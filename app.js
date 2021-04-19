//tableRow and tableID are going to work as the coordinates for each location of the slots
var tableRow = document.getElementsByTagName("tr")
var tableId = document.getElementsByTagName("td")
// tableSlot will be the used to modify the colors of each individual slot on the board
var tableSlot = document.querySelectorAll(".slot")
// this constant will hold display the player's turn every time it rotates between turns
const playerTurn = document.querySelector(".playerTurn")
// 
const reset = document.querySelector(".reset")

var currentPlayer = 1;

//This for loop will be our listener for each click on the game board, it produces the coordiantes to be used for the win game logic

for (let i = 0; i < tableId.length; i++) {
    tableId[i].addEventListener('click', (e) => {
        //the console log is a template literal for the coordinates for each row and column cell.
        console.log(`${e.target.parentElement.rowIndex}`, `${e.target.cellIndex}`)
    })
};


// Player Name Logic 

//variables are stated for player 1 and player 2 as well as their colors. 
var player1;
var player2;
var player1Color = 'red';
var player2Color = 'black';

//this function sets the names in a prompt
var setNames = () => {
    player1 = prompt("enter your name")
    player2 = prompt("enter your name")
    console.log(player1)
    console.log(player2)
}
setNames()

// Color Change Function

var colorChange = (e) => {
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
                //This is the if statement for the winCondition to check for player1's color
                if (horizontalCheck() || verticalCheck() || diagonalCheck1() || diagonalCheck2()) {
                    //if the player meets the conditions of any of the checks then the player's text content will turn into the player's name
                    playerTurn.textContent = `${player1} wins!`;
                    //the template literal will take the text content for player 1 and insert the text that was entered in the prompt as well as "is the winner"
                    return (alert(`${player1} is the winner`))

                }
                else if (fullBoardCheck()) {
                    return (alert('DRAW'))
                }
                else {
                    playerTurn.textContent = `${player2} wins!`
                }
                //when the row is colored with player 1's color it changes the text content of the current player to 2  
                playerTurn.textContent = `${player2}'s turn!`
                //the current player is then changed the the second player
                return currentPlayer = 2;
                //This is literally a copy and paste of player 1's win condition checks but for player 2
            } else {
                row[0].style.backgroundColor = player2Color;
                playerTurn.textContent = `${player2}'s turn!`
                if (horizontalCheck() || verticalCheck() || diagonalCheck1() || diagonalCheck2()) {
                    playerTurn.textContent = `${player2} wins!`;
                    return (alert(`${player2} is the winner`))
                }
                else if (fullBoardCheck()) {
                    return (alert('DRAW'))
                }
                else {
                    playerTurn.textContent = `${player1} wins!`
                }
                playerTurn.textContent = `${player1}'s turn!`
                return currentPlayer = 1
            }
        }
    }
}


//array prototype with the forEach method provides the addEventListener to all Arrays within my document. 
Array.prototype.forEach.call(tableId, (cell) => {
    cell.addEventListener('click', colorChange)
    cell.style.backgroundColor = 'white';
});


//WIN CONDITION FUNCTION 

// Our win con will be used in conjunction with our color change function to match the colors 
var winCondition = (one, two, three, four) => {
    //at it's very base if one through four are strictly equal while not the color white it will return
    return (one == two && one === three && one === four && one !== 'white');

}

//This check is to check if any of the rows have 4 colors IN ORDER that match on the same row

var horizontalCheck = () => {
        for (let row = 0; row < tableRow.length; row++) {
            for (let col = 0; col < 4; col++) {
                if (winCondition(tableRow[row].children[col].style.backgroundColor, tableRow[row].children[col + 1].style.backgroundColor, tableRow[row].children[col + 2].style.backgroundColor, tableRow[row].children[col + 3].style.backgroundColor)) {
                    return true
                }
            }
        }
    }

    //This check is to check if any of the columns have 4 IN ORDER colors that match in a vertical line 
    var verticalCheck = () => {
        for (let col = 0; col < 7; col++) {
            for (let row = 0; row < 3; row++) {
                if (winCondition(tableRow[row].children[col].style.backgroundColor, tableRow[row + 1].children[col].style.backgroundColor, tableRow[row + 2].children[col].style.backgroundColor, tableRow[row + 3].children[col].style.backgroundColor)) {
                    return true
                }
            }
        }
    }

    //this diagonal check is to see if the board has any matches that are from the top down diagonally
    var diagonalCheck1 = () => {
        for (let col = 0; col < 4; col++) {
            for (let row = 0; row < 3; row++) {
                if (winCondition(tableRow[row].children[col].style.backgroundColor, tableRow[row + 1].children[col + 1].style.backgroundColor, tableRow[row + 2].children[col + 2].style.backgroundColor, tableRow[row + 3].children[col + 3].style.backgroundColor)) {
                    return true
                }
            }
        }
    }


    //this diagonal check is to see if the board has any matches that are from the bottom up diagonally 
    var diagonalCheck2 = () => {
        for (let col = 0; col < 4; col++) {
            for (let row = 5; row > 2; row--) {
                if (winCondition(tableRow[row].children[col].style.backgroundColor, tableRow[row - 1].children[col + 1].style.backgroundColor, tableRow[row - 2].children[col + 2].style.backgroundColor, tableRow[row - 3].children[col + 3].style.backgroundColor)) {
                    return true
                }
            }
        }
    }

// If there are no more available white spaces it takes the color of the last player and places it into a new array then returns DRAW in our color change function
    var fullBoardCheck = () => {
        let full = [];
        for (let i = 0; i < tableId.length; i++) {
            if (tableId[i].style.backgroundColor !== 'white') {
                full.push(tableId[i]);
            }
        }
        if (full.length === tableId.length) {
            return true
        }
    }




    //This is for the reset button. When clicked it resets all colors on the board to white without wiping the players names and resets it back to player 1
    reset.addEventListener('click', () => {
        tableSlot.forEach((slot) => {
            slot.style.backgroundColor = 'white';
        });
        
        playerTurn.textContent = `${player1}'s Turn`
        return currentPlayer
    })