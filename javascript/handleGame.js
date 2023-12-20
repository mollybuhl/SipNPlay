"use strict";

// Function to render start game page
function renderStartGame(game, category) {
    let main = document.querySelector("main");
    main.removeAttribute("class");
    main.classList.add("startGame");

    main.innerHTML = `
    <h3>Your Name</h3>
    <input type="text" class="name" placeholder="Type here..."></input>
    <h4>What do you want to do?</h4>
    <button class="createGame longButton">Create Game</button>
    <button class="joinGame clearDesign longButton">Join Game</button>
    `;

    // Render create game when clicking create
    main.querySelector(".createGame").addEventListener("click", () => {
        let creatorName = document.querySelector(".name").value;

        // If name is longer than 10 characters, ask to pick another name
        if (creatorName.length > 10) {
            let popUp = document.createElement("div");
            popUp.setAttribute("id", "leaveGamePopUp");

            popUp.innerHTML = `
            <div class="oneButtonPopUp">
                <p>Please pick another name, your name can only be 10 characters long</p>
                <div>   
                    <button class="closePopup">OK</button>
                </div>
            </div>
            `;

            document.querySelector("main").appendChild(popUp);

            // Close pop up and keep playing
            popUp.querySelector(".closePopup").addEventListener("click", () => {
                popUp.remove();
            })
        } else {
            createGame(game, category, creatorName);
        }
    });

    // Render join game when clicking join
    main.querySelector(".joinGame").addEventListener("click", () => {

        // Send name to function
        let playerName = document.querySelector(".name").value;

        if (playerName.length > 10) {
            let popUp = document.createElement("div");
            popUp.setAttribute("id", "leaveGamePopUp");

            popUp.innerHTML = `
            <div class="oneButtonPopUp">
                <p>Please pick another name, your name can only be 10 characters long</p>
                <div>   
                    <button class="closePopup">OK</button>
                </div>
            </div>
            `;

            document.querySelector("main").appendChild(popUp);

            // Close pop up and keep playing
            popUp.querySelector(".closePopup").addEventListener("click", () => {
                popUp.remove();
            })
        } else {
            joinGame(playerName);
        }
    });

}

