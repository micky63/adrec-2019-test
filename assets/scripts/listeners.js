/**
 * Listener to update the current player's name if updated.
 */
$playerInputs.forEach(function ($playerInput, index) {
    $playerInput.onchange = $playerInput.onkeyup = function () {
        if (currentPlayer === index) {
            updatePlayerName(currentPlayer);
        }
    };
});

/**
 * Listener for square click.
 */
$squares.forEach(function ($square) {
    $square.onclick = function () {
        startGame();
        if (applyTurnSquare($square)) {
            nextTurn();
        }
    };
});

/**
 * Restart the game.
 */
$restartButton.onclick = function () {
    allowStartGame();
};
