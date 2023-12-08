"use strict";
/*
TO DO:
    - Hamburger menu
    - Register more prompts
    - Entering game when already in a game
    - Timer should be saved in game array so if you join in the middle you will not have as long


    Never Have I ever
    - Swipe for next card

    Whos most likely to
    - Only host clicking next question
    - If equal votes
    - check for active game if not host

    Truth or Dare
    - Connect to handle game
    - Connect to leave game

    Would you rather
    - Connect to handle game
    - Connect to leave game

    Fill in the blank
    - Make it

    Spin the bottle
    - 


*/


// On load, if user is already in a game display this, otherwise render game display
if(localStorage.getItem("currentGame") === "true"){

    let isHost = window.localStorage.getItem("host");

    // If user is host, render game display, otherwise render waiting page
    if(!isHost){
        let gameId = localStorage.getItem("gameId");
        renderWaitingForGame(gameId);
    }else{
        // Render game display for host
        renderGameDisplay(true);
    }
    
}else{
    // Render game display
    renderGameDisplay()
}

// Display Menu when clicking hamburger icon
document.querySelector(".fa-bars").addEventListener("click", renderMenu);