// Function to create a new game, will be called by host of the game after clicking create game
async function createGame(game, category, creatorName) {

    // Create a game
    let requestData = {
        action: "createGame",
        name: creatorName
    }

    let gameId = await handleGameFetch(requestData);

    // Save gameId in local storage and set currentGame to true
    window.localStorage.setItem("currentGame", "true");
    window.localStorage.setItem("gameId", gameId);
    window.localStorage.setItem("playerName", creatorName);
    window.localStorage.setItem("host", true);

    // Present game status
    let main = document.querySelector("main");
    main.innerHTML = `
    <h2>GAME PIN</h2>
    <div class="gameId">${gameId}</div>
    <h4>Participants</h4>
    <div class="participants"></div>
    <p class="waitingText">Waiting on others to join the game...</p>
    `;

    let footer = document.querySelector("footer");
    footer.removeAttribute("class");
    footer.innerHTML = `
    <div class="buttonQuit">
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
        <path d="M0.325756 8.7026C0.337756 8.7126 0.353755 8.7166 0.365755 8.7266L8.07976 15.7086C8.51376 16.0986 9.21776 16.0986 9.65176 15.7086C9.65576 15.7046 9.65776 15.7006 9.65976 15.6966C9.76485 15.6098 9.84972 15.5012 9.90845 15.3782C9.96717 15.2552 9.99833 15.1209 9.99976 14.9846L9.99976 1.0186C9.99751 0.879825 9.96483 0.743234 9.904 0.618477C9.84318 0.49372 9.7557 0.383841 9.64776 0.2966L9.65176 0.292601C9.43338 0.103861 9.15439 0 8.86576 0C8.57712 0 8.29813 0.103861 8.07976 0.292601L0.325756 7.2906C0.223635 7.37772 0.141628 7.48596 0.0853958 7.60784C0.0291634 7.72973 4.19617e-05 7.86237 4.19617e-05 7.9966C4.19617e-05 8.13083 0.0291634 8.26347 0.0853958 8.38536C0.141628 8.50724 0.223635 8.61548 0.325756 8.7026Z" fill="#C1C1C1"/>
        </svg>
        <p>QUIT</p>
    </div>
    <button id="startGameButton">START</button>
    `;

    // Leave current game when clicking QUIT
    document.querySelector(".buttonQuit").addEventListener("click", () => {
        // Stop fetching current players
        clearInterval(updatePlayes);

        renderCategories(game);
    })

    // Disable button until others have joined the game
    let startButton = document.getElementById("startGameButton")
    startButton.disabled = true;

    // Fetch current players every second
    requestData = {
        action: "getPlayers",
        gameId: gameId
    }

    let displayedPlayers = []; //To keep track of who is already displaying
    let updatePlayes = setInterval(async () => {
        let currentPlayers = await handleGameFetch(requestData);
        let index = 0;

        // Display new palyers
        currentPlayers.forEach(player => {
            if (!displayedPlayers.includes(player)) {
                let playerName = document.createElement("div");
                playerName.classList.add(player);
                if (player === creatorName) {
                    playerName.classList.add("host");
                    playerName.innerHTML = `
                    <p>${player}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="29" viewBox="0 0 28 29" fill="none">
                    <path d="M24.5 7.67594C24.9641 7.67594 25.4093 7.8669 25.7374 8.20681C26.0656 8.54672 26.25 9.00774 26.25 9.48844C26.25 9.96915 26.0656 10.4302 25.7374 10.7701C25.4093 11.11 24.9641 11.3009 24.5 11.3009C24.381 11.2908 24.2636 11.2665 24.15 11.2284L23.6863 11.0653C23.4822 10.9585 23.3031 10.807 23.1613 10.6213L22.8638 10.1228C22.7792 9.91632 22.7346 9.69462 22.7325 9.47032C22.7348 9.23229 22.7823 8.99707 22.8724 8.77807C22.9625 8.55907 23.0933 8.36059 23.2574 8.19397C23.4215 8.02734 23.6158 7.89583 23.829 7.80695C24.0422 7.71807 24.2702 7.67355 24.5 7.67594ZM14 5.86344C14.4325 5.86344 14.8473 6.04074 15.1539 6.3566C15.4605 6.67246 15.6339 7.10118 15.6363 7.54907C15.633 7.82139 15.565 8.08869 15.4384 8.32736C15.3117 8.56602 15.1302 8.76871 14.91 8.91751L14.6125 9.06251C14.4201 9.14144 14.2157 9.1844 14.0088 9.18938C13.7979 9.18628 13.5898 9.14008 13.3963 9.05344L13.2213 8.94469C12.962 8.8081 12.7436 8.60096 12.5894 8.34549C12.4353 8.09003 12.3512 7.7959 12.3463 7.49469C12.3555 7.0492 12.5346 6.62561 12.8445 6.31653C13.1544 6.00745 13.5698 5.83803 14 5.84532V5.86344ZM10.5 14.8263L13.1688 10.3675C13.7072 10.5609 14.2928 10.5609 14.8313 10.3675L17.5 14.8081L22.47 11.6091C22.6236 11.7647 22.7938 11.9015 22.9775 12.0169L20.615 19.3666H7.39376L5.03126 12.0169C5.21493 11.9015 5.38521 11.7647 5.53876 11.6091L10.5 14.8263ZM3.50001 7.95688C3.69682 7.95568 3.89191 7.99494 4.07397 8.07239C4.25603 8.14985 4.42143 8.26395 4.56061 8.40809C4.69978 8.55224 4.80995 8.72355 4.88473 8.91211C4.95951 9.10067 4.99742 9.30272 4.99626 9.50657C4.99358 9.69587 4.95802 9.88313 4.89126 10.0594L4.63751 10.4853C4.47695 10.6843 4.27047 10.8382 4.03722 10.9325C3.80397 11.0269 3.55149 11.0587 3.30319 11.0251C3.05488 10.9915 2.8188 10.8935 2.61681 10.7402C2.41482 10.5869 2.25346 10.3833 2.1477 10.1482C2.04193 9.9131 1.99519 9.65416 2.01179 9.39537C2.02839 9.13658 2.1078 8.88632 2.24266 8.66779C2.37752 8.44926 2.56347 8.26952 2.78327 8.14525C3.00306 8.02098 3.24959 7.95618 3.50001 7.95688ZM20.6763 23.3088H7.35001V21.3331H20.6763V23.3088Z" fill="#E7538C"/>
                    </svg>
                    `;
                } else {
                    playerName.textContent = player;
                }
                displayedPlayers.push(player);

                document.querySelector(".participants").appendChild(playerName);
            }
        });

        // Remove display of players who no longer is playing
        displayedPlayers.forEach(displayedPlayer => {
            if (!currentPlayers.includes(displayedPlayer)) {
                displayedPlayers.splice(index, 1);

                let displayedName = document.querySelector(`.${displayedPlayer}`);
                displayedName.remove();
            }
            index++;
        });

        // If more than 2 players joined the game, remove "waiting for others" and enable start button
        if (displayedPlayers.length >= 2) {

            // Remove waiting text
            if (document.querySelector(".waitingText")) {
                document.querySelector(".waitingText").remove();
            }

            // Enable start game button
            let startButton = document.getElementById("startGameButton");
            startButton.disabled = false;

        } else if (!document.querySelector(".waitingText")) {

            // If game has less than 2 participants but there is no waiting text, creat this
            let waitingText = document.createElement("p");
            waitingText.classList.add("waitingText");
            waitingText.textContent = "Waiting on others to join the game...";
            main.appendChild(waitingText);

            let startButton = document.getElementById("startGameButton");
            startButton.disabled = true;
        }
    }, 1000);

    // When clicking start game stop updating players and start game based on user input
    document.getElementById("startGameButton").addEventListener("click", async () => {

        // Stop fetching players
        clearInterval(updatePlayes);

        //Update game status for other players
        requestData = {
            action: "startGame",
            gameId: gameId,
            game: game,
            category: category
        }

        let gameStarted = await handleGameFetch(requestData);

        // Start game based on user input
        switch (game) {
            case "Most Likely To":
                renderMostLikelyTo(category, gameId);
                window.localStorage.setItem("game", "Most Likely To");
                break;
            case "Truth or Dare":
                truthORDareHandle(category, gameId);
                window.localStorage.setItem("game", "Truth or Dare");
                break;
            case "Would You Rather":
                renderWouldYouRather(category, gameId);
                window.localStorage.setItem("game", "Would You Rather");
                break;
            case "Fill In The Blank":
                renderFillInTheBlank(category, gameId);
                window.localStorage.setItem("game", "Fill In The Blank");
                break;
            case "Spin The Bottle":
                spinTheBottleHandle(gameId)
                window.localStorage.setItem("game", "Spin The Bottle");
                break;
        }
    });
}

