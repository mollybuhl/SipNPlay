"use strict";
/*
TO DO:
    - Pop up design
    - Hamburger menu
    - Register more prompts
    - Entering game when already in a game
    - check for active game if not host

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

// Display Menu when clicking hamburger icon
document.querySelector(".fa-bars").addEventListener("click", renderMenu);

// If player is already in a game display this, otherwise display join game
if(localStorage.getItem("currentGame") === "true"){

    // Render game display
    renderGameDisplay(true)
}else{
    // Render game display
    renderGameDisplay()
}

;



