/**
 * Clear crosses and circles contains in the grid.
 */
function clearGrid() {
    $squares.forEach(function ($square) {
        var $squareText = $square.querySelector('.square-text');
        // $squareText.className = 'square-text';
        playerClasses.forEach(function (cssClass) {
            $squareText.classList.remove(cssClass);
        });
    });
}

/**
 *
 * @param {boolean} enable
 */
function enableRestartButton(enable) {
    if (enable) {
        $restartButton.style.display = 'inline';
    } else {
        $restartButton.style.display = 'none';
    }
}

/**
 * Enable or disable player inputs.
 * @param {boolean} enable
 */
function enablePlayerInputs(enable) {
    $playerInputs.forEach(function ($input) {
        $input.disabled = !enable;
    });
}

/**
 * Select the right player for the next turn.
 */
function nextPlayer() {
    currentPlayer++;

    if ($playerInputs.length <= currentPlayer) {
        currentPlayer = 0;
    }

    updatePlayerName(currentPlayer);
}

/**
 * Return the current player's name.
 * @return {string}
 */
function getCurrentPlayerName() {
    var currentPlayerName = $playerInputs.item(currentPlayer).value;

    if (null === currentPlayerName || '' === currentPlayerName) {
        currentPlayerName = 'Joueur ' + (currentPlayer + 1);
    }

    return currentPlayerName;
}

/**
 * Update the current player's name in the span.
 */
function updatePlayerName() {
    $currentPlayerName.innerHTML = getCurrentPlayerName();
}

/**
 * Apply the cross or the circle to the given square.
 * @param $square
 * @return {boolean} true if class applied, false otherwise.
 */
function applyTurnSquare($square) {
    var $squareText = $square.querySelector('.square-text');

    // Check if the given square has not already been set.
    var canApply = true;
    playerClasses.forEach(function (cssClass) {
        if ($squareText.classList.contains(cssClass)) {
            alert('Case déjà remplie !');
            canApply = false;
        }
    });

    if (canApply) {
        $squareText.classList.add(playerClasses[currentPlayer]);
        clickCounter++;

        return true;
    }

    return false;
}

/**
 * Execute stuff to go to the next turn: select right player and run victory check.
 */
function nextTurn() {
    var isFinished = isGameFinished();

    if (true === isFinished) {
        setTimeout(function () {
            alert(getCurrentPlayerName() + ' à gagné !');
        });
    } else if (null === isFinished) {
        setTimeout(function () {
            alert('Match nul !');
        });
    } else{
        nextPlayer();
    }
}

/**
 * Ready to start a new game.
 */
function allowStartGame() {
    isGameStarted = false;
    currentPlayer = 0;
    clickCounter = 0;
    clearGrid();
    enablePlayerInputs(true);
    enableRestartButton(false);
    updatePlayerName();
}

/**
 * Run just after the beginning of the game.
 */
function startGame() {
    if (!isGameStarted) {
        isGameStarted = true;
        enablePlayerInputs(false);
        enableRestartButton(true);
    }
}

/**
 * Return true if the game is finished, false otherwise.
 * @return {boolean|null}
 */
function isGameFinished() {
    var currentMatrix = getWinMatrix();
    var classToCheck = playerClasses[currentPlayer];

    for (var i = 0; i < $squares.length; i++) {
        var $squareText = $squares[i].querySelector('.square-text');

        if ($squareText.classList.contains(classToCheck)) {
            for (var j = 0; j < currentMatrix.length; j++) {
                var winCase = currentMatrix[j];
                var hasWinIndex = winCase.indexOf(i);

                if (-1 !== hasWinIndex) {
                    winCase.splice(hasWinIndex, hasWinIndex + 1);

                    // WIN !!!
                    if (0 === winCase.length) {
                        return true;
                    }

                    currentMatrix[j] = winCase;
                }
            }
        }
    }

    if (clickCounter === $squares.length) {
        return null;
    }

    return false;
}

/**
 * Get the winning Matrix.
 * @return {*[]}
 */
function getWinMatrix() {
    return [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        [0, 4, 8],
        [2, 4, 6],
    ];
}