// This function will be called when the host has already created a game but is starting a new gameplay
async function startNewGame(game, category) {
    let gameId = localStorage.getItem("gameId");

    // Loading page for current players
    // Present game status
    let main = document.querySelector("main");
    main.removeAttribute("class");
    main.classList.add("startGame");

    main.innerHTML = `
    <h2>GAME PIN</h2>
    <div class="gameId">${gameId}</div>
    <h4>Participants</h4>
    <div class="participants"></div>
    <p class="waitingText">Waiting on others to join the game...</p>
    `;

    let footer = document.querySelector("footer");
    footer.removeAttribute("class");
    footer.innerHTML = `
    <div class="buttonQuit">
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
        <path d="M0.325756 8.7026C0.337756 8.7126 0.353755 8.7166 0.365755 8.7266L8.07976 15.7086C8.51376 16.0986 9.21776 16.0986 9.65176 15.7086C9.65576 15.7046 9.65776 15.7006 9.65976 15.6966C9.76485 15.6098 9.84972 15.5012 9.90845 15.3782C9.96717 15.2552 9.99833 15.1209 9.99976 14.9846L9.99976 1.0186C9.99751 0.879825 9.96483 0.743234 9.904 0.618477C9.84318 0.49372 9.7557 0.383841 9.64776 0.2966L9.65176 0.292601C9.43338 0.103861 9.15439 0 8.86576 0C8.57712 0 8.29813 0.103861 8.07976 0.292601L0.325756 7.2906C0.223635 7.37772 0.141628 7.48596 0.0853958 7.60784C0.0291634 7.72973 4.19617e-05 7.86237 4.19617e-05 7.9966C4.19617e-05 8.13083 0.0291634 8.26347 0.0853958 8.38536C0.141628 8.50724 0.223635 8.61548 0.325756 8.7026Z" fill="#C1C1C1"/>
        </svg>            
        <p>QUIT</p>
    </div>
    <button id="startGameButton">START</button>
    `;

    // Leave game when clicking QUIT
    document.querySelector(".buttonQuit").addEventListener("click", () => {
        clearInterval(updatePlayes);
        renderCategories(game);
    })

    // Disable button until others have joined the game
    let startButton = document.getElementById("startGameButton")
    startButton.disabled = true;

    // Get host name
    let creatorName = window.localStorage.getItem("playerName");

    // Fetch current players every second
    let requestData = {
        action: "getPlayers",
        gameId: gameId
    }

    let displayedPlayers = []; //To keep track of who is already displaying
    let updatePlayes = setInterval(async () => {
        let currentPlayers = await handleGameFetch(requestData);
        let index = 0;

        // Display new palyers
        currentPlayers.forEach(player => {
            if (!displayedPlayers.includes(player)) {
                let playerName = document.createElement("div");
                playerName.classList.add(player);
                if (player === creatorName) {
                    playerName.classList.add("host");
                    playerName.innerHTML = `
                    <p>${player}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="29" viewBox="0 0 28 29" fill="none">
                    <path d="M24.5 7.67594C24.9641 7.67594 25.4093 7.8669 25.7374 8.20681C26.0656 8.54672 26.25 9.00774 26.25 9.48844C26.25 9.96915 26.0656 10.4302 25.7374 10.7701C25.4093 11.11 24.9641 11.3009 24.5 11.3009C24.381 11.2908 24.2636 11.2665 24.15 11.2284L23.6863 11.0653C23.4822 10.9585 23.3031 10.807 23.1613 10.6213L22.8638 10.1228C22.7792 9.91632 22.7346 9.69462 22.7325 9.47032C22.7348 9.23229 22.7823 8.99707 22.8724 8.77807C22.9625 8.55907 23.0933 8.36059 23.2574 8.19397C23.4215 8.02734 23.6158 7.89583 23.829 7.80695C24.0422 7.71807 24.2702 7.67355 24.5 7.67594ZM14 5.86344C14.4325 5.86344 14.8473 6.04074 15.1539 6.3566C15.4605 6.67246 15.6339 7.10118 15.6363 7.54907C15.633 7.82139 15.565 8.08869 15.4384 8.32736C15.3117 8.56602 15.1302 8.76871 14.91 8.91751L14.6125 9.06251C14.4201 9.14144 14.2157 9.1844 14.0088 9.18938C13.7979 9.18628 13.5898 9.14008 13.3963 9.05344L13.2213 8.94469C12.962 8.8081 12.7436 8.60096 12.5894 8.34549C12.4353 8.09003 12.3512 7.7959 12.3463 7.49469C12.3555 7.0492 12.5346 6.62561 12.8445 6.31653C13.1544 6.00745 13.5698 5.83803 14 5.84532V5.86344ZM10.5 14.8263L13.1688 10.3675C13.7072 10.5609 14.2928 10.5609 14.8313 10.3675L17.5 14.8081L22.47 11.6091C22.6236 11.7647 22.7938 11.9015 22.9775 12.0169L20.615 19.3666H7.39376L5.03126 12.0169C5.21493 11.9015 5.38521 11.7647 5.53876 11.6091L10.5 14.8263ZM3.50001 7.95688C3.69682 7.95568 3.89191 7.99494 4.07397 8.07239C4.25603 8.14985 4.42143 8.26395 4.56061 8.40809C4.69978 8.55224 4.80995 8.72355 4.88473 8.91211C4.95951 9.10067 4.99742 9.30272 4.99626 9.50657C4.99358 9.69587 4.95802 9.88313 4.89126 10.0594L4.63751 10.4853C4.47695 10.6843 4.27047 10.8382 4.03722 10.9325C3.80397 11.0269 3.55149 11.0587 3.30319 11.0251C3.05488 10.9915 2.8188 10.8935 2.61681 10.7402C2.41482 10.5869 2.25346 10.3833 2.1477 10.1482C2.04193 9.9131 1.99519 9.65416 2.01179 9.39537C2.02839 9.13658 2.1078 8.88632 2.24266 8.66779C2.37752 8.44926 2.56347 8.26952 2.78327 8.14525C3.00306 8.02098 3.24959 7.95618 3.50001 7.95688ZM20.6763 23.3088H7.35001V21.3331H20.6763V23.3088Z" fill="#E7538C"/>
                    </svg>
                    `;
                } else {
                    playerName.textContent = player;
                }
                displayedPlayers.push(player);

                document.querySelector(".participants").appendChild(playerName);
            }
        });

        // Remove display of players who no longer is playing
        displayedPlayers.forEach(displayedPlayer => {
            if (!currentPlayers.includes(displayedPlayer)) {
                displayedPlayers.splice(index, 1);

                let displayedName = document.querySelector(`.${displayedPlayer}`);
                displayedName.remove();
            }
            index++;
        });

        // If more than 2 players joined the game, remove "waiting for others" and enable start button
        if (displayedPlayers.length >= 2) {

            // Remove waiting text
            if (document.querySelector(".waitingText")) {
                document.querySelector(".waitingText").remove();
            }

            // Enable start game button
            let startButton = document.getElementById("startGameButton");
            startButton.disabled = false;

        } else if (!document.querySelector(".waitingText")) {

            // If game has less than 2 participants but there is no waiting text, creat this
            let waitingText = document.createElement("p");
            waitingText.classList.add("waitingText");
            waitingText.textContent = "Waiting on others to join the game...";
            main.appendChild(waitingText);

            let startButton = document.getElementById("startGameButton");
            startButton.disabled = true;
        }
    }, 1000);

    // When clicking start game stop updating players and start game based on user input
    document.getElementById("startGameButton").addEventListener("click", async () => {

        // Stop fetching players
        clearInterval(updatePlayes);

        //Update game status for other players
        requestData = {
            action: "startGame",
            gameId: gameId,
            game: game,
            category: category
        }

        let gameStarted = await handleGameFetch(requestData);

        // Start game based on user input
        switch (game) {
            case "Most Likely To":
                renderMostLikelyTo(category, gameId);

                // Save game to know which instructions to show
                window.localStorage.setItem("game", "Most Likely To");
                break;
            case "Truth or Dare":
                truthORDareHandle(category, gameId);
                window.localStorage.setItem("game", "Truth or Dare");
                break;
            case "Would You Rather":
                renderWouldYouRather(category, gameId);
                window.localStorage.setItem("game", "Would You Rather");
                break;
            case "Fill In The Blank":
                renderFillInTheBlank(category, gameId);
                window.localStorage.setItem("game", "Fill In The Blank");
                break;
            case "Spin The Bottle":
                spinTheBottleHandle(gameId);
                window.localStorage.setItem("game", "Spin The Bottle");
                break;
        }

    });
}

