"use strict";

// // Global variables to track index
let truthIndex = 0;
let dareIndex = 0;
let playerIndex = 0;

// Setter and getter function for truth index
async function setTruthIndex(index) {
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

function setPlayerIndex(index) {
    playerIndex = index;
}

function getPlayerIndex() {
    return playerIndex;
}

// Function handles when the client chooses truth or dare
async function truthORDareHandle(category, gameId) {
    // Fetch current players
    let requestData = {
        action: "getPlayers",
        gameId: gameId
    }

    let players = await handleGameFetch(requestData);

    let index;
    if (players.length - 1 < getPlayerIndex()) {
        setPlayerIndex(0);
        index = getPlayerIndex()
    } else {
        index = getPlayerIndex()
    }

    let player = players[index];
    console.log(player);
    console.log(index);

    // Update player in question
    let updatePlayerData = {
        action: "updatePlayerInQuestion",
        gameId: gameId,
        player: player
    }

    await handleGameFetch(updatePlayerData);

    let main = document.querySelector("main");
    main.removeAttribute("class");

    let footer = document.querySelector("footer");
    footer.removeAttribute("class");
    footer.classList.add("truthORDare");

    if (player === localStorage.getItem("playerName")) {
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

        // Assigns an event listener to truth or dare buttons and calls renderTruthORDareQuestion function to generate a question
        document.querySelectorAll("section>button").forEach(button => {
            button.addEventListener("click", (e) => {
                // e.target.attributes.id.value will be either truth or dare
                renderTruthORDareQuestion(e.target.attributes.id.value, category, gameId, player)
            })
        });
    } else {
        main.innerHTML = `
            <div id="truthORDareWrapper">
                <h1>Truth OR Dare?</h1>
                <h2>It's <span>${players[index]}</span>'s turn</h2>
            </div>
        `;

        setInterval(async () => {
            let getPlayerInQuestion = {
                action: "getPlayerInQuestion",
                gameId: gameId
            }
            let playerInQuestion = await handleGameFetch(getPlayerInQuestion);

            if (localStorage.getItem("playerName") === playerInQuestion) {
                truthORDareHandle(category, gameId)
            }

        }, 5000);
    }

    // Structure of footer
    footer.innerHTML = `
        <div class="buttonQuit">
            <i class="fa-solid fa-chevron-left" style="color: #747474;"></i>
            <p>QUIT</p>
        </div>
    `;

    // When clicking quit leave game
    footer.querySelector(".buttonQuit").addEventListener("click", () => {

        let isHost = window.localStorage.getItem("host");

        // If user is host - ask to play another game or keep playing
        if (isHost) {

            // Display pop up
            let gameId = parseInt(localStorage.getItem("gameId"));

            let popUp = document.createElement("div");
            popUp.setAttribute("id", "leaveGamePopUp");

            popUp.innerHTML = `
            <div>
                <p>Are you sure you want to end this round?</p>
                <div>   
                    <button class="leaveGame">End Round</button>
                    <button class="closePopup">Keep Playing</button>
                </div>
            </div>
            `;

            document.querySelector("main").appendChild(popUp);

            // Close pop up and keep playing
            popUp.querySelector(".closePopup").addEventListener("click", () => {
                popUp.remove();
            });

            // End round and go back to category display
            popUp.querySelector(".leaveGame").addEventListener("click", async () => {
                let requestDataForEndingRound = {
                    action: "endRound",
                    gameId: gameId
                }

                await handleGameFetch(requestDataForEndingRound);

                // Go back to category page
                renderCategories("Truth or Dare");
            })


        } else {
            // If user is not host - ask to leave game or keep playing
            leaveGame();
        }
    })
}

// Function fetches a random question from PHP depending on type and category
async function renderTruthORDareQuestion(type, category, gameId, player) {
    let rqstData = {
        type: type,
        category: category,
        action: "fetchQuestion"
    };

    let data = await fetchTruthORDare(rqstData);

    function displayTruthORDareQuestion(data, type, index) {
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

    function renderNewQuestion() {
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

        // Render new round of truth or dare with new player
        setPlayerIndex(getPlayerIndex() + 1)
        truthORDareHandle(category, gameId)
    }

    let footer = document.querySelector("footer");
    // Structure of footer
    footer.innerHTML = `
        <div class="buttonQuit">
            <i class="fa-solid fa-chevron-left" style="color: #747474;"></i>
            <p>QUIT</p>
        </div>
        <button class="nextButton">NEXT</button>
    `;

    // When clicking quit leave game
    footer.querySelector(".buttonQuit").addEventListener("click", () => {

        let isHost = window.localStorage.getItem("host");

        // If user is host - ask to play another game or keep playing
        if (isHost) {
            // Display pop up
            let gameId = parseInt(localStorage.getItem("gameId"));

            let popUp = document.createElement("div");
            popUp.setAttribute("id", "leaveGamePopUp");

            popUp.innerHTML = `
            <div>
                <p>Are you sure you want to end this round?</p>
                <div>   
                    <button class="leaveGame">End Round</button>
                    <button class="closePopup">Keep Playing</button>
                </div>
            </div>
            `;

            document.querySelector("main").appendChild(popUp);

            // Close pop up and keep playing
            popUp.querySelector(".closePopup").addEventListener("click", () => {
                popUp.remove();
            });

            // End round and go back to category display
            popUp.querySelector(".leaveGame").addEventListener("click", async () => {
                let requestDataForEndingRound = {
                    action: "endRound",
                    gameId: gameId
                }

                await handleGameFetch(requestDataForEndingRound);

                // Go back to category page
                renderCategories("Truth or Dare");
            })


        } else {
            // If user is not host - ask to leave game or keep playing
            leaveGame();
            renderNewQuestion()
        }
    })

    document.querySelector(".nextButton").addEventListener("click", () => {
        renderNewQuestion()
    });

}

// Function to handle truth or dare fetch
async function fetchTruthORDare(requestData) {

    // Set request parameters
    let requestParameters = {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify(requestData)
    }

    let request = new Request("php/truthORDare.php", requestParameters);

    // Fetch request and handle response
    try {
        let response = await fetch(request);

        if (response.ok) {
            let resource = await response.json();
            return resource;
        } else {
            let error = await response.json();
            feedback(error.message);
        }
    } catch (error) {
        console.log("Something went wrong", error);
    }
}