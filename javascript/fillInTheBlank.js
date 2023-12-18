"use strict";

async function renderFillInTheBlank(category, gameId, questionIndex = 0) {

    let main = document.querySelector("main");
    main.removeAttribute("class");
    main.classList.add("fillInTheBlank");

    let footer = document.querySelector("footer");
    footer.removeAttribute("class");
    footer.classList.add("fillInTheBlank");

    // Fetch questions
    let requestDataForQuestion = {
        action: "fetchQuestion",
        category: category,
        questionIndex: questionIndex
    }

    let questions = await fetchFillInTheBlank(requestDataForQuestion);

    // Select question based on index
    let questionData = questions[questionIndex];
    let question = questionData.question;

    // Fetch players
    let requestDataForPlayers = {
        action: "getPlayers",
        gameId: gameId
    }

    let players = await handleGameFetch(requestDataForPlayers);
    let player;

    let isHost = window.localStorage.getItem("host");
    // If host, select random player for question. If player get selected player
    if (isHost) {
        let randomIndex = Math.floor(Math.random() * players.length);
        player = players[randomIndex];

        // Send request to update playerInQuestion
        let requestDataForUpdatingPlayerInQuestion = {
            action: "updatePlayerInQuestion",
            gameId: gameId,
            player: player
        }

        handleGameFetch(requestDataForUpdatingPlayerInQuestion);
    } else {
        // Send request to update playerInQuestion
        let requestDataForGettingPlayerInQuestion = {
            action: "getPlayerInQuestion",
            gameId: gameId
        }

        player = await handleGameFetch(requestDataForGettingPlayerInQuestion);
    }

    // Construct question by adding random players name
    let modifiedQuestion = question.replace("_", player);

    // Structure of main, present question
    main.innerHTML = `
    <div class="wrapper">
        <h1>Fill in the blank</h1>
        <div class="questionBox">
            <p>${modifiedQuestion}</p>
        </div>
        <div class="timer">
            <div class="progressbar"></div>
        </div>
        <input class="fillInTheBlankAnswer"></input>
    </div>
    `;

    // If player is not host, check if game still exist and if there is an ongoing game
    let checkActiveGame;
    if (!isHost) {
        checkActiveGame = setInterval(() => {
            checkIfGameExist(gameId, checkActiveGame);
            checkForActiveGame(gameId, answerTime, checkActiveGame);
        }, 1000);
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

                // Clear timer so no results are presented
                clearInterval(answerTime);

                // Send request to clear votes
                let requestDataToClearVotes = {
                    gameId: gameId,
                    action: "clearVotes",
                }

                await fetchMostLikelyTo(requestDataToClearVotes);

                let requestDataForEndingRound = {
                    action: "endRound",
                    gameId: gameId
                }

                await handleGameFetch(requestDataForEndingRound);

                // Go back to category page
                renderCategories("Fill In The Blank");
            })


        } else {
            // If user is not host - ask to leave game or keep playing
            clearInterval(checkActiveGame);
            leaveGame(answerTime);
        }
    })

    // If host set initial timer
    if (isHost) {
        let gameId = parseInt(localStorage.getItem("gameId"));

        let requestDataForUpdateTimer = {
            gameId: gameId,
            action: "updateTime",
            timeLeft: 30
        }

        await handleGameFetch(requestDataForUpdateTimer);
    }

    // Set aswering timer for 15sec
    let progressbar = document.querySelector(".progressbar");
    let answerTime = await runTimer(30, progressbar, async function () {
        // Save players answer
        let playerAnswer = document.querySelector(".fillInTheBlankAnswer").value;
        let playerName = window.localStorage.getItem("playerName");

        // If player has given an answer save this in json file
        if(playerAnswer.length > 0){
            // Send request to save answer
            let requestDataToSaveAnswer = {
                gameId: gameId,
                action: "saveAnswer",
                playerName: playerName,
                playerAnswer: playerAnswer
            }

            await fetchFillInTheBlank(requestDataToSaveAnswer);
        }
        

        // Stop checking for active game
        clearInterval(checkActiveGame);

        // Render all players answers for voting
        renderFillInTheBlankVoting(modifiedQuestion, category, questionIndex);
    });
}