// Function to join game
// player name will be sent as parameter if player join game by create game display
// if player join game from homepage they will need to fill in their name as well
function joinGame(playerName = null) {

    let main = document.querySelector("main");
    main.removeAttribute("class");
    main.classList.add("startGame");

    // If name is not sent as parameter display input for player name
    if (playerName != null) {
        main.innerHTML = `
        <h2>GAME PIN</h2>
        <input type="number" placeholder="Game Pin..." class="gameId"></input>
        <button class="joinGame longButton">JOIN GAME</button>
        `;
    } else {
        main.innerHTML = `
        <h2>Your Name</h2>
        <input type="text" placeholder="Type here..."  class="name"></input>
        <h2>Game Pin</h2>
        <input type="number" placeholder="Type here..." class="gameId"></input>
        <button class="joinGame longButton">JOIN GAME</button>
        `;
    }

    // Send join game request when clicking join game
    main.querySelector(".joinGame").addEventListener("click", async () => {

        let gameId = document.querySelector(".gameId").value;

        // Get name if not sent as parameter
        if (!playerName) {
            playerName = document.querySelector(".name").value;

            // If name is longer than 10 characters ask to pick another name
            if (playerName.length > 10) {
                let popUp = document.createElement("div");
                popUp.setAttribute("id", "leaveGamePopUp");

                popUp.innerHTML = `
                <div class="oneButtonPopUp">
                    <p>Please pick another name, your name can only be 10 characters long</p>
                    <div>   
                        <button class="closePopup">OK</button>
                    </div>
                </div>
                `;

                document.querySelector("main").appendChild(popUp);

                // Close pop up and keep playing
                popUp.querySelector(".closePopup").addEventListener("click", () => {
                    popUp.remove();
                })
            } else {
                sendRequestToJoin();
            }

        } else {
            sendRequestToJoin();
        }

        async function sendRequestToJoin() {
            // Join game by id
            let requestData = {
                action: "joinGame",
                gameId: gameId,
                name: playerName
            }

            let joinGame = await handleGameFetch(requestData);

            if (joinGame) {
                // Save gameId in local storage and set currentGame to true
                window.localStorage.setItem("currentGame", "true");
                window.localStorage.setItem("gameId", gameId);
                window.localStorage.setItem("playerName", playerName);

                // Call function to display currently joined players
                renderWaitingForGame(gameId);
            } else {
                // If game Id did not exist, inform user
                let popUp = document.createElement("div");
                popUp.setAttribute("id", "leaveGamePopUp");

                popUp.innerHTML = `
                <div class="oneButtonPopUp">
                    <p>No game under this ID was found</p>
                    <div>   
                        <button class="closePopup">OK</button>
                    </div>
                </div>
                `;

                document.querySelector("main").appendChild(popUp);

                // Close pop up and keep playing
                popUp.querySelector(".closePopup").addEventListener("click", () => {
                    popUp.remove();
                })
            }
        }
    })
}

