"use strict";

// // Global variable to track index and gameId
let wouldYRIIndex = 0;
// let gameId;
let questionsArray;


// // Setter and getter functions for would you rather question index and gameID
async function setWouldYRIndex(index, gameId) {
    wouldYRIIndex = index;

    let rqstToSetnewIndex = {
        action: "setQuestionIndex",
        gameId: gameId,
        index: wouldYRIIndex
    };

    await handleGameFetch(rqstToSetnewIndex);
}

function getWouldYRIndex() {
    return wouldYRIIndex;
}

function saveQuestionsArray(array) {
    questionsArray = array;
}

function getQuestionsArray() {
    return questionsArray;
}

// Function fetches a random question from PHP depending on category
async function renderWouldYouRather(category, gameId) {
    //Clear all intervals before setting up new ones
    intervalIds.forEach(clearInterval);
    intervalIds = [];

    let main = document.querySelector("main");
    main.removeAttribute("class");
    main.innerHTML = `
        <div id="wouldYouRatherWrapper">
            <h1>Would You Rather?</h1>
            <div class="timer">
                <div class="progressbar"></div>
            </div>
            
            <section>
                <button id="btnThis" data-set="this">
                    <p></p>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="34" viewBox="0 0 32 34" fill="none">
                            <path d="M1.88378 5.61382C1.50723 3.18905 3.38258 1 5.8364 1H26.1636C28.6174 1 30.4928 3.18906 30.1162 5.61382L26.3892 29.6138C26.0865 31.5626 24.4087 33 22.4365 33H9.56346C7.59132 33 5.91347 31.5626 5.61084 29.6138L1.88378 5.61382Z" stroke="#C1C1C1" stroke-width="2"/>
                            <path d="M5.67762 12.0582C5.39971 10.2484 6.94563 8.68277 8.75883 8.9377L8.84957 8.95046C11.2388 9.28637 13.6731 9.07742 15.9701 8.33924C18.5096 7.52314 21.2129 7.35511 23.8339 7.85044L24.1492 7.91003C25.6723 8.19786 26.6933 9.6408 26.4581 11.1729L23.8716 28.0166C23.7217 28.9925 22.8821 29.713 21.8947 29.713H10.105C9.11764 29.713 8.27803 28.9925 8.12817 28.0166L5.67762 12.0582Z" fill="url(#paint0_linear_39_338)"/>
                            <rect x="6" y="31" width="19.84" height="1.47826" fill="#C1C1C1"/>
                            <rect width="1.47091" height="13.0303" rx="0.735457" transform="matrix(0.991675 -0.128767 0.150385 0.988628 7.67993 13.2799)" fill="#2A2A2A"/>
                            <defs>
                                <linearGradient id="paint0_linear_39_338" x1="16" y1="30" x2="16" y2="7" gradientUnits="userSpaceOnUse">
                                    <stop offset="0.0743588" stop-color="#B1C871"/>
                                    <stop offset="0.484375" stop-color="#E9A072"/>
                                    <stop offset="1" stop-color="#E16AB7"/>
                                </linearGradient>
                            </defs>
                        </svg>
                        <mark id="thisResult">0%</mark>
                    </span>
                </button>
                <div>OR</div>
                <button id="btnThat" data-set="that">
                    <p></p>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="34" viewBox="0 0 32 34" fill="none">
                            <path d="M1.88378 5.61382C1.50723 3.18905 3.38258 1 5.8364 1H26.1636C28.6174 1 30.4928 3.18906 30.1162 5.61382L26.3892 29.6138C26.0865 31.5626 24.4087 33 22.4365 33H9.56346C7.59132 33 5.91347 31.5626 5.61084 29.6138L1.88378 5.61382Z" stroke="#C1C1C1" stroke-width="2"/>
                            <path d="M5.67762 12.0582C5.39971 10.2484 6.94563 8.68277 8.75883 8.9377L8.84957 8.95046C11.2388 9.28637 13.6731 9.07742 15.9701 8.33924C18.5096 7.52314 21.2129 7.35511 23.8339 7.85044L24.1492 7.91003C25.6723 8.19786 26.6933 9.6408 26.4581 11.1729L23.8716 28.0166C23.7217 28.9925 22.8821 29.713 21.8947 29.713H10.105C9.11764 29.713 8.27803 28.9925 8.12817 28.0166L5.67762 12.0582Z" fill="url(#paint0_linear_39_338)"/>
                            <rect x="6" y="31" width="19.84" height="1.47826" fill="#C1C1C1"/>
                            <rect width="1.47091" height="13.0303" rx="0.735457" transform="matrix(0.991675 -0.128767 0.150385 0.988628 7.67993 13.2799)" fill="#2A2A2A"/>
                            <defs>
                                <linearGradient id="paint0_linear_39_338" x1="16" y1="30" x2="16" y2="7" gradientUnits="userSpaceOnUse">
                                    <stop offset="0.0743588" stop-color="#B1C871"/>
                                    <stop offset="0.484375" stop-color="#E9A072"/>
                                    <stop offset="1" stop-color="#E16AB7"/>
                                </linearGradient>
                            </defs>
                        </svg>
                        <mark id="thatResult">0%</mark>
                    </span>
                </button>
            </section>
        </div>
    `;

    // Add footer with quit button and next button
    let footer = document.querySelector("footer");
    footer.removeAttribute("class");
    footer.innerHTML = `
        <div class="buttonQuit">
            <i class="fa-solid fa-chevron-left" style="color: #747474;"></i>
            <p>QUIT</p>
        </div>
    `;

    // When clicking quit leave game
    footer.querySelector(".buttonQuit").addEventListener("click", async () => {
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
                let rqstOriginalVotesStructure = {
                    gameId: gameId,
                    action: "originalVotesStructure"
                };

                await fetchWouldYouRather(rqstOriginalVotesStructure);

                let requestDataForEndingRound = {
                    action: "endRound",
                    gameId: gameId
                }

                await handleGameFetch(requestDataForEndingRound);

                clearInterval(answerTime);

                // Go back to category page
                renderCategories("Would You Rather");
            })


        } else {
            // If user is not host - ask to leave game or keep playing
            let rqstOriginalVotesStructure = {
                gameId: gameId,
                action: "originalVotesStructure"
            };

            await fetchWouldYouRather(rqstOriginalVotesStructure);
            clearInterval(checkActiveGame);
            leaveGame(checkActiveGame);
        }
    })

    let rqstToChangeVotesStructure = {
        gameId: gameId,
        action: "replaceVotesStructure"
    };

    await fetchWouldYouRather(rqstToChangeVotesStructure);

    const questionIndex = getWouldYRIndex();
    console.log(questionIndex);

    let rqstQuestion = {
        category: category,
        action: "fetchQuestion"
    };

    let data = await fetchWouldYouRather(rqstQuestion);
    console.log(data.questions);

    const thisQuestion = document.getElementById("btnThis");
    const thatQuestion = document.getElementById("btnThat");

    thisQuestion.querySelector("p").innerHTML = `${data.questions[questionIndex].this}`;
    thatQuestion.querySelector("p").innerHTML = `${data.questions[questionIndex].that}`;

    document.querySelectorAll("section>button").forEach((button) => {
        button.addEventListener("click", (e) => {
            let questionType = e.target.dataset["set"];
            console.log(e.target.dataset["set"]);
            console.log(e.target);
            e.target.classList.toggle("selected");
            updateSelectedQuestion(questionType, e.target)
        });
    });

    async function updateSelectedQuestion(type, target) {

        document.querySelectorAll("section>button").forEach(button => {
            if (button.classList.contains("selected")) {
                button.classList.remove("selected");
                button.disabled = true;
            } else {
                button.disabled = false;
            }
        });

        let rqstToUpdateVotes = {
            gameId: gameId,
            questionType: type,
            vote: localStorage.getItem("playerName"),
            action: "updateVotes"
        };

        await fetchWouldYouRather(rqstToUpdateVotes);

        // If response OK, display css for which option is selected
        if (type == "this") {
            document.getElementById("btnThis").style.border = `3px solid var(--green)`;
            document.getElementById("btnThat").style.border = `0px`;
        } else {
            document.getElementById("btnThat").style.border = `3px solid var(--green)`;
            document.getElementById("btnThis").style.border = `0px`;
        }
    }


    async function readWouldYouRatherResults(questions) {
        let rqstFetchResults = {
            gameId: gameId,
            action: "fetchResults"
        };

        const data = await fetchWouldYouRather(rqstFetchResults);

        document.querySelectorAll("section>button").forEach((button) => {
            button.disabled = true;
            button.style.border = "0px";
        })

        let numOfPlayers = data.players.length;
        let thisPercent;
        let thatPercent;

        if (!data.activeGame.votes.this.length == 0) {
            thisPercent = (data.activeGame.votes.this.length / numOfPlayers) * 100;
        } else {
            thisPercent = 0;
        }

        if (!data.activeGame.votes.that.length == 0) {
            thatPercent = (data.activeGame.votes.that.length / numOfPlayers) * 100;
        } else {
            thatPercent = 0;
        }

        if (thisPercent < thatPercent) {
            document.querySelector("#btnThis > span").style.opacity = "100%";
            document.querySelector("#btnThat > span").style.opacity = "100%";
            document.getElementById("btnThis").style.border = "3px solid var(--green)";
            document.querySelector("#btnThat > span svg").style.opacity = "0";
            document.getElementById("thisResult").innerHTML = thisPercent + "%";
            document.getElementById("thatResult").innerHTML = thatPercent + "%";

        } else if (thisPercent > thatPercent) {
            document.querySelector("#btnThat > span").style.opacity = "100%";
            document.querySelector("#btnThis > span").style.opacity = "100%";
            document.querySelector("#btnThis > span svg").style.opacity = "0";
            document.getElementById("btnThat").style.border = "3px solid var(--green)";
            document.getElementById("thisResult").innerHTML = thisPercent + "%";
            document.getElementById("thatResult").innerHTML = thatPercent + "%";

        } else if (thisPercent === thatPercent) {
            document.querySelector("#btnThat > span").style.opacity = "100%";
            document.querySelector("#btnThis > span").style.opacity = "100%";
            document.getElementById("thisResult").innerHTML = thisPercent + "%";
            document.getElementById("thatResult").innerHTML = thatPercent + "%";
        }

        let isHost = window.localStorage.getItem("host");
        let checkActiveGame;
        if (!isHost) {
            // If player is not host, check if game still exist and if there is an ongoing game
            // Also check if next question should be run
            checkActiveGame = setInterval(async () => {
                let gameId = localStorage.getItem("gameId");
                if(gameId){
                    checkIfGameExist(gameId, checkActiveGame);
                    checkForActiveGame(gameId, answerTime, checkActiveGame);
    
                    let requestDataForNextQuestion = {
                        action: "requestNextQuestion",
                        gameId: gameId,
                        currentQuestion: questionIndex
                    };
    
                    let activeQuestion = await handleGameFetch(requestDataForNextQuestion);
                    console.log(activeQuestion);
                    if (activeQuestion != questionIndex) {
                        clearInterval(checkActiveGame);
                        setWouldYRIndex(questionIndex + 1, gameId)
                        renderWouldYouRather(category, gameId)
                    }
                }else{
                    clearInterval(checkActiveGame);
                }
                

            }, 1000);
            intervalIds.push(checkActiveGame);
        }

        if (isHost) {
            document.querySelector("footer").innerHTML += `
                    <button class="nextButton">NEXT</button>
                `;

            // When clicking quit leave game
            footer.querySelector(".buttonQuit").addEventListener("click", async () => {
                let isHost = window.localStorage.getItem("host");
                // If user is host - ask to play another game or keep playing
                if (isHost) {

                    clearInterval(answerTime);

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
                        let rqstOriginalVotesStructure = {
                            gameId: gameId,
                            action: "originalVotesStructure"
                        };

                        await fetchWouldYouRather(rqstOriginalVotesStructure);

                        let requestDataForEndingRound = {
                            action: "endRound",
                            gameId: gameId
                        }

                        await handleGameFetch(requestDataForEndingRound);

                        // Go back to category page
                        renderCategories("Would You Rather");
                    })


                } else {
                    // If user is not host - ask to leave game or keep playing
                    let rqstOriginalVotesStructure = {
                        gameId: gameId,
                        action: "originalVotesStructure"
                    };

                    await fetchWouldYouRather(rqstOriginalVotesStructure);

                    clearInterval(checkActiveGame);
                    leaveGame(checkActiveGame);
                }
            })

            // enableNextButtonWYR(category)
            document.querySelector(".nextButton").addEventListener("click", () => {
                // Increment index to get new question or set index to 0 to restart
                if (questionIndex < questions.length - 1) {
                    setWouldYRIndex(questionIndex + 1, gameId)

                } else {
                    setWouldYRIndex(0, gameId)
                }
                renderWouldYouRather(category, gameId)
            });
        }
    }

    let isHost = window.localStorage.getItem("host");
    // If host set initial timer
    if (isHost) {
        let gameId = parseInt(localStorage.getItem("gameId"));

        let requestDataForUpdateTimer = {
            gameId: gameId,
            action: "updateTime",
            timeLeft: 15
        }

        await handleGameFetch(requestDataForUpdateTimer);
    }

    // Set countdown timer for 15 seconds
    let progressbar = document.querySelector(".progressbar");
    let answerTime = await runTimer(15, progressbar, async function () {
        clearInterval(checkActiveGame);
        readWouldYouRatherResults(data.questions);
    });

    let checkActiveGame;
    if (!isHost) {
        // If player is not host, check if game still exist and if there is an ongoing game
        // Also check if next question should be run
        checkActiveGame = setInterval(async () => {
            let gameId = localStorage.getItem("gameId");
            if(gameId){
                checkIfGameExist(gameId, checkActiveGame);
                checkForActiveGame(gameId, answerTime, checkActiveGame);

                let requestDataForNextQuestion = {
                    action: "requestNextQuestion",
                    gameId: gameId,
                    currentQuestion: questionIndex
                };

                let activeQuestion = await handleGameFetch(requestDataForNextQuestion);
            
                if (activeQuestion != questionIndex) {
                    clearInterval(checkActiveGame);
                    setWouldYRIndex(questionIndex + 1, gameId)
                    renderWouldYouRather(category, gameId)
                }
            }else{
                clearInterval(checkActiveGame);
            }

        }, 1000);
        intervalIds.push(checkActiveGame)
    }
}

// Function to handle truth or dare fetch
async function fetchWouldYouRather(requestData) {

    // Set request parameters
    let requestParameters = {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify(requestData)
    }

    let request = new Request("php/wouldYouRather.php", requestParameters);

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