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
// render() -> display changes when they are relevant
// our render function MIGHT call other, more specific render functions (like for the board, messages, etc)
function render() {
    // render our board
    renderBoard()
    // render our messages
    // render our controls
}
// checkforawinner() -> checks for win conditions(horizontal, vertical, diagonal) (we might want multiple functions for this)
// handleAPlayerChoice -> determines which column, and displays(or calls a render function) for a 'game piece' to be displayed
// check if a move is valid(maybe)


/*----- event listeners -----*/
// what events will happen, what should they be attached to, and what functions do they call