// Function to render page for waiting for game to start
// This function will be called for players, not hosts, when no ongoing game is currently running
async function renderWaitingForGame(gameId) {

    let main = document.querySelector("main");
    main.classList.add("startGame");

    // Display current players
    main.innerHTML = `
    <h2>GAME PIN</h2>
    <div class="gameId">${gameId}</div>
    <p>Participants</p>
    <div class="participants"></div>
    <p class="waitingText">Waiting for host to start the game...</p>
    `;

    // Structure of footer
    let footer = document.querySelector("footer");
    footer.innerHTML = `
    <div class="buttonQuit">
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
        <path d="M0.325756 8.7026C0.337756 8.7126 0.353755 8.7166 0.365755 8.7266L8.07976 15.7086C8.51376 16.0986 9.21776 16.0986 9.65176 15.7086C9.65576 15.7046 9.65776 15.7006 9.65976 15.6966C9.76485 15.6098 9.84972 15.5012 9.90845 15.3782C9.96717 15.2552 9.99833 15.1209 9.99976 14.9846L9.99976 1.0186C9.99751 0.879825 9.96483 0.743234 9.904 0.618477C9.84318 0.49372 9.7557 0.383841 9.64776 0.2966L9.65176 0.292601C9.43338 0.103861 9.15439 0 8.86576 0C8.57712 0 8.29813 0.103861 8.07976 0.292601L0.325756 7.2906C0.223635 7.37772 0.141628 7.48596 0.0853958 7.60784C0.0291634 7.72973 4.19617e-05 7.86237 4.19617e-05 7.9966C4.19617e-05 8.13083 0.0291634 8.26347 0.0853958 8.38536C0.141628 8.50724 0.223635 8.61548 0.325756 8.7026Z" fill="#C1C1C1"/>
        </svg>
        <p>QUIT</p>
    </div>
    `;

    // Fetch the host
    let requestDataToGetHost = {
        action: "getHost",
        gameId: gameId
    }

    let hostName = await handleGameFetch(requestDataToGetHost);

    // Fetch current players every second
    let requestData = {
        action: "getPlayers",
        gameId: gameId
    }

    let displayedPlayers = []; //To keep track of who is already displaying
    let updatePlayes = setInterval(async () => {
        let currentPlayers = await handleGameFetch(requestData);
        let index = 0;

        // Display new palyers
        currentPlayers.forEach(player => {
            if (!displayedPlayers.includes(player)) {
                let playerName = document.createElement("div");
                playerName.classList.add(player);
                if (player === hostName) {
                    playerName.classList.add("host");
                    playerName.innerHTML = `
                    <p>${player}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="29" viewBox="0 0 28 29" fill="none">
                    <path d="M24.5 7.67594C24.9641 7.67594 25.4093 7.8669 25.7374 8.20681C26.0656 8.54672 26.25 9.00774 26.25 9.48844C26.25 9.96915 26.0656 10.4302 25.7374 10.7701C25.4093 11.11 24.9641 11.3009 24.5 11.3009C24.381 11.2908 24.2636 11.2665 24.15 11.2284L23.6863 11.0653C23.4822 10.9585 23.3031 10.807 23.1613 10.6213L22.8638 10.1228C22.7792 9.91632 22.7346 9.69462 22.7325 9.47032C22.7348 9.23229 22.7823 8.99707 22.8724 8.77807C22.9625 8.55907 23.0933 8.36059 23.2574 8.19397C23.4215 8.02734 23.6158 7.89583 23.829 7.80695C24.0422 7.71807 24.2702 7.67355 24.5 7.67594ZM14 5.86344C14.4325 5.86344 14.8473 6.04074 15.1539 6.3566C15.4605 6.67246 15.6339 7.10118 15.6363 7.54907C15.633 7.82139 15.565 8.08869 15.4384 8.32736C15.3117 8.56602 15.1302 8.76871 14.91 8.91751L14.6125 9.06251C14.4201 9.14144 14.2157 9.1844 14.0088 9.18938C13.7979 9.18628 13.5898 9.14008 13.3963 9.05344L13.2213 8.94469C12.962 8.8081 12.7436 8.60096 12.5894 8.34549C12.4353 8.09003 12.3512 7.7959 12.3463 7.49469C12.3555 7.0492 12.5346 6.62561 12.8445 6.31653C13.1544 6.00745 13.5698 5.83803 14 5.84532V5.86344ZM10.5 14.8263L13.1688 10.3675C13.7072 10.5609 14.2928 10.5609 14.8313 10.3675L17.5 14.8081L22.47 11.6091C22.6236 11.7647 22.7938 11.9015 22.9775 12.0169L20.615 19.3666H7.39376L5.03126 12.0169C5.21493 11.9015 5.38521 11.7647 5.53876 11.6091L10.5 14.8263ZM3.50001 7.95688C3.69682 7.95568 3.89191 7.99494 4.07397 8.07239C4.25603 8.14985 4.42143 8.26395 4.56061 8.40809C4.69978 8.55224 4.80995 8.72355 4.88473 8.91211C4.95951 9.10067 4.99742 9.30272 4.99626 9.50657C4.99358 9.69587 4.95802 9.88313 4.89126 10.0594L4.63751 10.4853C4.47695 10.6843 4.27047 10.8382 4.03722 10.9325C3.80397 11.0269 3.55149 11.0587 3.30319 11.0251C3.05488 10.9915 2.8188 10.8935 2.61681 10.7402C2.41482 10.5869 2.25346 10.3833 2.1477 10.1482C2.04193 9.9131 1.99519 9.65416 2.01179 9.39537C2.02839 9.13658 2.1078 8.88632 2.24266 8.66779C2.37752 8.44926 2.56347 8.26952 2.78327 8.14525C3.00306 8.02098 3.24959 7.95618 3.50001 7.95688ZM20.6763 23.3088H7.35001V21.3331H20.6763V23.3088Z" fill="#E7538C"/>
                    </svg>
                    `;
                } else {
                    playerName.textContent = player;
                }
                displayedPlayers.push(player);

                document.querySelector(".participants").appendChild(playerName);
            }
        });

        // Remove display of players who no longer is playing
        displayedPlayers.forEach(displayedPlayer => {
            if (!currentPlayers.includes(displayedPlayer)) {
                displayedPlayers.splice(index, 1);

                let displayedName = document.querySelector(`.${displayedPlayer}`);
                displayedName.remove();
            }
            index++;
        });
    }, 1000);

    // send request to check game status
    let gameExist = setInterval(async () => {
        checkIfGameExist(gameId, gameExist, requestStart, updatePlayes);
    }, 1000);

    // Start game when host start game
    let requestDataForStartingGame = {
        action: "requestToStartGame",
        gameId: gameId
    }

    let requestStart = setInterval(async () => {
        let requestToStartGame = await handleGameFetch(requestDataForStartingGame);
        console.log(requestToStartGame);

        if (requestToStartGame) {
            // Stop fetching players
            clearInterval(updatePlayes);
            // Stop fetching request to start game
            clearInterval(requestStart);
            // Stop fetching check game status
            clearInterval(gameExist);

            let game = requestToStartGame.game;
            let category = requestToStartGame.category;
            let questionIndex = requestToStartGame.questionIndex;

            // Start game based on user input
            switch (game) {
                case "Most Likely To":
                    renderMostLikelyTo(category, gameId, questionIndex);
                    // Save game to know which instructions to display
                    window.localStorage.setItem("game", "Most Likely To");
                    break;
                case "Truth or Dare":
                    truthORDareHandle(category, gameId);
                    window.localStorage.setItem("game", "Truth or Dare");
                    break;
                case "Would You Rather":
                    renderWouldYouRather(category, gameId);
                    window.localStorage.setItem("game", "Would You Rather");
                    break;
                case "Fill In The Blank":
                    renderFillInTheBlank(category, gameId, questionIndex);
                    window.localStorage.setItem("game", "Fill In The Blank");
                    break;
                case "Spin The Bottle":
                    spinTheBottleHandle(gameId);
                    window.localStorage.setItem("game", "Spin The Bottle");
                    break;
            }
        }

    }, 1000);

    // Leave game when clicking on exit, send current intervals as paremeters to be stoped if leaving the game
    document.querySelector(".buttonQuit").addEventListener("click", () => {
        leaveGame(updatePlayes, requestStart, gameExist);
    });
}

