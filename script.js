/* ==================================================================================================

    SCRIPT

================================================================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==============================================================================================

        VARIABLES

    ============================================================================================== */

    // List of colours to use for players
    const colours = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'cyan'];

    // Start with min. 2 players
    let playersCount = 2;

    // Use this to store the players object
    let players = {};

    // Declare current player
    let currentPlayer;

    // Get the board & prompt
    let board = document.getElementById('board');
    let promptPlayerTurn = document.getElementById('prompt_player_turn');

    // Get the dices
    let dice1 = document.getElementById('dice_1');
    let dice2 = document.getElementById('dice_2');



    /* ==============================================================================================

        GAME SETUP

    ============================================================================================== */

    // Set up number of players
    document.querySelector('#setup_step_1 button').addEventListener('click', function() {

        // Get the input players count
        playersCount = document.querySelector('#setup_step_1 input').value;

        // Generate the input fields for next step to enter players' names
        var setupPlayerNames = document.getElementById('setup_player_names');
        for ( var i = 0; i < playersCount; i++ ) {
            setupPlayerNames.innerHTML += `
                <div class="setup-player-name">
                    <span>Player ` + (i + 1) + `'s Name</span>
                    <input type="text" name="player_` + (i + 1) + `_name">
                </div>
            `;
        }

        // Display next step
        document.getElementById('setup_step_1').style.display = 'none';
        document.getElementById('setup_step_2').style.display = 'block';
    }, false);


    // Set up the players' names
    document.querySelector('#setup_step_2 button').addEventListener('click', function() {
        
        // Generate the players object with names & colours
        for ( var i = 0; i < playersCount; i++ ) {
            players[i] = {
                'name': document.querySelector('#setup_step_2 input[name="player_' + (i + 1) + '_name"]').value,
                'colour': colours[i]
            }
        }

        // Hide the setup & display the boardgame
        document.getElementById('setup').style.display = 'none';
        document.getElementById('prompt').style.display = 'block';
        generateTiles();

        // Start the game
        startGame();
    }, false);


    // Function to generate the tiles
    function generateTiles() {
        for ( var i = 1; i <= 100; i++ ) {
            switch (i) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                case 10:
                    board.innerHTML += `
                        <div id="tile_` + i + `" class="tile"><div class="tile-players"></div></div>
                    `;
                    break;
                case 11:
                    board.innerHTML += `
                        <div id="tile_28" class="tile"><div class="tile-players"></div></div>
                    `;
                    break;
                case 20:
                    board.innerHTML += `
                        <div id="tile_11" class="tile"><div class="tile-players"></div></div>
                    `;
                    break;
                case 21:
                    board.innerHTML += `
                        <div id="tile_27" class="tile"><div class="tile-players"></div></div>
                    `;
                    break;
                case 30:
                    board.innerHTML += `
                        <div id="tile_12" class="tile"><div class="tile-players"></div></div>
                    `;
                    break;
                case 31:
                    board.innerHTML += `
                        <div id="tile_26" class="tile"><div class="tile-players"></div></div>
                    `;
                    break;
                case 40:
                    board.innerHTML += `
                        <div id="tile_13" class="tile"><div class="tile-players"></div></div>
                    `;
                    break;
                case 41:
                    board.innerHTML += `
                        <div id="tile_25" class="tile"><div class="tile-players"></div></div>
                    `;
                    break;
                case 50:
                    board.innerHTML += `
                        <div id="tile_14" class="tile"><div class="tile-players"></div></div>
                    `;
                    break;
                case 51:
                    board.innerHTML += `
                        <div id="tile_24" class="tile"><div class="tile-players"></div></div>
                    `;
                    break;
                case 52:
                    board.innerHTML += `
                        <div id="tile_23" class="tile"><div class="tile-players"></div></div>
                    `;
                    break;
                case 53:
                    board.innerHTML += `
                        <div id="tile_22" class="tile"><div class="tile-players"></div></div>
                    `;
                    break;
                case 54:
                    board.innerHTML += `
                        <div id="tile_21" class="tile"><div class="tile-players"></div></div>
                    `;
                    break;
                case 55:
                    board.innerHTML += `
                        <div id="tile_20" class="tile"><div class="tile-players"></div></div>
                    `;
                    break;
                case 56:
                    board.innerHTML += `
                        <div id="tile_19" class="tile"><div class="tile-players"></div></div>
                    `;
                    break;
                case 57:
                    board.innerHTML += `
                        <div id="tile_18" class="tile"><div class="tile-players"></div></div>
                    `;
                    break;
                case 58:
                    board.innerHTML += `
                        <div id="tile_17" class="tile"><div class="tile-players"></div></div>
                    `;
                    break;
                case 59:
                    board.innerHTML += `
                        <div id="tile_16" class="tile"><div class="tile-players"></div></div>
                    `;
                    break;
                case 60:
                    board.innerHTML += `
                        <div id="tile_15" class="tile"><div class="tile-players"></div></div>
                    `;
                    break;
                default:
                    board.innerHTML += `
                        <div class="tile tile-empty"></div>
                    `;
                    break;
            }
        }
        board.style.display = 'grid';
    }


    
    /* ==============================================================================================

        GAME START

    ============================================================================================== */

    function startGame() {

        // Random starting tiles
        const randomTiles = [1, 10, 15, 24];

        // Put each player in random starting position
        for ( var key in players ) {
            let randomPosition = randomTiles[Math.floor(Math.random() * randomTiles.length)];
            players[key].position = randomPosition;
            players[key].starting_position = randomPosition;
        }

        // Update the board
        refreshBoard();

        // Chose a random player to start
        currentPlayer = Math.floor(Math.random() * (playersCount - 2) + 1);

        // Display that player's details on the prompt
        promptPlayerTurn.innerHTML = players[currentPlayer - 1].name;
        promptPlayerTurn.style.color = players[currentPlayer - 1].colour;
    }



    /* ==============================================================================================

        GAME RUNNING

    ============================================================================================== */

    // Function to refresh the board ( update board UI )
    function refreshBoard() {

        // First, hide all the players
        let tiles = document.querySelectorAll('.tile-players');
        for ( var i = 0; i < tiles.length; i++ ) {
            tiles[i].innerHTML = '';
        }

        // Generate the players again based on their current positions
        for ( var key in players ) {
            document.querySelector('#tile_' + players[key].position + ' .tile-players').innerHTML += `
                <span id="player_` + (key + 1) + `" class="player" style="background-color: ` + players[key].colour + `"></span>
            `;
        }
    }


    // Each time the button to roll dice is "clicked", move the player to their new position
    document.getElementById('roll_dice').addEventListener('click', function() {
        
        // Get the dice values & display them
        // - dice is 6 | 6 ( min. 2, max. 12 )
        let dice1Value = Math.floor(Math.random() * (6 - 2) + 1);
        let dice2Value = Math.floor(Math.random() * (6 - 2) + 1);
        dice1.innerHTML = dice1Value;
        dice2.innerHTML = dice2Value;

        // Calculate the number of tiles needed to move
        let moves = dice1Value + dice2Value;

        // Get the player's current position and new position
        let currentPosition = players[currentPlayer - 1].position;
        let newPosition = currentPosition + moves;

        // ********** NEED TO ADD CONDITION TO SUMMON NEW PLAYER PIECE
        if ( newPosition > 28 ) {
            players[currentPlayer - 1].position = moves - (28 - currentPosition);
            
        // Move the player
        } else {
            players[currentPlayer - 1].position = players[currentPlayer - 1].position + moves;
        }

        // Update the board
        refreshBoard();

        // Go to next player
        if ( currentPlayer < playersCount ) currentPlayer++;
        else currentPlayer = 1;
        promptPlayerTurn.innerHTML = players[currentPlayer - 1].name;
        promptPlayerTurn.style.color = players[currentPlayer - 1].colour;
    }, false);
});