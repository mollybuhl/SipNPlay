"use strict";

// Function to render game display, current game will be true if the user have already joined a game, otherwise false
async function renderGameDisplay(currentGame = false){
 
    let main = document.querySelector("main");
    main.removeAttribute("class");
    main.classList.add("gameDisplay");

    // Displaying each game
    main.innerHTML = `
    <div class="neverHaveIEver">
        <h3>Never Have I Ever</h3>

        <div>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
                <path d="M0.791504 15V14.25C0.791504 11.3505 3.2726 9 6.33317 9C9.39375 9 11.8748 11.3505 11.8748 14.25V15" stroke="#747474" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M10.2915 10.5C10.2915 8.42895 12.0637 6.75 14.2498 6.75C16.4359 6.75 18.2082 8.42895 18.2082 10.5V10.875" stroke="#747474" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M6.33317 9C8.08204 9 9.49984 7.65683 9.49984 6C9.49984 4.34314 8.08204 3 6.33317 3C4.58427 3 3.1665 4.34314 3.1665 6C3.1665 7.65683 4.58427 9 6.33317 9Z" stroke="#747474" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M14.25 6.75C15.5617 6.75 16.625 5.74264 16.625 4.5C16.625 3.25736 15.5617 2.25 14.25 2.25C12.9383 2.25 11.875 3.25736 11.875 4.5C11.875 5.74264 12.9383 6.75 14.25 6.75Z" stroke="#747474" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

                <p>1+</p>
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="23" viewBox="0 0 24 23" fill="none">
            <path d="M9 6.24072L15 11.6852L9 17.1296" stroke="#747474" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
    </div>
    <div class="mostLikelyTo">
        <h3> Most Likely To </h3>

        <div>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
                <path d="M0.791504 15V14.25C0.791504 11.3505 3.2726 9 6.33317 9C9.39375 9 11.8748 11.3505 11.8748 14.25V15" stroke="#747474" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M10.2915 10.5C10.2915 8.42895 12.0637 6.75 14.2498 6.75C16.4359 6.75 18.2082 8.42895 18.2082 10.5V10.875" stroke="#747474" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M6.33317 9C8.08204 9 9.49984 7.65683 9.49984 6C9.49984 4.34314 8.08204 3 6.33317 3C4.58427 3 3.1665 4.34314 3.1665 6C3.1665 7.65683 4.58427 9 6.33317 9Z" stroke="#747474" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M14.25 6.75C15.5617 6.75 16.625 5.74264 16.625 4.5C16.625 3.25736 15.5617 2.25 14.25 2.25C12.9383 2.25 11.875 3.25736 11.875 4.5C11.875 5.74264 12.9383 6.75 14.25 6.75Z" stroke="#747474" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

                <p>2+</p>
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="23" viewBox="0 0 24 23" fill="none">
            <path d="M9 6.24072L15 11.6852L9 17.1296" stroke="#747474" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
    </div>
    <div class="truthOrDare">
        <h3>Truth or Dare</h3>

        <div>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
                <path d="M0.791504 15V14.25C0.791504 11.3505 3.2726 9 6.33317 9C9.39375 9 11.8748 11.3505 11.8748 14.25V15" stroke="#747474" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M10.2915 10.5C10.2915 8.42895 12.0637 6.75 14.2498 6.75C16.4359 6.75 18.2082 8.42895 18.2082 10.5V10.875" stroke="#747474" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M6.33317 9C8.08204 9 9.49984 7.65683 9.49984 6C9.49984 4.34314 8.08204 3 6.33317 3C4.58427 3 3.1665 4.34314 3.1665 6C3.1665 7.65683 4.58427 9 6.33317 9Z" stroke="#747474" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M14.25 6.75C15.5617 6.75 16.625 5.74264 16.625 4.5C16.625 3.25736 15.5617 2.25 14.25 2.25C12.9383 2.25 11.875 3.25736 11.875 4.5C11.875 5.74264 12.9383 6.75 14.25 6.75Z" stroke="#747474" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

                <p>2+</p>
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="23" viewBox="0 0 24 23" fill="none">
            <path d="M9 6.24072L15 11.6852L9 17.1296" stroke="#747474" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
    </div>
    <div class="wouldYouRather">
        <h3>Would You Rather</h3>

        <div>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
                <path d="M0.791504 15V14.25C0.791504 11.3505 3.2726 9 6.33317 9C9.39375 9 11.8748 11.3505 11.8748 14.25V15" stroke="#747474" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M10.2915 10.5C10.2915 8.42895 12.0637 6.75 14.2498 6.75C16.4359 6.75 18.2082 8.42895 18.2082 10.5V10.875" stroke="#747474" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M6.33317 9C8.08204 9 9.49984 7.65683 9.49984 6C9.49984 4.34314 8.08204 3 6.33317 3C4.58427 3 3.1665 4.34314 3.1665 6C3.1665 7.65683 4.58427 9 6.33317 9Z" stroke="#747474" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M14.25 6.75C15.5617 6.75 16.625 5.74264 16.625 4.5C16.625 3.25736 15.5617 2.25 14.25 2.25C12.9383 2.25 11.875 3.25736 11.875 4.5C11.875 5.74264 12.9383 6.75 14.25 6.75Z" stroke="#747474" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

                <p>2+</p>
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="23" viewBox="0 0 24 23" fill="none">
            <path d="M9 6.24072L15 11.6852L9 17.1296" stroke="#747474" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
    </div>
    <div class="spinTheBottle">
        <h3>Spin The Bottle</h3>

        <div>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
                <path d="M0.791504 15V14.25C0.791504 11.3505 3.2726 9 6.33317 9C9.39375 9 11.8748 11.3505 11.8748 14.25V15" stroke="#747474" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M10.2915 10.5C10.2915 8.42895 12.0637 6.75 14.2498 6.75C16.4359 6.75 18.2082 8.42895 18.2082 10.5V10.875" stroke="#747474" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M6.33317 9C8.08204 9 9.49984 7.65683 9.49984 6C9.49984 4.34314 8.08204 3 6.33317 3C4.58427 3 3.1665 4.34314 3.1665 6C3.1665 7.65683 4.58427 9 6.33317 9Z" stroke="#747474" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M14.25 6.75C15.5617 6.75 16.625 5.74264 16.625 4.5C16.625 3.25736 15.5617 2.25 14.25 2.25C12.9383 2.25 11.875 3.25736 11.875 4.5C11.875 5.74264 12.9383 6.75 14.25 6.75Z" stroke="#747474" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

                <p>1+</p>
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="23" viewBox="0 0 24 23" fill="none">
            <path d="M9 6.24072L15 11.6852L9 17.1296" stroke="#747474" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
    </diV>
    <div class="fillInTheBlank">
        <h3>Fill In The Blank</h3>

        <div>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
                <path d="M0.791504 15V14.25C0.791504 11.3505 3.2726 9 6.33317 9C9.39375 9 11.8748 11.3505 11.8748 14.25V15" stroke="#747474" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M10.2915 10.5C10.2915 8.42895 12.0637 6.75 14.2498 6.75C16.4359 6.75 18.2082 8.42895 18.2082 10.5V10.875" stroke="#747474" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M6.33317 9C8.08204 9 9.49984 7.65683 9.49984 6C9.49984 4.34314 8.08204 3 6.33317 3C4.58427 3 3.1665 4.34314 3.1665 6C3.1665 7.65683 4.58427 9 6.33317 9Z" stroke="#747474" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M14.25 6.75C15.5617 6.75 16.625 5.74264 16.625 4.5C16.625 3.25736 15.5617 2.25 14.25 2.25C12.9383 2.25 11.875 3.25736 11.875 4.5C11.875 5.74264 12.9383 6.75 14.25 6.75Z" stroke="#747474" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

                <p>2+</p>
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="23" viewBox="0 0 24 23" fill="none">
            <path d="M9 6.24072L15 11.6852L9 17.1296" stroke="#747474" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
    </div>
    `;

    // If user is already in a game load otion to leave game, otherwise load option to join game
    if(currentGame){
        let gameId = localStorage.getItem("gameId");
        let bottomBox = document.createElement("div");
        bottomBox.classList.add("leavGameDisplay");
        bottomBox.innerHTML = `
        <button class="leaveGame">Leave Game</button>
        <div>${gameId}</div>
        `;
        main.appendChild(bottomBox);

        document.querySelector(".leaveGame").addEventListener("click", leaveGame);
    }else{
        let bottomBox = document.createElement("div");
        bottomBox.classList.add("joinGame");
        bottomBox.innerHTML = `
        <h3>Join Game by ID</h3>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="23" viewBox="0 0 24 23" fill="none">
        <path d="M9 6.24072L15 11.6852L9 17.1296" stroke="#747474" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        `;
        main.appendChild(bottomBox);

        // Render join game by ID on click
        main.querySelector(".joinGame").addEventListener("click",() => {
            joinGame();
        });
    }

    // Display game category or render play when clicking on game
    main.querySelector(".neverHaveIEver").addEventListener("click",() => {
        renderCategoryLocalGame("Never Have I Ever");
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

    main.querySelector(".spinTheBottle").addEventListener("click",()=>{
        spinTheBottleHandle();
    } );
    
    // Remove quit button from footer
    let footer = document.querySelector("footer");
    footer.innerHTML=``;
    footer.classList.add("removed");
}


// Function to display categories after selecting a game
function renderCategories(game){

    let currentGame = (localStorage.getItem("currentGame") === "true");

    // Structure of main
    let main = document.querySelector("main");
    main.removeAttribute("class");
    main.classList.add("categoryDisplay");

    main.innerHTML = `
    <h1>Select Category</h1>
    <div class="theBasicVersion green">The Basic Version</div>
    <div class="notSafeForWork orange">Not Safe For Work</div>
    <div class="spicyEdition pink">Spicy Edition</div>
    <div class="girlDinner green">Girl Dinner</div>
    `;

    // Selecting a category and render game on click

    // The basic version
    main.querySelector(".theBasicVersion").addEventListener("click", () => {
        let category = "The Basic Version";
        if(currentGame){
            startNewGame(game, category)
        }else{
            renderStartGame(game, category);  
        }
    });

    // Not safe for work
    main.querySelector(".notSafeForWork").addEventListener("click", () => {
        let category = "Not Safe For Work";
        if(currentGame){
            startNewGame(game, category);
        }else{
            renderStartGame(game, category);
        }
    });

    // Spicy edition
    main.querySelector(".spicyEdition").addEventListener("click", () => {
        let category = "Spicy Edition";
        if(currentGame){
            startNewGame(game, category);
        }else{
            renderStartGame(game, category);
        }
    });

    // Girl Dinner
    main.querySelector(".girlDinner").addEventListener("click", () => {
        let category = "Girl Dinner";
        if(currentGame){
            startNewGame(game, category);
        }else{
            renderStartGame(game, category);
        }
    });

    // When clicking exit go back to game display
    let footer = document.querySelector("footer");

    footer.innerHTML = `
    <div class="buttonQuit">
        <i class="fa-solid fa-chevron-left" style="color: #747474;"></i>
        <p>BACK</p>
    </div>
    `;

    footer.querySelector(".buttonQuit").addEventListener("click", () => {
        if(localStorage.getItem("currentGame") === "true"){
            renderGameDisplay(true);
        }else{
            renderGameDisplay();
        }
    });
}

// Function to render category page for localy hosted games - not multiplayer
function renderCategoryLocalGame(game){

    // Structure of main
    let main = document.querySelector("main");
    main.removeAttribute("class");
    main.classList.add("categoryDisplay");

    main.innerHTML = `
    <h1>Select Category</h1>
    <div class="theBasicVersion green">The Basic Version</div>
    <div class="notSafeForWork orange">Not Safe For Work</div>
    <div class="spicyEdition pink">Spicy Edition</div>
    <div class="girlDinner green">Girl Dinner</div>
    `;

    // Selecting a category and render game on click
    let category;
    
    // The basic version
    main.querySelector(".theBasicVersion").addEventListener("click", () =>{
        category = "The Basic Version";  
        loadGame();
    });

    // Not safe for work
    main.querySelector(".notSafeForWork").addEventListener("click", () =>{
        category = "Not Safe For Work";
        loadGame();
    });

    // Spicy edition
    main.querySelector(".spicyEdition").addEventListener("click", () =>{
        category = "Spicy Edition";
        loadGame();
    });

    // Girl Dinner
    main.querySelector(".girlDinner").addEventListener("click", () =>{
        category = "Girl Dinner";
        loadGame();
    });

    function loadGame(){
        if(game === "Never Have I Ever"){
            renderNeverHaveIEver(category);
        }
        
    }
    

    // When clicking exit go back to game display
    let footer = document.querySelector("footer");

    footer.innerHTML=`
    <div class="buttonQuit">
        <i class="fa-solid fa-chevron-left" style="color: #747474;"></i>
        <p>BACK</p>
    </div>
    `;

    footer.querySelector(".buttonQuit").addEventListener("click", () => {
        renderGameDisplay(false);
    });

}