// Function to display pop up asking user if they want to leave/end game
// Intervals that needs to be cleared when leaving the game can be sent as parameters 
function leaveGame(interval1 = false, interval2 = false, interval3 = false) {

    let gameId = parseInt(localStorage.getItem("gameId"));
    let playerName = localStorage.getItem("playerName");
    let isHost = window.localStorage.getItem("host");

    // If host, ask if use want to end game for all, if player ask if user want to leave game
    let popUp = document.createElement("div");
    popUp.setAttribute("id", "leaveGamePopUp");

    if (!isHost) {
        popUp.innerHTML = `
        <div>
            <p>Are you sure you want to leave the game?</p>
            <div>   
                <button class="leaveGame">YES</button>
                <button class="closePopup clearDesign">NO</button>
            </div>
        </div>
        `;
    } else {
        popUp.innerHTML = `
        <div>
            <p>Are you sure you want to end the game for all players?</p>
            <div>   
                <button class="leaveGame">YES</button>
                <button class="closePopup clearDesign">NO</button>
            </div>
        </div>
        `;
    }

    document.querySelector("main").appendChild(popUp);

    // Close pop up if user wants to keep playing
    popUp.querySelector(".closePopup").addEventListener("click", () => {
        popUp.remove();
    })

    // Send request to leave game when user click leave
    popUp.querySelector(".leaveGame").addEventListener("click", async () => {

        let leftTheGame = false;

        if (!isHost) {
            // Send request to leave game
            let requestDataForLeavingGame = {
                action: "leaveGame",
                gameId: gameId,
                player: playerName
            }

            leftTheGame = await handleGameFetch(requestDataForLeavingGame);

        } else {

            // If user is host, send request to end game for all players
            let requestDataForEndingGame = {
                action: "endGame",
                gameId: gameId,
            }

            leftTheGame = await handleGameFetch(requestDataForEndingGame);

            window.localStorage.removeItem("host");
        }

        // If leaving/ending game was successfull, clear any running intervals
        if (leftTheGame) {
            console.log(interval1);
            console.log(interval2);
            if (interval1) {
                clearInterval(interval1);
            }
            if (interval2) {
                clearInterval(interval2);
            }
            if (interval3) {
                clearInterval(interval3);
            }

            // Clear local storage
            window.localStorage.setItem("currentGame", false);
            window.localStorage.removeItem("gameId");
            window.localStorage.removeItem("playerName");
            window.localStorage.setItem("game", "main");

            // Render game display
            renderGameDisplay();
        }
    })
}

