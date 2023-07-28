/*----- constants -----*/
// this is going to hold things like, players, colors, anything that might be useful to refer to, but doesn't change a whole lot over the course of gameplay
// the constants for this game are going to be an object, that relates players to colors, so player 1 plays one color, player 2 another, or initialize a 'blank' color, for when no moves have been made.
const COLORS = {
    0: 'white',
    1: 'purple',
    // we can use a string, to hold a negative number
    '-1': 'orange'
}

/*----- state variables -----*/
// things we want to check and refer to, in order to render properly the changes made to our state
let board // an array of 7 nested arrays
// the board will track who made which moves and where
let turn // will be a value of 1 or -1 (1 || -1)
let winner // null || 1 || -1 || 'T'

/*----- cached elements  -----*/
// grabbing our html elements and saving them to variables for later use
const messageEl = document.querySelector('h2')
const playAgainButton = document.querySelector('button')
// for marker elements, we want to save a NodeList
// a NodeList !== Array
// we want to convert our NodeList to an array, so we can track the changes
// ... = spread operator
// takes a copy of whatever (object, NodeList, HTMLCollection, array) pushes those copies into an array (bc we used array brackets -> [])
const markerEls = [...document.querySelectorAll('#markers > div')]

// console.log('this is the playAgainButton', playAgainButton)
// console.log('this is messageEl', messageEl)
// console.log('this is markersEl', markerEls)

/*----- functions -----*/
// things like, initialize the game(set values for our state variables)
// init() -> will initialize a new game(empty the board)
init() //called at the very beginning
// this initializes the game with starting values
function init() {
    // set values for our initial state variables
    turn = 1
    winner = null

    board = [
        [0, 0, 0, 0, 0, 0], // col 0
        [0, 0, 0, 0, 0, 0], // col 1
        [0, 0, 0, 0, 0, 0], // col 2
        [0, 0, 0, 0, 0, 0], // col 3
        [0, 0, 0, 0, 0, 0], // col 4
        [0, 0, 0, 0, 0, 0], // col 5
        [0, 0, 0, 0, 0, 0]  // col 6
    ]

    render()
}

function renderBoard() {
    // loop over our array that represents the board
    // apply a specific background color for each element
    board.forEach((colArr, colIdx) => {
        // console.log('this is colArr', colArr)
        // console.log('this is colIdx', colIdx)
        // console.log('=======================')
        // loop over our column arrays
        colArr.forEach((cellVal, rowIdx) => {
            // console.log('this is cellVal', cellVal)
            // console.log('this is rowIdx', rowIdx)
            // determining the cell's id
            const cellId = `c${colIdx}r${rowIdx}`
            // console.log('this is cellId', cellId)
            // target each cell(the actual element)
            const cellEl = document.getElementById(cellId)
            // console.log('this is cellEl', cellEl)
            // applies the color associated with the value of the div in it's current state
            cellEl.style.backgroundColor = COLORS[cellVal]
        })
    })
}

// render controls -> changes the visibility of our play again button
function renderControls() {
    // change initial visibility of the button
    // ask a question ? if true do this : if false do that
    playAgainButton.style.visibility = winner ? 'visible' : 'hidden'
    // change visibility of our marker buttons
    markerEls.forEach((markerEl, colIdx) => {
        const hideMarker = !board[colIdx].includes(0) || winner

        markerEl.style.visibility = hideMarker ? 'hidden' : 'visible'

    })
}

// render message based on whose turn it is
function renderMessage() {
    // message is a tie
    if (winner === 'T') {
        messageEl.innerText = "It's a Tie!!!!!"
    // message the winner
    } else if (winner) {
        messageEl.innerHTML = `
            <span style="color: ${COLORS[winner]}">
                ${COLORS[winner].toUpperCase()}
            </span> Wins!
        `
    // message the current turn
    } else {
        messageEl.innerHTML = `
            <span style="color: ${COLORS[turn]}">
                ${COLORS[turn].toUpperCase()}
            </span>'s turn!
        `
    }
}
// render() -> display changes when they are relevant
// our render function MIGHT call other, more specific render functions (like for the board, messages, etc)
function render() {
    // render our board
    renderBoard()
    // render our messages
    renderMessage()
    // render our controls
    renderControls()
}
// checkforawinner() -> checks for win conditions(horizontal, vertical, diagonal) (we might want multiple functions for this)
// handleDrop -> determines which column, and displays(or calls a render function) for a 'game piece' to be displayed
// check if a move is valid(maybe)
// handleDrop is going to be associated with a click event
// which means we need and event parameter
function handleDrop(event) {
    // console.log('target of the click \n', event)
    // needs to relate a click to the column selected
    const colIdx = markerEls.indexOf(event.target)
    console.log('this is colIdx in handleDrop \n', colIdx)
    // determine if the move is valid, and what to do if it is not
    // we need to assign a value to a specific board element
    const colArr = board[colIdx]
    console.log('this is colArr', colArr)
    // indexOf returns the first thing it encounters(when we use 0 as the argument)
    const rowIdx = colArr.indexOf(0)
    // if the move is invalid, exit the function
    if (rowIdx === -1) return
    console.log('this is rowidx', rowIdx)
    // assign a value using these two variabls(colArr, rowIdx)
    colArr[rowIdx] = turn
    // change the turn after things have happened
    turn *= -1
    ////////////////////////////////////
    // 
    // check for a winner
    // 
    /////////////////////////////////////
    // render the changes to the board
    render()
}


/*----- event listeners -----*/
// what events will happen, what should they be attached to, and what functions do they call
// click on a marker
document.getElementById('markers').addEventListener('click', handleDrop)
// click playAgain button