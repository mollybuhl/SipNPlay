"use strict";

// Function to render start game page
function renderStartGame(game, category){
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
    main.querySelector(".createGame").addEventListener("click", () =>{
        let creatorName = document.querySelector(".name").value;
        createGame(game, category, creatorName);
    });

    // Render join game when clicking join
    main.querySelector(".joinGame").addEventListener("click", () =>{

        // Send name to function
        let playerName = document.querySelector(".name").value;
        joinGame(playerName);
    });

}

// Function to create a new game, will be called by host of the game after clicking create game
async function createGame(game, category, creatorName){

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
    <div class="resultName gameId">${gameId}</div>
    <h4>Participants</h4>
    <div class="participants"></div>
    <p class="waitingText">Waiting on others to join the game...</p>
    `;

    let footer = document.querySelector("footer");
    footer.removeAttribute("class");
    footer.innerHTML = `
    <div class="buttonQuit">
            <i class="fa-solid fa-chevron-left" style="color: #747474;"></i>
            <p>QUIT</p>
    </div>
    <button id="startGameButton">START GAME</button>
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
    let updatePlayes = setInterval(async()=>{
        let currentPlayers = await handleGameFetch(requestData);
        let index = 0;

        // Display new palyers
        currentPlayers.forEach(player => {
            if(!displayedPlayers.includes(player)){
                let playerName = document.createElement("p");
                playerName.classList.add(player);
                playerName.textContent = player;
                displayedPlayers.push(player);
        
                document.querySelector(".participants").appendChild(playerName);
            }
        });  

        // Remove display of players who no longer is playing
        displayedPlayers.forEach(displayedPlayer => {
            if(!currentPlayers.includes(displayedPlayer)){
                displayedPlayers.splice(index, 1);

                let displayedName = document.querySelector(`.${displayedPlayer}`);
                displayedName.remove();
            }
            index++;
        });

        // If more than 2 players joined the game, remove "waiting for others" and enable start button
        if(displayedPlayers.length >= 2){

            // Remove waiting text
            if(document.querySelector(".waitingText")){
                document.querySelector(".waitingText").remove();
            }

            // Enable start game button
            let startButton = document.getElementById("startGameButton");
            startButton.disabled = false;

        }else if(!document.querySelector(".waitingText")){

            // If game has less than 2 participants but there is no waiting text, creat this
            let waitingText = document.createElement("p");
            waitingText.classList.add("waitingText");
            waitingText.textContent = "Waiting on others to join the game...";
            main.appendChild(waitingText);

            let startButton = document.getElementById("startGameButton");
            startButton.disabled = true;
        }
    },1000);

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
        switch(game){
            case "Most Likely To":
                renderMostLikelyTo(category, gameId);
                break;
            case "Truth or Dare":
                truthORDareHandle(category, gameId);
                break;
            case "Would You Rather":
                renderWouldYouRather(category, gameId);
                break;
            case "Fill In The Blank":
                renderFillInTheBlank(category, gameId);
                break;
        }
    });
}

// This function will be called when the host has already created a game but is starting a new gameplay
async function startNewGame(game, category){
    let gameId = localStorage.getItem("gameId");

    // Change game and category
    let requestDataForChngingGameStatus = {
        action: "changeGameStatus",
        gameId: gameId,
        game: game,
        category: category
    }

    handleGameFetch(requestDataForChngingGameStatus);

    // Loading page for current players
    // Present game status
    let main = document.querySelector("main");
    main.removeAttribute("class");
    main.classList.add("startGame");

    main.innerHTML = `
    <h2>GAME PIN</h2>
    <div class="resultName gameId">${gameId}</div>
    <h4>Participants</h4>
    <div class="participants"></div>
    <p class="waitingText">Waiting on others to join the game...</p>
    `;

    let footer = document.querySelector("footer");
    footer.removeAttribute("class");
    footer.innerHTML = `
    <div class="buttonQuit">
            <i class="fa-solid fa-chevron-left" style="color: #747474;"></i>
            <p>QUIT</p>
    </div>
    <button id="startGameButton">START GAME</button>
    `;

    // Leave game when clicking QUIT
    document.querySelector(".buttonQuit").addEventListener("click", () => {
        clearInterval(updatePlayes);
        renderCategories(game);
    })

    // Disable button until others have joined the game
    let startButton = document.getElementById("startGameButton")
    startButton.disabled = true;

    // Fetch current players every second
    let requestData = {
        action: "getPlayers",
        gameId: gameId
    }
    
    let displayedPlayers = []; //To keep track of who is already displaying
    let updatePlayes = setInterval(async()=>{
        let currentPlayers = await handleGameFetch(requestData);
        let index = 0;

        // Display new palyers
        currentPlayers.forEach(player => {
            if(!displayedPlayers.includes(player)){
                let playerName = document.createElement("p");
                playerName.classList.add(player);
                playerName.textContent = player;
                displayedPlayers.push(player);
        
                document.querySelector(".participants").appendChild(playerName);
            }
        });  

        // Remove display of players who no longer is playing
        displayedPlayers.forEach(displayedPlayer => {
            if(!currentPlayers.includes(displayedPlayer)){
                displayedPlayers.splice(index, 1);

                let displayedName = document.querySelector(`.${displayedPlayer}`);
                displayedName.remove();
            }
            index++;
        });

        // If more than 2 players joined the game, remove "waiting for others" and enable start button
        if(displayedPlayers.length >= 2){

            // Remove waiting text
            if(document.querySelector(".waitingText")){
                document.querySelector(".waitingText").remove();
            }

            // Enable start game button
            let startButton = document.getElementById("startGameButton");
            startButton.disabled = false;

        }else if(!document.querySelector(".waitingText")){

            // If game has less than 2 participants but there is no waiting text, creat this
            let waitingText = document.createElement("p");
            waitingText.classList.add("waitingText");
            waitingText.textContent = "Waiting on others to join the game...";
            main.appendChild(waitingText);

            let startButton = document.getElementById("startGameButton");
            startButton.disabled = true;
        }
    },1000);

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
        switch(game){
            case "Most Likely To":
                renderMostLikelyTo(category, gameId);
                break;
            case "Truth or Dare":
                truthORDareHandle(category, gameId);
                break;
            case "Would You Rather":
                renderWouldYouRather(category, gameId);
                break;
            case "Fill In The Blank":
                renderFillInTheBlank(category, gameId);
                break;
        }

    });
}

