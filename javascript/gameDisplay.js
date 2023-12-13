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
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M11.6817 11C12.8208 11 13.7442 11.9234 13.7442 13.0625L13.7431 14.0915C13.8846 16.6168 11.9396 17.8761 8.33277 17.8761C4.73759 17.8761 2.75 16.6332 2.75 14.1275V13.0625C2.75 11.9234 3.67341 11 4.8125 11H11.6817ZM17.1825 11C18.3216 11 19.245 11.9234 19.245 13.0625L19.244 13.7865C19.3683 16.0518 17.6497 17.1875 14.5084 17.1875C14.082 17.1875 13.6811 17.1667 13.3068 17.1252C14.0448 16.4437 14.4395 15.5189 14.4382 14.3503L14.4296 14.0531L14.4317 13.0625C14.4317 12.2408 14.0714 11.5033 13.5001 10.9994L17.1825 11ZM8.25 2.75C10.1488 2.75 11.6881 4.28927 11.6881 6.18806C11.6881 8.08684 10.1488 9.62611 8.25 9.62611C6.35121 9.62611 4.81194 8.08684 4.81194 6.18806C4.81194 4.28927 6.35121 2.75 8.25 2.75ZM15.125 4.125C16.6438 4.125 17.875 5.35622 17.875 6.875C17.875 8.39378 16.6438 9.625 15.125 9.625C13.6062 9.625 12.375 8.39378 12.375 6.875C12.375 5.35622 13.6062 4.125 15.125 4.125Z" fill="#747474"/>
                </svg>

                <p>1+</p>
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="17" viewBox="0 0 10 17" fill="none">
            <path d="M9.674 7.31791C9.662 7.30791 9.646 7.30391 9.634 7.29391L1.92 0.311908C1.486 -0.0780926 0.782 -0.0780926 0.348 0.311908C0.344 0.315907 0.342 0.319907 0.34 0.323907C0.234911 0.410678 0.150037 0.519351 0.0913105 0.642331C0.032584 0.765311 0.00142139 0.899632 0 1.03591L0 15.0019C0.00224243 15.1407 0.0349295 15.2773 0.0957527 15.402C0.156576 15.5268 0.244052 15.6367 0.352 15.7239L0.348 15.7279C0.566371 15.9166 0.845367 16.0205 1.134 16.0205C1.42263 16.0205 1.70163 15.9166 1.92 15.7279L9.674 8.72991C9.77612 8.64279 9.85813 8.53455 9.91436 8.41266C9.97059 8.29078 9.99971 8.15814 9.99971 8.02391C9.99971 7.88967 9.97059 7.75704 9.91436 7.63515C9.85813 7.51326 9.77612 7.40503 9.674 7.31791Z" fill="#E7538C"/>
            </svg>
        </div>
    </div>
    <div class="mostLikelyTo">
        <h3> Most Likely To </h3>

        <div>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M11.6817 11C12.8208 11 13.7442 11.9234 13.7442 13.0625L13.7431 14.0915C13.8846 16.6168 11.9396 17.8761 8.33277 17.8761C4.73759 17.8761 2.75 16.6332 2.75 14.1275V13.0625C2.75 11.9234 3.67341 11 4.8125 11H11.6817ZM17.1825 11C18.3216 11 19.245 11.9234 19.245 13.0625L19.244 13.7865C19.3683 16.0518 17.6497 17.1875 14.5084 17.1875C14.082 17.1875 13.6811 17.1667 13.3068 17.1252C14.0448 16.4437 14.4395 15.5189 14.4382 14.3503L14.4296 14.0531L14.4317 13.0625C14.4317 12.2408 14.0714 11.5033 13.5001 10.9994L17.1825 11ZM8.25 2.75C10.1488 2.75 11.6881 4.28927 11.6881 6.18806C11.6881 8.08684 10.1488 9.62611 8.25 9.62611C6.35121 9.62611 4.81194 8.08684 4.81194 6.18806C4.81194 4.28927 6.35121 2.75 8.25 2.75ZM15.125 4.125C16.6438 4.125 17.875 5.35622 17.875 6.875C17.875 8.39378 16.6438 9.625 15.125 9.625C13.6062 9.625 12.375 8.39378 12.375 6.875C12.375 5.35622 13.6062 4.125 15.125 4.125Z" fill="#747474"/>
                </svg>

                <p>2+</p>
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="17" viewBox="0 0 10 17" fill="none">
            <path d="M9.674 7.31791C9.662 7.30791 9.646 7.30391 9.634 7.29391L1.92 0.311908C1.486 -0.0780926 0.782 -0.0780926 0.348 0.311908C0.344 0.315907 0.342 0.319907 0.34 0.323907C0.234911 0.410678 0.150037 0.519351 0.0913105 0.642331C0.032584 0.765311 0.00142139 0.899632 0 1.03591L0 15.0019C0.00224243 15.1407 0.0349295 15.2773 0.0957527 15.402C0.156576 15.5268 0.244052 15.6367 0.352 15.7239L0.348 15.7279C0.566371 15.9166 0.845367 16.0205 1.134 16.0205C1.42263 16.0205 1.70163 15.9166 1.92 15.7279L9.674 8.72991C9.77612 8.64279 9.85813 8.53455 9.91436 8.41266C9.97059 8.29078 9.99971 8.15814 9.99971 8.02391C9.99971 7.88967 9.97059 7.75704 9.91436 7.63515C9.85813 7.51326 9.77612 7.40503 9.674 7.31791Z" fill="#E7538C"/>
            </svg>
        </div>
    </div>
    <div class="truthOrDare">
        <h3>Truth or Dare</h3>

        <div>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M11.6817 11C12.8208 11 13.7442 11.9234 13.7442 13.0625L13.7431 14.0915C13.8846 16.6168 11.9396 17.8761 8.33277 17.8761C4.73759 17.8761 2.75 16.6332 2.75 14.1275V13.0625C2.75 11.9234 3.67341 11 4.8125 11H11.6817ZM17.1825 11C18.3216 11 19.245 11.9234 19.245 13.0625L19.244 13.7865C19.3683 16.0518 17.6497 17.1875 14.5084 17.1875C14.082 17.1875 13.6811 17.1667 13.3068 17.1252C14.0448 16.4437 14.4395 15.5189 14.4382 14.3503L14.4296 14.0531L14.4317 13.0625C14.4317 12.2408 14.0714 11.5033 13.5001 10.9994L17.1825 11ZM8.25 2.75C10.1488 2.75 11.6881 4.28927 11.6881 6.18806C11.6881 8.08684 10.1488 9.62611 8.25 9.62611C6.35121 9.62611 4.81194 8.08684 4.81194 6.18806C4.81194 4.28927 6.35121 2.75 8.25 2.75ZM15.125 4.125C16.6438 4.125 17.875 5.35622 17.875 6.875C17.875 8.39378 16.6438 9.625 15.125 9.625C13.6062 9.625 12.375 8.39378 12.375 6.875C12.375 5.35622 13.6062 4.125 15.125 4.125Z" fill="#747474"/>
                </svg>

                <p>2+</p>
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="17" viewBox="0 0 10 17" fill="none">
            <path d="M9.674 7.31791C9.662 7.30791 9.646 7.30391 9.634 7.29391L1.92 0.311908C1.486 -0.0780926 0.782 -0.0780926 0.348 0.311908C0.344 0.315907 0.342 0.319907 0.34 0.323907C0.234911 0.410678 0.150037 0.519351 0.0913105 0.642331C0.032584 0.765311 0.00142139 0.899632 0 1.03591L0 15.0019C0.00224243 15.1407 0.0349295 15.2773 0.0957527 15.402C0.156576 15.5268 0.244052 15.6367 0.352 15.7239L0.348 15.7279C0.566371 15.9166 0.845367 16.0205 1.134 16.0205C1.42263 16.0205 1.70163 15.9166 1.92 15.7279L9.674 8.72991C9.77612 8.64279 9.85813 8.53455 9.91436 8.41266C9.97059 8.29078 9.99971 8.15814 9.99971 8.02391C9.99971 7.88967 9.97059 7.75704 9.91436 7.63515C9.85813 7.51326 9.77612 7.40503 9.674 7.31791Z" fill="#E7538C"/>
            </svg>
        </div>
    </div>
    <div class="wouldYouRather">
        <h3>Would You Rather</h3>

        <div>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M11.6817 11C12.8208 11 13.7442 11.9234 13.7442 13.0625L13.7431 14.0915C13.8846 16.6168 11.9396 17.8761 8.33277 17.8761C4.73759 17.8761 2.75 16.6332 2.75 14.1275V13.0625C2.75 11.9234 3.67341 11 4.8125 11H11.6817ZM17.1825 11C18.3216 11 19.245 11.9234 19.245 13.0625L19.244 13.7865C19.3683 16.0518 17.6497 17.1875 14.5084 17.1875C14.082 17.1875 13.6811 17.1667 13.3068 17.1252C14.0448 16.4437 14.4395 15.5189 14.4382 14.3503L14.4296 14.0531L14.4317 13.0625C14.4317 12.2408 14.0714 11.5033 13.5001 10.9994L17.1825 11ZM8.25 2.75C10.1488 2.75 11.6881 4.28927 11.6881 6.18806C11.6881 8.08684 10.1488 9.62611 8.25 9.62611C6.35121 9.62611 4.81194 8.08684 4.81194 6.18806C4.81194 4.28927 6.35121 2.75 8.25 2.75ZM15.125 4.125C16.6438 4.125 17.875 5.35622 17.875 6.875C17.875 8.39378 16.6438 9.625 15.125 9.625C13.6062 9.625 12.375 8.39378 12.375 6.875C12.375 5.35622 13.6062 4.125 15.125 4.125Z" fill="#747474"/>
                </svg>

                <p>2+</p>
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="17" viewBox="0 0 10 17" fill="none">
            <path d="M9.674 7.31791C9.662 7.30791 9.646 7.30391 9.634 7.29391L1.92 0.311908C1.486 -0.0780926 0.782 -0.0780926 0.348 0.311908C0.344 0.315907 0.342 0.319907 0.34 0.323907C0.234911 0.410678 0.150037 0.519351 0.0913105 0.642331C0.032584 0.765311 0.00142139 0.899632 0 1.03591L0 15.0019C0.00224243 15.1407 0.0349295 15.2773 0.0957527 15.402C0.156576 15.5268 0.244052 15.6367 0.352 15.7239L0.348 15.7279C0.566371 15.9166 0.845367 16.0205 1.134 16.0205C1.42263 16.0205 1.70163 15.9166 1.92 15.7279L9.674 8.72991C9.77612 8.64279 9.85813 8.53455 9.91436 8.41266C9.97059 8.29078 9.99971 8.15814 9.99971 8.02391C9.99971 7.88967 9.97059 7.75704 9.91436 7.63515C9.85813 7.51326 9.77612 7.40503 9.674 7.31791Z" fill="#E7538C"/>
            </svg>
        </div>
    </div>
    <div class="spinTheBottle">
        <h3>Spin The Bottle</h3>

        <div>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M11.6817 11C12.8208 11 13.7442 11.9234 13.7442 13.0625L13.7431 14.0915C13.8846 16.6168 11.9396 17.8761 8.33277 17.8761C4.73759 17.8761 2.75 16.6332 2.75 14.1275V13.0625C2.75 11.9234 3.67341 11 4.8125 11H11.6817ZM17.1825 11C18.3216 11 19.245 11.9234 19.245 13.0625L19.244 13.7865C19.3683 16.0518 17.6497 17.1875 14.5084 17.1875C14.082 17.1875 13.6811 17.1667 13.3068 17.1252C14.0448 16.4437 14.4395 15.5189 14.4382 14.3503L14.4296 14.0531L14.4317 13.0625C14.4317 12.2408 14.0714 11.5033 13.5001 10.9994L17.1825 11ZM8.25 2.75C10.1488 2.75 11.6881 4.28927 11.6881 6.18806C11.6881 8.08684 10.1488 9.62611 8.25 9.62611C6.35121 9.62611 4.81194 8.08684 4.81194 6.18806C4.81194 4.28927 6.35121 2.75 8.25 2.75ZM15.125 4.125C16.6438 4.125 17.875 5.35622 17.875 6.875C17.875 8.39378 16.6438 9.625 15.125 9.625C13.6062 9.625 12.375 8.39378 12.375 6.875C12.375 5.35622 13.6062 4.125 15.125 4.125Z" fill="#747474"/>
                </svg>

                <p>1+</p>
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="17" viewBox="0 0 10 17" fill="none">
            <path d="M9.674 7.31791C9.662 7.30791 9.646 7.30391 9.634 7.29391L1.92 0.311908C1.486 -0.0780926 0.782 -0.0780926 0.348 0.311908C0.344 0.315907 0.342 0.319907 0.34 0.323907C0.234911 0.410678 0.150037 0.519351 0.0913105 0.642331C0.032584 0.765311 0.00142139 0.899632 0 1.03591L0 15.0019C0.00224243 15.1407 0.0349295 15.2773 0.0957527 15.402C0.156576 15.5268 0.244052 15.6367 0.352 15.7239L0.348 15.7279C0.566371 15.9166 0.845367 16.0205 1.134 16.0205C1.42263 16.0205 1.70163 15.9166 1.92 15.7279L9.674 8.72991C9.77612 8.64279 9.85813 8.53455 9.91436 8.41266C9.97059 8.29078 9.99971 8.15814 9.99971 8.02391C9.99971 7.88967 9.97059 7.75704 9.91436 7.63515C9.85813 7.51326 9.77612 7.40503 9.674 7.31791Z" fill="#E7538C"/>
            </svg>
        </div>
    </diV>
    <div class="fillInTheBlank">
        <h3>Fill In The Blank</h3>

        <div>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M11.6817 11C12.8208 11 13.7442 11.9234 13.7442 13.0625L13.7431 14.0915C13.8846 16.6168 11.9396 17.8761 8.33277 17.8761C4.73759 17.8761 2.75 16.6332 2.75 14.1275V13.0625C2.75 11.9234 3.67341 11 4.8125 11H11.6817ZM17.1825 11C18.3216 11 19.245 11.9234 19.245 13.0625L19.244 13.7865C19.3683 16.0518 17.6497 17.1875 14.5084 17.1875C14.082 17.1875 13.6811 17.1667 13.3068 17.1252C14.0448 16.4437 14.4395 15.5189 14.4382 14.3503L14.4296 14.0531L14.4317 13.0625C14.4317 12.2408 14.0714 11.5033 13.5001 10.9994L17.1825 11ZM8.25 2.75C10.1488 2.75 11.6881 4.28927 11.6881 6.18806C11.6881 8.08684 10.1488 9.62611 8.25 9.62611C6.35121 9.62611 4.81194 8.08684 4.81194 6.18806C4.81194 4.28927 6.35121 2.75 8.25 2.75ZM15.125 4.125C16.6438 4.125 17.875 5.35622 17.875 6.875C17.875 8.39378 16.6438 9.625 15.125 9.625C13.6062 9.625 12.375 8.39378 12.375 6.875C12.375 5.35622 13.6062 4.125 15.125 4.125Z" fill="#747474"/>
                </svg>

                <p>2+</p>
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="17" viewBox="0 0 10 17" fill="none">
            <path d="M9.674 7.31791C9.662 7.30791 9.646 7.30391 9.634 7.29391L1.92 0.311908C1.486 -0.0780926 0.782 -0.0780926 0.348 0.311908C0.344 0.315907 0.342 0.319907 0.34 0.323907C0.234911 0.410678 0.150037 0.519351 0.0913105 0.642331C0.032584 0.765311 0.00142139 0.899632 0 1.03591L0 15.0019C0.00224243 15.1407 0.0349295 15.2773 0.0957527 15.402C0.156576 15.5268 0.244052 15.6367 0.352 15.7239L0.348 15.7279C0.566371 15.9166 0.845367 16.0205 1.134 16.0205C1.42263 16.0205 1.70163 15.9166 1.92 15.7279L9.674 8.72991C9.77612 8.64279 9.85813 8.53455 9.91436 8.41266C9.97059 8.29078 9.99971 8.15814 9.99971 8.02391C9.99971 7.88967 9.97059 7.75704 9.91436 7.63515C9.85813 7.51326 9.77612 7.40503 9.674 7.31791Z" fill="#E7538C"/>
            </svg>
        </div>
    </div>
    `;

    // If host is already in a game load opion to end game, otherwise load option to join game
    if(currentGame){
        let gameId = localStorage.getItem("gameId");
        let bottomBox = document.createElement("div");
        bottomBox.classList.add("leavGameDisplay");
        bottomBox.innerHTML = `
        <button class="leaveGame">End Game</button>
        <div>${gameId}</div>
        `;
        main.appendChild(bottomBox);

        document.querySelector(".leaveGame").addEventListener("click", leaveGame);
    }else{
        let bottomBox = document.createElement("div");
        bottomBox.classList.add("joinGame");
        bottomBox.innerHTML = `
        <h3>Join Game by ID</h3>
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

    main.querySelector(".fillInTheBlank").addEventListener("click",()=>{
        renderCategories("Fill In The Blank");
    } );
    
    // Remove quit button from footer
    let footer = document.querySelector("footer");
    footer.innerHTML=``;
    footer.classList.add("removed");
}


// Function to display categories after selecting a game
function renderCategories(game){

    // Will be true if player is currently host in a game, otherwise false
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
    footer.removeAttribute("class");

    footer.innerHTML = `
    <div class="buttonQuit">
        <i class="fa-solid fa-chevron-left" style="color: #747474;"></i>
        <p>BACK</p>
    </div>
    `;

    footer.querySelector(".buttonQuit").addEventListener("click", () => {
        // If player is host in a game render game display with gameId
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
    
    // When clicking back go back to game display
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


