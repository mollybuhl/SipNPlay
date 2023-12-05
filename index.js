"use strict";

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



