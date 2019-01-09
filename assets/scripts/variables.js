/////////////////
// Game status //
/////////////////
/**
 * Keep save the state of the game (started or not)
 * @type {boolean}
 */
var isGameStarted = false;

/**
 * Keep the index of the current player.
 * @type {number}
 */
var currentPlayer = 0;

/**
 * Keep the number of click done on the grid.
 * @type {number}
 */
var clickCounter = 0;

/**
 * Restart button
 * @type {HTMLButtonElement}
 */
var $restartButton = document.querySelector('#restart-button');

/////////////////
//   Players   //
/////////////////
/**
 * List of input use to set players' name.
 * @type {NodeListOf<HTMLInputElement>}
 */
var $playerInputs = document.querySelectorAll('input[id^="player-"]');

/**
 * Span use to display the current player's name.
 * @type {HTMLSpanElement}
 */
var $currentPlayerName = document.querySelector('#player-name-display');

/**
 * List of css classes use in the grid to display crosses and circles.
 * Indexed by players' index.
 * @type {string[]}
 */
var playerClasses = [
    'square-text-red',
    'square-text-blue',
];

/////////////////
//    Grid     //
/////////////////
/**
 * List of div square.
 * @type {NodeListOf<HTMLDivElement>}
 */
var $squares = document.querySelectorAll('.square-wrapper .square-line .square');
