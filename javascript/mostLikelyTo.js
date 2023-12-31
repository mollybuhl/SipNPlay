"use strict";

// Function to render moste likely to question and handle votes
async function renderMostLikelyTo(category, gameId, questionIndex = 0){

    // Set mostLikelyTo class to main and footer
    let main = document.querySelector("main");
    main.removeAttribute("class");
    main.classList.add("mostLikelyTo");

    let footer = document.querySelector("footer");
    footer.removeAttribute("class");
    footer.classList.add("mostLikelyTo");

    // Fetch questions
    let requestData = {
        action: "fetchQuestion",
        category: category
    }

    let questions = await fetchMostLikelyTo(requestData);

    // Select question based on index
    let questionData = questions[questionIndex];
    let question = questionData.question;
    
    // Structure of main, present question
    main.innerHTML=`
    <div class="wrapper">
        <h1>Who is most likely to...</h1>
        <div class="questionBox">
            <p>${question}?</p>
        </div>
        <div class="timer">
            <div class="progressbar"></div>
        </div>
        <div class="options"></div>
    </div>
    `;

    // Fetch current players
    requestData = {
        action: "getPlayers",
        gameId: gameId
    }

    let players = await handleGameFetch(requestData);

    // Fill options with name of players and give each player a color class
    let colorClasses = ["green", "orange", "pink"];
    let counter = 0; 

    players.forEach(player => {

        // Create option box for each player and give a color class
        let optionBox = document.createElement("div");
        let colorClass = colorClasses[counter];
        optionBox.classList.add(colorClass);
        counter++; 

        if(counter > colorClasses.length - 1){
            counter = 0;
        }
       
        optionBox.innerHTML = ` <p>${player}</p>`;

        document.querySelector(".options").appendChild(optionBox);
        
        // Update selected person when clicking on their name
        optionBox.addEventListener("click", updateAnswer);

        // Function to update user answer
        function updateAnswer(){

            let previousVote = null;
            let newVote = null;

            // Update who is voted for and if a previous vote needs to be removed
            if(optionBox.classList.contains("selected")){
                previousVote = optionBox.textContent;
                optionBox.classList.remove("selected"); 
            }else{
                document.querySelectorAll(".options > div").forEach(option => {
                    if(option.classList.contains("selected")){
                        previousVote = option.textContent;
                        option.classList.remove("selected");
                    }
                });

                newVote = optionBox.textContent;
                optionBox.classList.add("selected");
            }

            // Send request to update votes
            let requestData = {
                gameId: gameId,
                action: "updateSelected",
                vote: newVote,
                previousVote: previousVote
            }

            fetchMostLikelyTo(requestData);  
        }   
    });

    // If player is not host, check if game still exist and if there is an ongoing game
    let isHost = window.localStorage.getItem("host");
    let checkActiveGame;
    if(!isHost){
        checkActiveGame = setInterval( () => {
            checkIfGameExist(gameId, checkActiveGame);
            checkForActiveGame(gameId, answerTime, checkActiveGame);
        },1000);
    }

    // Structure of footer
    footer.innerHTML=`
    <div class="buttonQuit">
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
        <path d="M0.325756 8.7026C0.337756 8.7126 0.353755 8.7166 0.365755 8.7266L8.07976 15.7086C8.51376 16.0986 9.21776 16.0986 9.65176 15.7086C9.65576 15.7046 9.65776 15.7006 9.65976 15.6966C9.76485 15.6098 9.84972 15.5012 9.90845 15.3782C9.96717 15.2552 9.99833 15.1209 9.99976 14.9846L9.99976 1.0186C9.99751 0.879825 9.96483 0.743234 9.904 0.618477C9.84318 0.49372 9.7557 0.383841 9.64776 0.2966L9.65176 0.292601C9.43338 0.103861 9.15439 0 8.86576 0C8.57712 0 8.29813 0.103861 8.07976 0.292601L0.325756 7.2906C0.223635 7.37772 0.141628 7.48596 0.0853958 7.60784C0.0291634 7.72973 4.19617e-05 7.86237 4.19617e-05 7.9966C4.19617e-05 8.13083 0.0291634 8.26347 0.0853958 8.38536C0.141628 8.50724 0.223635 8.61548 0.325756 8.7026Z" fill="#C1C1C1"/>
        </svg>        
        <p>QUIT</p>
    </div>
    `
    // When clicking quit leave game
    footer.querySelector(".buttonQuit").addEventListener("click", () =>{

        let isHost = window.localStorage.getItem("host");

        // If user is host - ask to play another game or keep playing
        if(isHost){

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
            popUp.querySelector(".leaveGame").addEventListener("click", async () =>{
                
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
                renderCategories("Most Likely To");
            })

            
        }else{
            // If user is not host - ask to leave game or keep playing
            clearInterval(checkActiveGame);
            leaveGame(answerTime);
        }  
    });

    // If host set initial timer
    if(isHost){
        let gameId = parseInt(localStorage.getItem("gameId"));

        let requestDataForUpdateTimer = {
            gameId: gameId,
            action: "updateTime",
            timeLeft: 15
        }
    
        await handleGameFetch(requestDataForUpdateTimer);
    }

    // Get and display answering time
    let progressbar = document.querySelector(".progressbar");
    let answerTime = await runTimer(15,progressbar,function(){
        clearInterval(checkActiveGame);
        renderMostLikelyToResult(questionIndex);
    });

    // Function to fetch and display results after countdown is finished
    async function renderMostLikelyToResult(questionIndex){

        // Send request to fetch results
        let requestData = {
            gameId: gameId,
            action: "fetchResults",
        }

        let votes = await fetchMostLikelyTo(requestData);
        let voteCounter = {};

        // Count votes
        votes.forEach((name) => {
            if (voteCounter.hasOwnProperty(name)) {
                // If yes, increment the count
                voteCounter[name]++;
            }else {
                // If not, initialize the count to 1
                voteCounter[name] = 1;
            }
        })

        // Find person with the most votes
        let mostVotedName = "";
        let maxVotes = 0;

        for(let name in voteCounter){
            if(voteCounter[name]>maxVotes){
                maxVotes = voteCounter[name];
                mostVotedName = name;
            }
        }
    
        // Set mostLikelyTo class and structure to main
        let main = document.querySelector("main");
        main.classList.add("mostLikelyToResult");
    
        main.innerHTML=`
        <h2>Take a sip</h2>
        <div class="resultName">${mostVotedName}</div>
        <h2>You are most likely to ${question}</h2>

        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="115" viewBox="0 0 100 115" fill="none">
        <path d="M4.11321 11.0652C3.46474 6.5455 6.97123 2.5 11.5372 2.5H88.4628C93.0288 2.5 96.5353 6.5455 95.8868 11.0652L82.2564 106.065C81.7265 109.758 78.563 112.5 74.8324 112.5H25.1676C21.437 112.5 18.2735 109.758 17.7436 106.065L4.11321 11.0652Z" stroke="#C1C1C1" stroke-width="5"/>
        <path d="M16.9445 35.157C16.4738 31.8398 19.3349 29.0075 22.6471 29.5115L31.6516 30.8818C36.4776 31.6162 41.4099 31.1618 46.0205 29.5581L54.2114 26.7091C59.3093 24.9359 64.7911 24.5709 70.079 25.6525L79.3907 27.5572C81.9804 28.0869 83.7104 30.5409 83.3391 33.1581L74.3947 96.2023C74.045 98.6677 71.9344 100.5 69.4443 100.5H30.5557C28.0656 100.5 25.955 98.6677 25.6053 96.2023L16.9445 35.157Z" fill="url(#paint0_linear_39_279)"/>
        <rect x="24" y="44.9175" width="4.60314" height="44" rx="2.30157" transform="rotate(-8 24 44.9175)" fill="#1B1B1B"/>
        <rect x="19" y="107" width="62" height="5" fill="#C1C1C1"/>
        <defs>
        <linearGradient id="paint0_linear_39_279" x1="50" y1="101" x2="50" y2="24" gradientUnits="userSpaceOnUse">
        <stop offset="0.0743588" stop-color="#B1C871"/>
        <stop offset="0.484375" stop-color="#E9A072"/>
        <stop offset="1" stop-color="#E16AB7"/>
        </linearGradient>
        </defs>
        </svg>
        `;

        // Set mostLikelyTo class and structure to footer
        let footer = document.querySelector("footer");

        // Structure of footer
        let isHost = window.localStorage.getItem("host");

        if(isHost){
            footer.innerHTML=`
            <div class="buttonQuit">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
                <path d="M0.325756 8.7026C0.337756 8.7126 0.353755 8.7166 0.365755 8.7266L8.07976 15.7086C8.51376 16.0986 9.21776 16.0986 9.65176 15.7086C9.65576 15.7046 9.65776 15.7006 9.65976 15.6966C9.76485 15.6098 9.84972 15.5012 9.90845 15.3782C9.96717 15.2552 9.99833 15.1209 9.99976 14.9846L9.99976 1.0186C9.99751 0.879825 9.96483 0.743234 9.904 0.618477C9.84318 0.49372 9.7557 0.383841 9.64776 0.2966L9.65176 0.292601C9.43338 0.103861 9.15439 0 8.86576 0C8.57712 0 8.29813 0.103861 8.07976 0.292601L0.325756 7.2906C0.223635 7.37772 0.141628 7.48596 0.0853958 7.60784C0.0291634 7.72973 4.19617e-05 7.86237 4.19617e-05 7.9966C4.19617e-05 8.13083 0.0291634 8.26347 0.0853958 8.38536C0.141628 8.50724 0.223635 8.61548 0.325756 8.7026Z" fill="#C1C1C1"/>
                </svg>                
                <p>QUIT</p>
            </div>
            <button class="nextButton">NEXT</button>
            `;

            // When host clicks on next button, clear votes and call to render next question
            footer.querySelector(".nextButton").addEventListener("click", async () => {
                
                // Send request to clear votes and answers
                let requestDataToClearVotes = {
                    gameId: gameId,
                    action: "clearVotes",
                }

                await fetchMostLikelyTo(requestDataToClearVotes);

                // Send request to update question index
                let requestDataToUpdateQuestionIndex = {
                    gameId: gameId,
                    action: "updateQuestionIndex",
                }

                let questionIndex = await handleGameFetch(requestDataToUpdateQuestionIndex);

                // Render next question
                renderMostLikelyTo(category, gameId, questionIndex);

            });
        }else{
            footer.innerHTML=`
            <div class="buttonQuit">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
                <path d="M0.325756 8.7026C0.337756 8.7126 0.353755 8.7166 0.365755 8.7266L8.07976 15.7086C8.51376 16.0986 9.21776 16.0986 9.65176 15.7086C9.65576 15.7046 9.65776 15.7006 9.65976 15.6966C9.76485 15.6098 9.84972 15.5012 9.90845 15.3782C9.96717 15.2552 9.99833 15.1209 9.99976 14.9846L9.99976 1.0186C9.99751 0.879825 9.96483 0.743234 9.904 0.618477C9.84318 0.49372 9.7557 0.383841 9.64776 0.2966L9.65176 0.292601C9.43338 0.103861 9.15439 0 8.86576 0C8.57712 0 8.29813 0.103861 8.07976 0.292601L0.325756 7.2906C0.223635 7.37772 0.141628 7.48596 0.0853958 7.60784C0.0291634 7.72973 4.19617e-05 7.86237 4.19617e-05 7.9966C4.19617e-05 8.13083 0.0291634 8.26347 0.0853958 8.38536C0.141628 8.50724 0.223635 8.61548 0.325756 8.7026Z" fill="#C1C1C1"/>
                </svg>                
                <p>QUIT</p>
            </div>
            `;
        }

        // If player is not host, check if game still exist and if there is an ongoing game
        // Also check if next question should be run
        let checkActiveGame;
        if(!isHost){
            checkActiveGame = setInterval( async () => {
                checkIfGameExist(gameId, checkActiveGame);
                checkForActiveGame(gameId, answerTime, checkActiveGame);

                let requestDataForNextQuestion = {
                    action: "requestNextQuestion",
                    gameId: gameId,
                    currentQuestion: questionIndex
                };

                let activeQuestion = await handleGameFetch(requestDataForNextQuestion);
                
                if(activeQuestion != questionIndex){
                    clearInterval(checkActiveGame);
                    renderMostLikelyTo(category, gameId, activeQuestion);
                }


            },1000);
        }   

        // When clicking quit button ask
        footer.querySelector(".buttonQuit").addEventListener("click", footer.querySelector(".buttonQuit").addEventListener("click", () =>{

            // If user is host - ask to play another game or keep playing
            if(isHost){

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
                popUp.querySelector(".leaveGame").addEventListener("click", async () =>{
                    
                    // Send request to clear votes
                   let requestDataToClearVotes = {
                        gameId: gameId,
                        action: "clearVotes",
                    }
                    await fetchMostLikelyTo(requestDataToClearVotes);

                    // Send request to end round
                    let requestDataForEndingRound = {
                        action: "endRound",
                        gameId: gameId
                    }
                    
                    await handleGameFetch(requestDataForEndingRound);

                    // Go back to category page
                    renderCategories("Most Likely To");
                })

                
            }else{
                // If user is not host - ask to leave game or keep playing
                clearInterval(checkActiveGame);
                leaveGame(answerTime);
            }
        }));
    }
}