// Function to check if game with provided gameId exist
// Function will be called by players when activly in a game to make sure the game is still active
async function checkIfGameExist(gameId, interval1, interval2, interval3) {

    let requestDataForCheckingGameId = {
        action: "checkGameId",
        gameId: gameId
    }

    let gameExist = await handleGameFetch(requestDataForCheckingGameId);

    // If game does not exist, clear local storage, stop fetching and load game display
    if (!gameExist) {

        // Clear interval
        if (interval1) {
            clearInterval(interval1);
        }
        if (interval2) {
            clearInterval(interval2);
        }
        if (interval3) {
            clearInterval(interval3);
        }

        // Clear localstorage
        window.localStorage.setItem("currentGame", false);
        window.localStorage.removeItem("gameId");
        window.localStorage.removeItem("playerName");
        window.localStorage.setItem("game", "main");

        // Infor user the game has ended

        let infoBox = document.createElement("div");
        infoBox.classList.add("infoBox");
        infoBox.innerHTML = `
        <div>
            <p>Looks like your host ended the game</p>
            <button>Back to homepage</button>
        </div>
        `;
        document.querySelector("main").appendChild(infoBox);

        infoBox.querySelector("button").addEventListener("click", () => {
            renderGameDisplay();
        });
    }
}

// Function to handle game fetch
async function handleGameFetch(requestData) {

    // Set request parameters
    let requestParameters = {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify(requestData)
    }

    let request = new Request("php/handleGame.php", requestParameters);

    // Fetch request and handle response
    try {
        let response = await fetch(request);

        if (response.ok) {
            let resource = await response.json();
            return resource;
        } else {
            let error = await response.json();
            console.log(error.message);
        }
    } catch (error) {
        console.log("Something went wrong", error);
    }

}