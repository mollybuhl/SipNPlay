"use strict";
/* TO DO:
    - Import names
    - Present result

    - Game should only be created for one person
    - Others join by entering code
*/
async function renderMostLikelyTo(gameId, category){

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
    let questionIndex = 0;
    let questionData = questions[questionIndex];
    let question = questionData.question;
    
    // Structure of main
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

    // Fill options with name of players and give each player a color class
    // Names should be fetched for each round in case of new players!?
    let players = ["Molly", "Amanda", "Alex", "Buster", "Lasse"];
    let colorClasses = ["green", "orange", "pink"];
    let counter = 0; 

    players.forEach(player => {
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

    // Set countdown timer for 30sec
    let progressbar = document.querySelector(".progressbar");
    runTimer(30, progressbar,function(){
        renderMostLikelyToResult()
    });
}

// Function to fetch a most likely to question
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

// Function to create a game between players
async function createGame(players){

    let requestData = {
        action: "createGame",
        players: players
    }

    let gameId= await fetchMostLikelyTo(requestData);
    
    renderMostLikelyTo(gameId, "The Basic Version");
}

function renderMostLikelyToResult(){
    console.log("RESULTS ARE IN!");
}