// This function is called by the players, not the host to check if a game is active or not
async function checkForActiveGame(gameId, timer, interval1, interval2){
  
    let requestDataForCheckingActiveGame= {
        gameId: gameId,
        action: "checkActiveGame",
    }

    let activeGame = await handleGameFetch(requestDataForCheckingActiveGame);

    // If there is an active game return this information
    if(activeGame){
        return "Active game";
    }else{
        let infoBox = document.createElement("div");
        infoBox.classList.add("infoBox");
        infoBox.innerHTML = `
        <div>
            <p>Your host ended this round</p>
            <p>You will be taken back to the waiting page</p>
        </div>
        `;
        document.querySelector("main").appendChild(infoBox);

        // Clear timer
        if(timer){
            clearTimeout(timer);
        }
        // Clear interval
        if(interval1){
            clearInterval(interval1);
        }
        if(interval2){
            clearInterval(interval2);
        }

        setTimeout(() => {
            renderWaitingForGame(gameId);
        }, 3000);
    }         
}

// Function to handle most likely to fetch
async function fetchMostLikelyTo(requestData){

    // Set request parameters
    let requestParameters = {
        method: "POST",
        headers: {"Content-Type": "application/json; charset=UTF-8"},
        body: JSON.stringify(requestData)
    }

    let request = new Request("php/mostLikelyTo.php", requestParameters);

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