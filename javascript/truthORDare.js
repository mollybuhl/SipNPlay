"use strict";

// Global variables to track index
let truthIndex = 0;
let dareIndex = 0;
let playerTODIndex = 0;

// Setter and getter function for truth index
function setTruthIndex(index) {
    truthIndex = index;
}

function getTruthIndex() {
    return truthIndex;
}

// Setter and getter function for dare index
function setDareIndex(index) {
    dareIndex = index;
}

function getDareIndex() {
    return dareIndex;
}

function setPlayerTODIndex(index) {
    playerTODIndex = index;
}

function getPlayerTODIndex() {
    return playerTODIndex;
}


// Function handles when the client chooses truth or dare
async function truthORDareHandle(category, gameId) {
    console.log(gameId)
    // Fetch current players
    let requestData = {
        action: "getPlayers",
        gameId: gameId
    }

    let players = await handleGameFetch(requestData);

    let index;
    if (players.length - 1 < getPlayerTODIndex()) {
        setPlayerTODIndex(0);
        index = getPlayerTODIndex()
    } else {
        index = getPlayerTODIndex()
    }

    let main = document.querySelector("main");
    main.removeAttribute("class");
    main.innerHTML = `
        <div id="truthORDareWrapper">
            <h1>Truth OR Dare?</h1>
            <h2>It's <span>${players[index]}</span>'s turn</h2>

            <section>
                <button id="truth">Truth</button>
                <div>OR</div>
                <button id="dare">Dare</button>
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

    // Assigns an event listener to truth or dare buttons and calls renderTruthORDareQuestion function to generate a question
    document.querySelectorAll("section>button").forEach(button => {
        button.addEventListener("click", (e) => {
            // e.target.attributes.id.value will be either truth or dare
            renderTruthORDareQuestion(e.target.attributes.id.value, category, gameId)
            console.log(e.target.attributes.id.value);
        })
    });
}

// Function fetches a random question from PHP depending on type and category
async function renderTruthORDareQuestion(type, category, gameId) {
    let data = {
        type: type,
        category: category,
        action: "fetchQuestion"
    };

    // POST-request to truthORDare.php
    const request = new Request("php/truthORDare.php", {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify(data)
    });

    const response = await fetch(request);

    // If response is OK, render new innerHTML that displays the question
    if (response.status === 200) {
        let data = await response.json();
        console.log(data.questions);

        function displayTruthORDareQuestion(data, type, index) {
            console.log(index);
            const section = document.querySelector("#truthORDareWrapper>section");
            // Change first letter in string to uppercase
            section.innerHTML = `
                <section id="questionHolder">
                <article>
                    <h2>${type.charAt(0).toUpperCase() + type.slice(1)}</h2>
                    <h3>${data.questions[index]}</h3>
                </article>
                    <p>${data.category}</p>
                </section>
            `;

            // h2 can be either green or pink depending on type
            if (type === "truth") {
                document.querySelector("#questionHolder > article h2").style.color = "var(--green)";

            } else {
                document.querySelector("#questionHolder > article h2").style.color = "var(--pink)";
            }
        }

        let tIndex = getTruthIndex();
        let dIndex = getDareIndex();

        // Display question based on index
        if (type === "truth") {
            displayTruthORDareQuestion(data, type, tIndex)
        } else {
            displayTruthORDareQuestion(data, type, dIndex)
        }

        // The Next-button should now be displayed to repeat truth or dare
        document.querySelector(".nextButton").style.opacity = "100%";
        document.querySelector(".nextButton").addEventListener("click", () => {
            if (type === "truth") {
                // Increment index to get new truth question or set index to 0 to restart
                if (tIndex < data.questions.length - 1) {
                    setTruthIndex(tIndex + 1)
                } else {
                    setTruthIndex(0)
                }
            }

            if (type === "dare") {
                if (dIndex < data.questions.length - 1) {
                    setDareIndex(dIndex + 1)
                } else {
                    setDareIndex(0)
                }
            }

            setPlayerTODIndex(getPlayerTODIndex() + 1)

            truthORDareHandle(category, gameId)
        });

    } else {
        let error = await response.json();
        feedback(error.message);
    }

}
