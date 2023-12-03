/*
    TO DO:
    - Players 
    - Instructions
    - Language
*/

// Function to display menu
function renderMenu() {

    let menuPopup = document.createElement("div");
    menuPopup.classList.add("menuPopup");

    menuPopup.innerHTML = `
    <i class="fa-solid fa-xmark fa-lg exit" style="color: #747474;"></i>

    <div class="menuOptions">
        <div class="menuOption games">
            <i class="fa-solid fa-martini-glass-empty" style="color: #e6e6e6;"></i>
            <p>Games</p>
        </div>
        <div class="menuOption players">
            <i class="fa-solid fa-user-group" style="color: #e6e6e6;"></i>
            <p>Players</p>
        </div>
        <div class="menuOption instructions">
            <i class="fa-solid fa-circle-info" style="color: #e6e6e6;"></i>
            <p>Instructions</p>
        </div>
        <div class="menuOption language">
            <i class="fa-solid fa-earth-americas" style="color: #e6e6e6;"></i>
            <p>Language</p>
        </div>
    </div>
    `;

    document.querySelector("body").appendChild(menuPopup);

    // Display games on click
    menuPopup.querySelector(".menuOptions > .games").addEventListener("click", () => {

        // If gamedisplay already rendered remove menu, otherwise render game display
        if (!document.querySelector("main").classList.contains("gameDisplay")) {
            document.querySelector("body").removeChild(menuPopup);
            renderGameDisplay();
        } else {
            document.querySelector("body").removeChild(menuPopup);
        }

    });

    // Display players
    //menuPopup.querySelector(".players").addEventListener("click", renderGameDisplay);

    // Display instructions
    //menuPopup.querySelector(".instructions").addEventListener("click", renderGameDisplay);

    // Display language settings
    //menuPopup.querySelector(".language").addEventListener("click", renderGameDisplay);

    // Close menu
    menuPopup.querySelector(".exit").addEventListener("click", closeMenu);

    function closeMenu(event) {
        document.querySelector("body").removeChild(event.originalTarget.parentElement);
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

// Function to run a set timer
function runTimer(time, progressbar, callback) {

    let timeLeft = time;

    function isTimeLeft() {
        return timeLeft > -1;
    }

    let countdownTimer = setInterval(function () {
        if (isTimeLeft()) {
            const timeRemaining = timeLeft--;
            const progress = (100 / time) * timeRemaining;
            progressbar.style.width = `${progress}%`;
        } else {
            clearInterval(countdownTimer);
            if (callback) {
                callback();
            }
        }


    }, 1000);
}
