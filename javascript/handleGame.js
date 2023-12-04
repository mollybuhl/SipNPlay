/*
    TO DO:
    - Leave a game
    - Start game when host start game
*/

"use strict";

// Function to render start game
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

// Function to create new game
async function createGame(game, category, creatorName){

    // Create a game
    let requestData = {
        action: "createGame",
        name: creatorName
    }

    let gameId = await handleGameFetch(requestData);
    
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
    footer.innerHTML = `
    <div class="buttonQuit">
            <i class="fa-solid fa-chevron-left" style="color: #747474;"></i>
            <p>QUIT</p>
    </div>
    <button id="startGameButton">START GAME</button>
    `;

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
    document.getElementById("startGameButton").addEventListener("click", () => {
        
        // Stop fetching players
        clearInterval(updatePlayes);

        // Start game based on user input
        switch(game){
            case "Never Have I Ever":
                renderNeverHaveIEver(category, gameId);
                break;
            case "Most Likely To":
                renderMostLikelyTo(category, gameId);
                break;
            case "Truth or Dare":
                truthORDareHandle(category, gameId);
                break;
            case "Would You Rather":
                renderWouldYouRather(category, gameId);
                break;
        }

    });

}

// Function to join game
// player name will be sent as parameter if player join game by create game display
// if player join game from homepage they will need to fill in their name
function joinGame(playerName=null){

    let main = document.querySelector("main");
    main.removeAttribute("class");
    main.classList.add("startGame");

    console.log("parameter name:" + playerName);

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
        <input type="text" placeholder="Your name..."  class="name"></input>
        <h2>Game Pin</h2>
        <input type="number" placeholder="Game Pin..." class="gameId"></input>
        <button class="joinGame">JOIN GAME</button>
        `;
    }

    // Send join game request when clicking join game
    main.querySelector(".joinGame").addEventListener("click", async () =>{
        
        
        let gameId = document.querySelector(".gameId").value;

        // Get name if not send as parameter
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

        // Display currently joined players
        let main = document.querySelector("main");
        main.innerHTML = `
        <h2>GAME PIN</h2>
        <h1>${gameId}</h1>
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
        `

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
        },1000);

        // Leave game when clicking on exit

        // Start game when host start game
       /* requestData = {
            action: "startGame",
            gameId: gameId
        }*/
    })

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
            feedback(error.message);
        }
    }catch(error){
        console.log("Something went wrong", error);
    }

}