"use strict";
/*
TO DO:
    - Overall CSS
    - Register more prompts
    - animate progresbar
    - display who is host
    - Intro animation 
    - Enable instructions

    Never Have I ever
    - Swipe for next card

    Truth or Dare
    - Fix bug with selection
  
    Spin the bottle
    - Swipe to spin
    - Animation for result
*/
createMenu();
// Display Menu when clicking hamburger icon
document.querySelector(".menuIcon").addEventListener("click", renderMenu);


// On load, if user is already in a game display this, otherwise render game display
if (localStorage.getItem("currentGame") === "true") {

    let isHost = window.localStorage.getItem("host");

    // If user is host, render game display, otherwise render waiting page
    if (!isHost) {
        let gameId = localStorage.getItem("gameId");
        renderWaitingForGame(gameId);
    } else {
        // Render game display for host
        renderGameDisplay(true);
    }

} else {
    // Render game display
    renderGameDisplay()
}




