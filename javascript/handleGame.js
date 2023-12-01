/*
    TO DO:
    - Leave a game
    - Join a game by code
*/

"use strict";

// Function to render start or join game
function renderStartGame(game, category){
    let main = document.querySelector("main");
    main.removeAttribute("class");

    main.innerHTML = `
    <input class="creatorGame">Your Name</input>
    <div></div>
    <button class="createGame">Create Game</button>
    <button class="joinGame">Join Game</button>
    `;

    main.querySelector(".createGame").addEventListener("click", () =>{
        createGame(game, category);
    });

    main.querySelector(".joinGame").addEventListener("click", joinGame);

}

// Function to create new game
async function createGame(game, category){

    let creatorName = document.querySelector(".creatorGame").value;

    // Create a game
    let requestData = {
        action: "createGame",
        name: creatorName
    }

    let gameId = await handleGameFetch(requestData);

    // Save in data
    
    let main = document.querySelector("main");
    main.innerHTML = `
    <h2>GAME PIN</h2>
    <h1>${gameId}</h1>
    <p>Participants</p>
    <div class="participants">
    </div>
    <button class="startGame">START GAME</button>
    `;

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

    main.querySelector(".startGame").addEventListener("click", () => {
        // Stop fetching players
        clearInterval(updatePlayes);

        // Start game
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
function joinGame(){

    let playerName = document.querySelector(".creatorGame").value;

    let main = document.querySelector("main");
    main.innerHTML = `
    <h1>GAME PIN</h1>
    <input class="gameId"></input>
    <button class="joinGame">JOIN GAME</button>
    `;
    

    main.querySelector(".joinGame").addEventListener("click", async () =>{
        
        let gameId = main.querySelector(".gameId").value;

        // Join game by id
        let requestData = {
            action: "joinGame",
            gameId:gameId,
            name: playerName
        }

        let joinGame = await handleGameFetch(requestData);

        // Display currently joined players
        let main = document.querySelector("main");
        main.innerHTML = `
        <h2>GAME PIN</h2>
        <h1>${gameId}</h1>
        <p>Participants</p>
        <div class="participants">
        </div>
        `;

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