"use strict";

/*
    Fortsätt:
    - presentera röstnings resultat
    - ny input tar inte bort existerande
    - ta bort eget svar från röstningen
*/

async function renderFillInTheBlank(category, gameId, questionIndex = 0){

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

    // Select random player for question
    let randomIndex = Math.floor(Math.random() * players.length);
    let player = players[randomIndex];

    // Construct question by adding random players name
    let modifiedQuestion = question.replace("_", player);

    // Structure of main, present question
    main.innerHTML=`
    <div class="wrapper">
        <h1>Fill in the blank</h1>
        <div class="questionBox">
            <p>${modifiedQuestion}?</p>
        </div>
        <div class="timer">
            <div class="progressbar"></div>
        </div>
        <input class="fillInTheBlankAnswer"></input>
    </div>
    `;

    // Set aswering timer for 30sec
    let progressbar = document.querySelector(".progressbar");
    let answerTime = runTimer(30, progressbar, async function(){
        // Save players answer
        let playerAnswer = document.querySelector(".fillInTheBlankAnswer").value;
        let playerName = window.localStorage.getItem("playerName");

        // Send request to save answer
        let requestDataToSaveAnswer = {
            gameId: gameId,
            action: "saveAnswer",
            playerName: playerName,
            playerAnswer: playerAnswer
        }

        await fetchFillInTheBlank(requestDataToSaveAnswer);

        // Render all players answers for voting
        renderFillInTheBlankVoting(modifiedQuestion, questionIndex);
    });

    // If player is not host, check if game still exist and if there is an ongoing game
    let isHost = window.localStorage.getItem("host");
    if(!isHost){
        let checkActiveGame = setInterval( () => {
            checkIfGameExist(gameId, checkActiveGame);
            checkForActiveGame(gameId, answerTime, checkActiveGame);
        },1000);
    }

    // Structure of footer
    footer.innerHTML=`
    <div class="buttonQuit">
        <i class="fa-solid fa-chevron-left" style="color: #747474;"></i>
        <p>QUIT</p>
    </div>
    `;

    // When clicking quit leave game
    footer.querySelector(".buttonQuit").addEventListener("click", () =>{

        let isHost = window.localStorage.getItem("host");

        // If user is host - ask to play another game or keep playing
        if(isHost){
            // Clear timer so no results are presented
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
            popUp.querySelector(".leaveGame").addEventListener("click", async () =>{
                
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

            
        }else{
            // If user is not host - ask to leave game or keep playing
            leaveGame(answerTime);
        }
    })
}

async function renderFillInTheBlankVoting(modifiedQuestion){

    let main = document.querySelector("main");

    main.innerHTML=`
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

    // Remove players own answer

    // Present each answer
    for(let answer in allAnswers){
        let answerBox = document.createElement("div");
        answerBox.innerHTML = `<p>${allAnswers[answer]}</p>`;

        document.querySelector(".answers").appendChild(answerBox);

        // Vote for person when clicking
        answerBox.addEventListener("click", () => {

            let previousVote = null;
            let newVote = null;

            // Update who is voted for and if a previous vote needs to be removed
            if(answerBox.classList.contains("selected")){
                previousVote = answerBox.textContent;
                answerBox.classList.remove("selected"); 
            }else{
                document.querySelectorAll(".answers > div").forEach(answer => {
                    if(answer.classList.contains("selected")){
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

    // Set aswering timer for 15sec, then present results
    let progressbar = document.querySelector(".progressbar");
    let answerTime = runTimer(15, progressbar, async function(){
        
        // Fetch voting results
        let requestDataToFetchVotes = {
            gameId: gameId,
            action: "fetchVotes"
        }

        let votes = await fetchFillInTheBlank(requestDataToFetchVotes);

        let answerVoteCounter = {};

        // Count votes for each answer
        votes.forEach((votedAnswer) => {
            if(allAnswers[votedAnswer]){
                answerVoteCounter[votedAnswer] = (answerVoteCounter[votedAnswer] || 0) +1;
            }
        })

        // Convert answerVotesCount to an array of objects for sorting
        const sortedAnswers = Object.keys(answerVoteCounter).map((answer) => ({
            answer,
            votes: answerVoteCounter[answer]
        }));

        // Sort the array by the number of votes in descending order
        sortedAnswers.sort((a, b) => b.votes - a.votes);

        // Display results
        sortedAnswers.forEach((item) => {
            console.log(`${item.answer}: ${item.votes} votes`);


        });

    });


    // If player is not host, check if game still exist and if there is an ongoing game
    let isHost = window.localStorage.getItem("host");
    if(!isHost){
        let checkActiveGame = setInterval( () => {
            checkIfGameExist(gameId, checkActiveGame);
            checkForActiveGame(gameId, answerTime, checkActiveGame);
        },1000);
    }
    
}

// Function to handle fill in the blank fetch
async function fetchFillInTheBlank(requestData){

    // Set request parameters
    let requestParameters = {
        method: "POST",
        headers: {"Content-Type": "application/json; charset=UTF-8"},
        body: JSON.stringify(requestData)
    }

    let request = new Request("php/fillInTheBlank.php", requestParameters);

    // Fetch request and handle response
    try{
        let response = await fetch(request);

        if(response.ok){
            let resource = await response.json();
            return resource;
        }else{
            let error = await response.json();
            feedback(error.message);
        }
    }catch(error){
        console.log("Something went wrong", error);
    }
}