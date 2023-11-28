"use strict";

// Global variable to track index
let wouldYRIIndex = 0;

// Setter and getter function for would you rather question index
function setWouldYRIndex(index) {
    wouldYRIIndex = index;
}

function getWouldYRIndex() {
    return wouldYRIIndex;
}

// Function fetches a random question from PHP depending on category
async function renderWouldYouRather(gameId) {
    let main = document.querySelector("main");
    main.innerHTML = `
        <div id="wouldYouRatherWrapper">
            <h1>Would You Rather?</h1>
            <div class="timer">
                <div class="progressbar"></div>
            </div>
            
            <section>
                <button id="btnThis" data-set="this"></button>
                <div>OR</div>
                <button id="btnThat" data-set="that"></button>
            </section>
        </div>
    `;

    // Add footer with quit button and next button
    let footer = document.querySelector("footer");
    footer.innerHTML = `
         <div class="buttonQuit">
             <i class="fa-solid fa-chevron-left" style="color: #747474;"></i>
             <p>QUIT</p>
         </div>
         <button class="nextButton">NEXT</button>
     `;

    // Next-button should not be displayed when choosing truth or dare options
    document.querySelector(".nextButton").style.opacity = "0";

    let data = {
        category: "The Basic Version",
        action: "fetchQuestion"
    };

    // POST-request to wouldYouRather.php
    const request = new Request("php/wouldYouRather.php", {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify(data)
    });

    const response = await fetch(request);

    // If response is OK, render new innerHTML that displays the results
    if (response.status === 200) {
        let data = await response.json();
        console.log(data.questions);

        function displayWouldYouRatherQuestion(data, index) {
            const thisQuestion = document.getElementById("btnThis");
            const thatQuestion = document.getElementById("btnThat");

            thisQuestion.innerHTML = `${data.questions[index].this}`;
            thatQuestion.innerHTML = `${data.questions[index].that}`;

            document.querySelectorAll("section>button").forEach((button) => {
                button.addEventListener("click", (e) => {
                    let questionType = e.target.dataset["set"];
                    console.log(e.target.dataset["set"]);
                    updateSelectedQuestion(questionType)
                })
            });
        }

        const questionIndex = getWouldYRIndex();
        displayWouldYouRatherQuestion(data, questionIndex)

        async function updateSelectedQuestion(type) {
            let data = {
                gameId: gameId,
                questionType: type,
                vote: "one",
                action: "updateVotes"
            };

            // POST-request to wouldYouRather.php
            const request = new Request("php/wouldYouRather.php", {
                method: "POST",
                headers: { "Content-type": "application/json; charset=UTF-8" },
                body: JSON.stringify(data)
            });

            const response = await fetch(request);

            // If response OK, display css for which option is selected
            if (response.status === 200) {
                let data = await response.json();
                console.log(data);

                if (type == "this") {
                    console.log("hej");
                    document.getElementById("btnThis").style.border = `3px solid var(--green)`;
                    document.getElementById("btnThat").style.border = `0px`;
                } else {
                    document.getElementById("btnThat").style.border = `3px solid var(--green)`;
                    document.getElementById("btnThis").style.border = `0px`;

                }
            }

        }

        function readWouldYouRatherResults() {

        }


        function displayWouldYouRatherResults(data) {

        }
    }
    else {
        let error = await response.json();
        feedback(error.message);
    }

    // Set countdown timer for 15 seconds
    let progressbar = document.querySelector(".progressbar");
    runTimer(15, progressbar, function () {
        // renderWouldYouRatherResult()
        console.log("HEJ");
    });
}

// Function to create a game between players
async function createWouldYRGame() {

    let data = {
        action: "createGame"
    }

    const request = new Request("php/wouldYouRather.php", {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify(data)
    });

    // Fetch request and handle response
    try {
        let response = await fetch(request);

        if (response.ok) {
            let resource = await response.json();
            console.log(resource);
            let gameId = resource;
            renderWouldYouRather(gameId);
        } else {
            let error = await response.json();
            feedback(error.message);
        }
    } catch (error) {
        console.log("Something went wrong", error);
    }
}

createWouldYRGame()