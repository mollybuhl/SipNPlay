"use strict";

renderWouldYouRather()

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
async function renderWouldYouRather() {
    let main = document.querySelector("main");
    main.innerHTML = `
        <div id="wouldYouRatherWrapper">
            <h1>Would You Rather?</h1>
            <div class="timer">
                <div class="progressbar"></div>
            </div>
            
            <section>
                <button id="btnThis">kajsdldkjdlsa</button>
                <div>OR</div>
                <button id="btnThat">Dkj ndjposd ajpoasd kpo</button>
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
        }


        displayWouldYouRatherQuestion(data, getWouldYRIndex())
        function readWouldYouRatherResults() {

        }


        function displayWouldYouRatherResults(data) {

        }
    }


    // Set countdown timer for 30sec
    let progressbar = document.querySelector(".progressbar");
    runTimer(15, progressbar, function () {
        // renderWouldYouRatherResult()
        console.log("HEJ");
    });
}