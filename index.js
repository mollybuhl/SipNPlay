"use strict";
/*
TO DO:
    - Overall CSS
    - Register more prompts
    - animate progresbar
    - display who is host

    Never Have I ever
    - Swipe for next card

    Would You Rather
    - fix multiple event listeners which adds votes
   
    Spin the bottle
    - End game, check for !isHost
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

let instructionsArray = {
    "Main": ["Join an existing game with a game pin or create a new game by choosing the game you want to play first", "Share the game pin with a couple of friends (if you have any)", "Start the game, take a sip, relax and HAVE FUN!"],
    "Never Have I Ever": ["Each card has a statement, if you have done it then you must take a sip of your drink", "Swipe up to get a new card"],
    "Truth or Dare": ["Pick and choose truth and answer a question or dare if you are not a chicken nugget", "If you are boring and refuse to answer or do the dare, take a shot"],
    "Would You Rather": ["Pick and choose which of the two options you would rather do", "The players that voted for the alternative with the least votes has to take a sip of their drink"],
    "Spin The Bottle": ["Click on the bottle to spin", "Whatever it lands on, you have to do otherwise what's the point in playing?"],
    "Most Likely To": ["Vote for the player who best fits the description", "The player who gets the most votes has to take a sip of their drink", "Remember to take it with a bit of salt if you are voted most likely to, it's just a game bro"],
    "Fill In The Blank": ["Write something fun to fill in the blank", "Vote for the best answer", "The player who had the best answer has to take a sip of their drink"]
};