// Function to join game
// player name will be sent as parameter if player join game by create game display
// if player join game from homepage they will need to fill in their name as well
function joinGame(playerName=null){

    let main = document.querySelector("main");
    main.removeAttribute("class");
    main.classList.add("startGame");

    // If name is not sent as parameter display input for player name
    if(playerName != null){
        main.innerHTML = `
        <h2>GAME PIN</h2>
        <input type="number" placeholder="Game Pin..." class="gameId"></input>
        <button class="joinGame">JOIN GAME</button>
        `;
    }else{
        main.innerHTML = `
        <h2>Your Name</h2>
        <input type="text" placeholder="Type here..."  class="name"></input>
        <h2>Game Pin</h2>
        <input type="number" placeholder="Type here..." class="gameId"></input>
        <button class="joinGame">JOIN GAME</button>
        `;
    }

    // Send join game request when clicking join game
    main.querySelector(".joinGame").addEventListener("click", async () =>{
        
        let gameId = document.querySelector(".gameId").value;

        // Get name if not sent as parameter
        if(!playerName){
            playerName = document.querySelector(".name").value;
        }

        // Join game by id
        let requestData = {
            action: "joinGame",
            gameId: gameId,
            name: playerName
        }

        let joinGame = await handleGameFetch(requestData);

        // Save gameId in local storage and set currentGame to true
        window.localStorage.setItem("currentGame", "true");
        window.localStorage.setItem("gameId", gameId);
        window.localStorage.setItem("playerName", playerName);

        // Call function to display currently joined players
        renderWaitingForGame(gameId);
    })
}

// Function to render page for waiting for game to start
// This function will be called for players, not hosts, when no ongoing game is currently running
function renderWaitingForGame(gameId){
    let main = document.querySelector("main");
    main.classList.add("startGame");

    // Display current players
    main.innerHTML = `
    <h2>GAME PIN</h2>
    <div class="gameId">${gameId}</div>
    <p>Participants</p>
    <div class="participants"></div>
    <p>Waiting for host to start the game...</p>
    `;

    // Structure of footer
    let footer = document.querySelector("footer");
    footer.innerHTML=`
    <div class="buttonQuit">
        <i class="fa-solid fa-chevron-left" style="color: #747474;"></i>
        <p>QUIT</p>
    </div>
    `;

    // Fetch current players every second
    let requestData = {
        action: "getPlayers",
        gameId: gameId
    }
    
    let displayedPlayers = []; //To keep track of who is already displaying
    let updatePlayes = setInterval(async()=>{
        let currentPlayers = await handleGameFetch(requestData);
        let index = 0;

        // Display new palyers
        currentPlayers.forEach(player => {
            if(!displayedPlayers.includes(player)){
                let playerName = document.createElement("p");
                playerName.classList.add(player);
                playerName.textContent = player;
                displayedPlayers.push(player);
        
                document.querySelector(".participants").appendChild(playerName);
            }
        });  

        // Remove display of players who no longer is playing
        displayedPlayers.forEach(displayedPlayer => {
            if(!currentPlayers.includes(displayedPlayer)){
                displayedPlayers.splice(index, 1);

                let displayedName = document.querySelector(`.${displayedPlayer}`);
                displayedName.remove();
            }
            index++;
        });
    },1000);

    // send request to check game status
    let gameExist = setInterval(async () => {
    checkIfGameExist(gameId, gameExist, requestStart, updatePlayes);
    }, 1000);

    // Start game when host start game
    let requestDataForStartingGame = {
        action: "requestToStartGame",
        gameId: gameId
    }

    let requestStart = setInterval(async()=>{
        let requestToStartGame = await handleGameFetch(requestDataForStartingGame);

        if(requestToStartGame){
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
            switch(game){
                case "Most Likely To":
                    renderMostLikelyTo(category, gameId, questionIndex);
                    break;
                case "Truth or Dare":
                    truthORDareHandle(category, gameId);
                    break;
                case "Would You Rather":
                    renderWouldYouRather(category, gameId);
                    break;
                case "Fill In The Blank":
                    renderFillInTheBlank(category, gameId, questionIndex);
                    break;
            }
        }   

    }, 1000);
    
    // Leave game when clicking on exit, send current intervals as paremeters to be stoped if leaving the game
    document.querySelector(".buttonQuit").addEventListener("click", () =>{
        leaveGame(updatePlayes, requestStart, gameExist);
    });
}

