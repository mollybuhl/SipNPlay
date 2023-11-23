"use strict";

renderWouldYouRather()

// Function fetches a random question from PHP depending on category
function renderWouldYouRather() {
    let main = document.querySelector("main");
    main.innerHTML = `
        <div id="wouldYouRatherWrapper">
            <h1>Would You Rather?</h1>
            <div>
                <progress id="timer" value="32" max="100"></progress>
            </div>
            
            <section>
                <button>kajsdldkjdlsa</button>
                <div>OR</div>
                <button>Dkj ndjposd ajpoasd kpo</button>
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
        <button id="nextButton">NEXT</button>
    `;

    // Next-button should not be displayed when choosing truth or dare options
    document.getElementById("nextButton").style.opacity = "0";
}