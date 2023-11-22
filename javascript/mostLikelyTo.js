"use strict";

async function renderMostLikelyTo(category){

    // Set mostLikelyTo class to main and footer
    let main = document.querySelector("main");
    main.removeAttribute("class");
    main.classList.add("mostLikelyTo");

    let footer = document.querySelector("footer");
    footer.removeAttribute("class");
    footer.classList.add("mostLikelyTo");

    // Fetch question
    let questionData = await fetchMostLikelyToQuestion(category);
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
       
        optionBox.innerHTML = `
            <p>${player}</p>`
        ;

        document.querySelector(".options").appendChild(optionBox);

    });

    // Set countdown timer for 30sec
    let progressbar = document.querySelector(".progressbar");
    runTimer(30, progressbar);
}

// Function to fetch a most likely to question
async function fetchMostLikelyToQuestion(category){
    // Set request parameters
    let requestParameters = {
        method: "POST",
        headers: {"Content-Type": "application/json; charset=UTF-8"},
        body: JSON.stringify({
            category: category,
        })
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


