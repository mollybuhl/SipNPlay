"use strict";
/*
TO DO:
    - Hamburger menu
    - Overall CSS
    - Register more prompts
    - animate progresbar
    - Only host updating timer

    Never Have I ever
    - Swipe for next card

 
    Truth or Dare
    - Connect to handle game
    - Connect to leave game

    Would you rather
    - Connect to handle game
    - Connect to leave game

    Fill in the blank

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




