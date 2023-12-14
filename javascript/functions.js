
// Function to display menu
function createMenu() {

    // Blacked out backdrop when menu on display
    let background = document.createElement("div");
    background.classList.add("menuPopupBackground");
    document.querySelector("body").appendChild(background);

    // Menu
    let menuPopup = document.createElement("div");
    menuPopup.classList.add("menuPopup");

    menuPopup.innerHTML = `
        <div class="menuOptions">
            <div class="menuOption games">
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="22" viewBox="0 0 21 22" fill="none">
                <path d="M1.31558 3.4913C1.08947 2.12094 2.14668 0.875 3.53556 0.875H17.4644C18.8533 0.875 19.9105 2.12094 19.6844 3.4913L17.2094 18.4913C17.0301 19.5779 16.0907 20.375 14.9894 20.375H6.01056C4.90929 20.375 3.96986 19.5779 3.79058 18.4913L1.31558 3.4913Z" stroke="#E6E6E6" stroke-width="1.5"/>
                <path d="M3.75998 7.78023C3.56084 6.55967 4.59591 5.4929 5.82192 5.65513C7.38273 5.86166 8.97173 5.73209 10.4787 5.27629C12.1479 4.77144 13.9149 4.66678 15.6318 4.97216L15.7593 4.99483C16.8024 5.18036 17.5031 6.16917 17.3325 7.21478L15.7687 16.7993C15.6109 17.7667 14.7751 18.4772 13.7948 18.4772H7.20539C6.22513 18.4772 5.38934 17.7667 5.23149 16.7992L3.75998 7.78023Z" fill="#E6E6E6"/>
                <rect x="5" y="19.125" width="11" height="1" fill="#E6E6E6"/>
                <rect width="0.964373" height="8.05984" rx="0.482187" transform="matrix(0.992615 -0.121307 0.159552 0.98719 5.03979 8.32739)" fill="#2A2A2A"/>
                </svg>
                <p>GAMES</p>
            </div>
            <div class="menuOption instruction">
                <i class="fa-solid fa-circle-info" style="color: #e6e6e6;"></i>
                <p>INSTRUCTIONS</p>
            </div>
            <div class="menuOption language">
                <i class="fa-solid fa-earth-americas" style="color: #e6e6e6;"></i>
                <p>LANGUAGE</p>
            </div>
        </div>
    `;

    document.querySelector("body").appendChild(menuPopup);

    // Display games on click
    menuPopup.querySelector(".menuOptions > .games").addEventListener("click", () => {

        // If gamedisplay already rendered remove menu, otherwise render game display
        if (!document.querySelector("main").classList.contains("gameDisplay")) {
            closeMenu();
            renderGameDisplay();
        } else {
            closeMenu();
        }

    });

    // Display instructions
    //menuPopup.querySelector(".instructions").addEventListener("click", renderGameDisplay);


    function closeMenu(event) {
        background.classList.remove("active");
        menuPopup.classList.remove("active");
    }

}

// Display menu when clicking icon
function renderMenu(){
    document.querySelector(".menuPopup").classList.toggle("active");
    document.querySelector(".menuPopupBackground").classList.toggle("active");

    let menuPopup = document.querySelector(".menuPopup");
    let menuIcon = document.querySelector(".menuIcon");
    let background = document.querySelector(".menuPopupBackground");

    // Close menu on click outside menu 
    document.onclick = function(e){
        if(!menuPopup.contains(e.target) && !menuIcon.contains(e.target)){
            background.classList.remove("active");
            menuPopup.classList.remove("active");
        }
    }
}

let array = [
    "Have friends",
    "Add players",
    "Start Game",
    "Live, Laugh, Love",
    "Success"
]

// renderInstructions(array)
function renderInstructions(steps) {
    let instructionsPopup = document.createElement("div");
    instructionsPopup.classList.add("instructions");

    let index = 0;
    displayInstructions(instructionsPopup, index)

    function displayInstructions(instructionsPopup, index) {
        instructionsPopup.innerHTML = `
            <i class="fa-solid fa-xmark fa-lg exit" style="color: #747474;"></i>

            <section class="steps">
                <h3>Step ${index + 1}</h3>
                <p>${steps[index]}</p>
            </section>

            <div>
                <i class="fa-solid fa-chevron-left" style="color: #747474;"></i>
                <div class="stepsIndicator"></div>
                <i class="fa-solid fa-chevron-right" style="color: #747474;"></i>
            </div>
        `;

        document.querySelector("body").appendChild(instructionsPopup);

        for (let count = 0; count < steps.length; count++) {
            let step = document.createElement("div");
            step.classList.add("circle");
            step.classList.add("nr" + count);
            document.querySelector(".stepsIndicator").appendChild(step);
        }

        document.querySelectorAll(".circle").forEach(circle => {
            if (circle.classList.contains("nr" + index)) {
                circle.style.backgroundColor = `var(--green)`;
            } else {
                circle.style.backgroundColor = `var(--buttonColor)`;
            }
        })

        // Close instructions popup
        instructionsPopup.querySelector(".exit").addEventListener("click", closeInstructions);

        function closeInstructions(event) {
            document.querySelector("body").removeChild(event.originalTarget.parentElement);
        }

        if (index < steps.length - 1) {
            document.querySelector(".instructions .fa-chevron-right").addEventListener("click", () => {
                index++;
                displayInstructions(instructionsPopup, index)
            });
        }

        if (index > 0) {
            document.querySelector(".instructions .fa-chevron-left").addEventListener("click", () => {
                index--;
                displayInstructions(instructionsPopup, index)
            });
        }
    }

}

// Function to set and run a timer
async function runTimer(totalTime, progressbar, callback) {
    
    let gameId = parseInt(localStorage.getItem("gameId"));
    let isHost = window.localStorage.getItem("host");

    // Request tofetch time for timer
    let requestDataToGetTimeLeft = {
        gameId: gameId,
        action: "getTime",
    }

    let timeLeft = await handleGameFetch(requestDataToGetTimeLeft);
    //let timeLeft = time;

    function isTimeLeft() {
        return timeLeft > -1;
    }

    let countdownTimer = setInterval(async function () {
        if (isTimeLeft()) {
            const timeRemaining = timeLeft--;
            const progress = (100 / totalTime) * timeRemaining;
            progressbar.style.width = `${progress}%`;

            // Only host updating timer
            if(isHost){
                // Update timer key in active game
                let requestDataForUpdateTimer = {
                    gameId: gameId,
                    action: "updateTime",
                    timeLeft: timeLeft
                }

                await handleGameFetch(requestDataForUpdateTimer);
            }
            

        } else {
            clearInterval(countdownTimer);
            if (callback) {
                callback();
            }
        }
    },1000);

    return countdownTimer; // Return the time ID
}


