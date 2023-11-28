"use strict";

function renderStartGame(){
    let main = document.querySelector("main");
    main.removeAttribute(classList);
    main.classList.add("")


    main.innerHTML = `
    <h3>Your Name</h3>
    <div></div>
    <button class="createGame">Create Game</button>
    <button class="joinGame">Join Game</button>
    `;

    main.querySelector(".createGame").addEventListener("click", createGame);
    main.querySelector(".joinGame").addEventListener("click", joinGame);

}

// Function to create new game
function createGame(){

    // Create a game

    
    let main = document.querySelector("main");
    main.innerHTML = `
    <h2>GAME PIN</h2>
    <h1>${gamePin}</h1>
    <p>Participants</p>
    <div class="participants"></div>
    <button>START GAME</button>
    `;
}

// Function to join game
function joinGame(){

    let main = document.querySelector("main");
    main.innerHTML = `
    <h3>GAME PIN</h3>
    <h1></h1>
    <button>JOIN GAME</button>
    `;

}