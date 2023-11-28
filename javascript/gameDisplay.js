"use strict";

// Function to render game display
function renderGameDisplay(){

    let main = document.querySelector("main");
    main.removeAttribute("class");
    main.classList.add("gameDisplay");

    // Displaying each game
    main.innerHTML = `
    <div class="neverHaveIEver">Never Have I Ever</div>
    <div class="mostLikelyTo">Most Likely To</div>
    <div class="truthOrDare">Truth or Dare</div>
    <div class="wouldYouRather">WouldYouRather</div>
    <div class="spinTheBottle">SpinTheBottle</div>
    `;

    // Display game category or render play when clicking on game
    main.querySelector(".neverHaveIEver").addEventListener("click",() => {
        renderCategories("Never Have I Ever");
    });

    main.querySelector(".mostLikelyTo").addEventListener("click", () => {
        renderCategories("Most Likely To");
    });

    main.querySelector(".truthOrDare").addEventListener("click", () => {
        renderCategories("Truth or Dare");
    });

    main.querySelector(".wouldYouRather").addEventListener("click", () => {
        renderCategories("Would You Rather");
    });

    //main.querySelector(".spinTheBottle").addEventListener("click", );

    // Remove quit button from footer
    let footer = document.querySelector("footer");
    footer.innerHTML = ``;
}


// Function to display categories after selecting a game
function renderCategories(game){

    // Structure of main
    let main = document.querySelector("main");
    main.removeAttribute("class");
    main.classList.add("categoryDisplay");

    main.innerHTML = `
    <h1>${game}</h1>
    <div class="theBasicVersion green">The Basic Version</div>
    <div class="notSafeForWork orange">Not Safe For Work</div>
    <div class="spicyEdition pink">Spicy Edition</div>
    <div class="girlDinner green">Girl Dinner</div>
    `;

    // Selecting a category and render game on click
    
    // The basic version
    main.querySelector(".theBasicVersion").addEventListener("click", () =>{
        let category = "The Basic Version";
        startGame(game, category);  
    });

    // Not safe for work
    main.querySelector(".notSafeForWork").addEventListener("click", () =>{
        let category = "Not Safe For Work";
        startGame(game, category);
    });

    // Spicy edition
    main.querySelector(".spicyEdition").addEventListener("click", () =>{
        let category = "Spicy Edition";
        startGame(game, category);
    });

    // Girl Dinner
    main.querySelector(".girlDinner").addEventListener("click", () =>{
        let category = "Girl Dinner";
        startGame(game, category);
    });

    // When clicking exit go back to game display
    let footer = document.querySelector("footer");

    footer.innerHTML=`
    <div class="buttonQuit">
        <i class="fa-solid fa-chevron-left" style="color: #747474;"></i>
        <p>BACK</p>
    </div>
    `;

    footer.querySelector(".buttonQuit").addEventListener("click", renderGameDisplay);
}

// Function to start game based on game-name and category selected
function startGame(game, category){
    
    // Players should be fetched
    let players = ["Molly", "Amanda", "Alex", "Buster", "Lasse"];

    switch(game){
        case'Never Have I Ever':
            renderNeverHaveIEver(category)
            break;
        case 'Most Likely To':
            createMostLikelyToGame(players, category);
            break;
        case 'Truth or Dare':
            truthORDareHandle();
            break;
        case 'Would You Rather':
            createWoldYRGame();
            break;
        default:
            console.log("No game detected");
    }
}