// Function to display pop up asking user if they want to leave/end game
// Intervals that needs to be cleared when leaving the game can be sent as parameters 
function leaveGame(interval1 = false, interval2 = false, interval3 = false){
    
    let gameId = parseInt(localStorage.getItem("gameId"));
    let playerName = localStorage.getItem("playerName");
    let isHost = window.localStorage.getItem("host");

    // If host, ask if use want to end game for all, if player ask if user want to leave game
    let popUp = document.createElement("div");
    popUp.setAttribute("id", "leaveGamePopUp");

    if(!isHost){
        popUp.innerHTML = `
        <div>
            <p>Are you sure you want to leave the game?</p>
            <div>   
                <button class="leaveGame">Leave Game</button>
                <button class="closePopup">Keep Playing</button>
            </div>
        </div>
        `;
    }else{
        popUp.innerHTML = `
        <div>
            <p>Are you sure you want to end the game for all players?</p>
            <div>   
                <button class="leaveGame">End Game</button>
                <button class="closePopup">Keep Playing</button>
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

        if(!isHost){
            // Send request to leave game
            let requestDataForLeavingGame = {
                action: "leaveGame",
                gameId: gameId,
                player: playerName
            }

            leftTheGame = await handleGameFetch(requestDataForLeavingGame);
           
        }else{
            
            // If user is host, send request to end game for all players
            let requestDataForEndingGame = {
                action: "endGame",
                gameId: gameId,
            }

            leftTheGame = await handleGameFetch(requestDataForEndingGame);

            window.localStorage.removeItem("host"); 
        }

            // If leaving/ending game was successfull, clear any running intervals
            if(leftTheGame){
                    
                if(interval1){
                    clearInterval(interval1);
                }
                if(interval2){
                    clearInterval(interval2);
                }
                if(interval3){
                    clearInterval(interval3);
                }
        
                // Clear local storage
                window.localStorage.setItem("currentGame", false);
                window.localStorage.removeItem("gameId");
                window.localStorage.removeItem("playerName"); 

                // Render game display
                renderGameDisplay();
            }
    })
}

// Function to check if game with provided gameId exist
// Function will be called by players when activly in a game to make sure the game is still active
async function checkIfGameExist(gameId, interval1, interval2, interval3){

    let requestDataForCheckingGameId = {
        action: "checkGameId",
        gameId: gameId
    }

    let gameExist = await handleGameFetch(requestDataForCheckingGameId);

    // If game does not exist, clear local storage, stop fetching and load game display
    if(!gameExist){

        // Clear interval
        if(interval1){
            clearInterval(interval1);
        }
        if(interval2){
            clearInterval(interval2);
        }
        if(interval3){
            clearInterval(interval3);
        }

        // Clear localstorage
        window.localStorage.setItem("currentGame", false);
        window.localStorage.removeItem("gameId");
        window.localStorage.removeItem("playerName"); 

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

        infoBox.querySelector("button").addEventListener("click", () =>{
            renderGameDisplay();
        });
    }
}

// Function to handle game fetch
async function handleGameFetch(requestData){

    // Set request parameters
    let requestParameters = {
        method: "POST",
        headers: {"Content-Type": "application/json; charset=UTF-8"},
        body: JSON.stringify(requestData)
    }

    let request = new Request("php/handleGame.php", requestParameters);

    // Fetch request and handle response
    try{
        let response = await fetch(request);

        if(response.ok){
            let resource = await response.json();
            return resource;
        }else{
            let error = await response.json();
            console.log(error.message);
        }
    }catch(error){
        console.log("Something went wrong", error);
    }

}