async function renderFillInTheBlankVoting(modifiedQuestion, category, questionIndex) {

    let main = document.querySelector("main");

    main.innerHTML = `
    <div class="wrapper">
        <h1>Fill in the blank</h1>
        <div class="questionBox">
            ${modifiedQuestion}
        </div>
        <div class="timer">
            <div class="progressbar"></div>
        </div>
        <div class="answers"></div>

    </div>
    `;

    // Send request to fetch all answers
    let gameId = localStorage.getItem("gameId");

    let requestDataToFetchAnswers = {
        gameId: gameId,
        action: "fetchAnswers",
    }

    let allAnswers = await fetchFillInTheBlank(requestDataToFetchAnswers);

    // Remove players own answer for voting
    let allAnswersExceptPlayer = Object.assign({}, allAnswers);
    let playerName = localStorage.getItem("playerName");

    if (allAnswersExceptPlayer.hasOwnProperty(playerName)) {
        delete allAnswersExceptPlayer[playerName];
    }

    let length = Object.keys(allAnswersExceptPlayer).length;

    // Present each of the other players answer
    if (length === 0) {
        let infoBox = document.createElement("div");
        infoBox.classList.add("infoBox");
        infoBox.innerHTML = `
        <p>No other players gave an answer</p>
        `;
        document.querySelector(".answers").appendChild(infoBox);
    }

    for (let answer in allAnswersExceptPlayer) {
        let answerBox = document.createElement("div");
        answerBox.innerHTML = `<p>${allAnswersExceptPlayer[answer]}</p>`;

        document.querySelector(".answers").appendChild(answerBox);

        // Vote for person when clicking
        answerBox.addEventListener("click", () => {

            let previousVote = null;
            let newVote = null;

            // Update who is voted for and if a previous vote needs to be removed
            if (answerBox.classList.contains("selected")) {
                previousVote = answerBox.textContent;
                answerBox.classList.remove("selected");
            } else {
                document.querySelectorAll(".answers > div").forEach(answer => {
                    if (answer.classList.contains("selected")) {
                        previousVote = answer.textContent;
                        answer.classList.remove("selected");
                    }
                });

                newVote = answerBox.textContent;
                answerBox.classList.add("selected");
            }

            let requestDataToVote = {
                gameId: gameId,
                action: "updateSelected",
                vote: newVote,
                previousVote: previousVote
            }

            fetchFillInTheBlank(requestDataToVote);
        })
    };

    let footer = document.querySelector("footer");

    footer.innerHTML = `
    <div class="buttonQuit">
        <i class="fa-solid fa-chevron-left" style="color: #747474;"></i>
        <p>QUIT</p>
    </div>`;

    // When clicking quit button ask user to confirm
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
            })

            // End round and go back to category display
            popUp.querySelector(".leaveGame").addEventListener("click", async () => {

                // Clear timer so no results are presented
                clearInterval(answerTime);

                // Send request to clear votes
                let requestDataToClearVotes = {
                    gameId: gameId,
                    action: "clearVotes",
                }
                await fetchMostLikelyTo(requestDataToClearVotes);

                let requestDataForEndingRound = {
                    action: "endRound",
                    gameId: gameId
                }

                await handleGameFetch(requestDataForEndingRound);

                // Go back to category page
                renderCategories("Fill In The Blank");
            })

        } else {
            // If user is not host - ask to leave game or keep playing
            //clearInterval(checkActiveGame);
            leaveGame(answerTime);
        }

    })

    let isHost = window.localStorage.getItem("host");
    //If host set timer for voting
    if (isHost) {
        let gameId = parseInt(localStorage.getItem("gameId"));

        let requestDataForUpdateTimer = {
            gameId: gameId,
            action: "updateTime",
            timeLeft: 15
        }

        await handleGameFetch(requestDataForUpdateTimer);
    }

    // Set aswering timer for 15 sec, then present results
    let progressbar = document.querySelector(".progressbar");
    let answerTime = await runTimer(15, progressbar, async function () {

        // Clear voting boxes to replace with result boxes
        document.querySelector(".answers").innerHTML = ``;

        // Fetch voting results
        let requestDataToFetchVotes = {
            gameId: gameId,
            action: "fetchVotes"
        }

        let votes = await fetchFillInTheBlank(requestDataToFetchVotes);

        if(votes.length < 1){
            let infoBox = document.createElement("div");
            infoBox.classList.add("infoBox");
            infoBox.innerHTML = `
            <p>No answers was given</p>
            `;
            document.querySelector(".answers").appendChild(infoBox);
        }

        // Initialize vote counter for all answers
        let answerVoteCounter = {};
        for (let name in allAnswers) {
            answerVoteCounter[name] = 0;
        }

        // Count votes for each answer
        votes.forEach((votedAnswer) => {
            for (let name in allAnswers) {
                if (allAnswers[name] === votedAnswer) {
                    answerVoteCounter[name]++;
                }
            }
        });

        // Convert answerVotesCount to an array of objects for sorting
        const sortedAnswers = Object.keys(answerVoteCounter).map((answer) => ({
            answer,
            votes: answerVoteCounter[answer]
        }));

        // Sort the array by the number of votes in descending order
        sortedAnswers.sort((a, b) => b.votes - a.votes);

        // Display results
        sortedAnswers.forEach((item) => {
            let answerBox = document.createElement("div");
            answerBox.classList.add("result");

            // Give mostVoted class to person with most votes
            if (item.votes === sortedAnswers[0].votes) {
                answerBox.classList.add("mostVoted");
            }

            answerBox.innerHTML = `
                <p>${allAnswers[item.answer]}</p>
                <div>${item.votes}</div>
                <div class="answerName">${item.answer}</div>
            `;

            document.querySelector(".answers").appendChild(answerBox);
        })

        let footer = document.querySelector("footer");

        let isHost = window.localStorage.getItem("host");

        // If host, display next button
        if (isHost) {
            let footer = document.querySelector("footer");

            footer.innerHTML = `
            <div class="buttonQuit">
                <i class="fa-solid fa-chevron-left" style="color: #747474;"></i>
                <p>QUIT</p>
            </div>
            <button class="nextButton">NEXT</button>
            `;

            // When host clicks on next button, clear votes and call to render next question
            footer.querySelector(".nextButton").addEventListener("click", async () => {

                // Send request to clear votes
                let requestDataToClearVotes = {
                    gameId: gameId,
                    action: "clearVotes",
                }

                await fetchFillInTheBlank(requestDataToClearVotes);

                // Send request to update question index
                let requestDataToUpdateQuestionIndex = {
                    gameId: gameId,
                    action: "updateQuestionIndex",
                }

                let questionIndex = await handleGameFetch(requestDataToUpdateQuestionIndex);

                // Render next question
                renderFillInTheBlank(category, gameId, questionIndex);
            });

        } else {
            footer.innerHTML = `
            <div class="buttonQuit">
                <i class="fa-solid fa-chevron-left" style="color: #747474;"></i>
                <p>QUIT</p>
            </div>`;
        }

        let checkActiveGame;
        if (!isHost) {
            // If player is not host, check if game still exist and if there is an ongoing game
            // Also check if next question should be run
            checkActiveGame = setInterval(async () => {
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
                    renderFillInTheBlank(category, gameId, activeQuestion);
                }

            }, 1000);
        }

        // When clicking quit button ask user to confirm
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
                        <button class="leaveGame">YES</button>
                        <button class="closePopup clearDesign">NO</button>
                    </div>
                </div>
                `;

                document.querySelector("main").appendChild(popUp);

                // Close pop up and keep playing
                popUp.querySelector(".closePopup").addEventListener("click", () => {
                    popUp.remove();
                })

                // End round and go back to category display
                popUp.querySelector(".leaveGame").addEventListener("click", async () => {

                    // Clear timer so no results are presented
                    clearInterval(answerTime);

                    // Send request to clear votes
                    let requestDataToClearVotes = {
                        gameId: gameId,
                        action: "clearVotes",
                    }
                    await fetchMostLikelyTo(requestDataToClearVotes);

                    let requestDataForEndingRound = {
                        action: "endRound",
                        gameId: gameId
                    }

                    await handleGameFetch(requestDataForEndingRound);

                    // Go back to category page
                    renderCategories("Fill In The Blank");
                })

            } else {
                // If user is not host - ask to leave game or keep playing
                clearInterval(checkActiveGame);
                leaveGame(answerTime);
            }

        })
    });

}

// Function to handle fill in the blank fetch
async function fetchFillInTheBlank(requestData) {

    // Set request parameters
    let requestParameters = {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify(requestData)
    }

    let request = new Request("php/fillInTheBlank.php", requestParameters);

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