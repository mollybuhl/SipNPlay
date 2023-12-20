"use strict";
// Function to render Never have I Ever game
async function renderNeverHaveIEver(category, questionIndex = 0){

    // Set neverHaveIEver class to main and footer
    let main = document.querySelector("main");
    main.removeAttribute("class");
    main.classList.add("neverHaveIEver");

    let footer = document.querySelector("footer");
    footer.removeAttribute("class");
    footer.classList.add("neverHaveIEver");

    //Fetch questions and display the first one
    let questions = await fetchNeverHaveIEverQuestion(category);
    let questionData = questions[questionIndex];
    let question = questionData.question;
    questionIndex = questionIndex +1;

    // Structure of main
    main.innerHTML=`
    <h1>Never Have I Ever</h1>
    <div class="cards">
        <div class="currentCard">
            <p class="question">${question}</p>
            <div class="cardInformation">
                <p class="cardCategory">${category}</p>
            </div>
        </div>
        <div class="backCard"></div>
        <div class="backCard"></div>
        <div class="backCard"></div>
    </div>
    <div class="swipeNextCard">
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <g filter="url(#filter0_f_9_1880)">
            <path d="M15.318 12.326C15.308 12.338 15.304 12.354 15.294 12.366L8.31203 20.08C7.92203 20.514 7.92203 21.218 8.31203 21.652C8.31603 21.656 8.32003 21.658 8.32403 21.66C8.4108 21.7651 8.51947 21.85 8.64245 21.9087C8.76543 21.9674 8.89975 21.9986 9.03603 22L23.002 22C23.1408 21.9978 23.2774 21.9651 23.4022 21.9042C23.5269 21.8434 23.6368 21.7559 23.724 21.648L23.728 21.652C23.9168 21.4336 24.0206 21.1546 24.0206 20.866C24.0206 20.5774 23.9168 20.2984 23.728 20.08L16.73 12.326C16.6429 12.2239 16.5347 12.1419 16.4128 12.0856C16.2909 12.0294 16.1583 12.0003 16.024 12.0003C15.8898 12.0003 15.7572 12.0294 15.6353 12.0856C15.5134 12.1419 15.4051 12.2239 15.318 12.326Z" fill="#E7538C"/>
            </g>
            <defs>
            <filter id="filter0_f_9_1880" x="-1" y="-1" width="34" height="34" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="0.5" result="effect1_foregroundBlur_9_1880"/>
            </filter>
            </defs>
            </svg>
            <p>Next Card</p>
        </div>
    </div>
    `;

    // Structure of footer
    footer.innerHTML=`
    <div class="buttonQuit">
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
        <path d="M0.325714 8.7026C0.337714 8.7126 0.353713 8.7166 0.365713 8.7266L8.07971 15.7086C8.51371 16.0986 9.21771 16.0986 9.65171 15.7086C9.65571 15.7046 9.65771 15.7006 9.65971 15.6966C9.7648 15.6098 9.84968 15.5012 9.9084 15.3782C9.96713 15.2552 9.99829 15.1209 9.99971 14.9846L9.99971 1.0186C9.99747 0.879825 9.96478 0.743234 9.90396 0.618477C9.84314 0.49372 9.75566 0.383841 9.64771 0.2966L9.65171 0.292601C9.43334 0.103861 9.15435 0 8.86571 0C8.57708 0 8.29809 0.103861 8.07971 0.292601L0.325714 7.2906C0.223593 7.37772 0.141586 7.48596 0.0853539 7.60784C0.0291214 7.72973 0 7.86237 0 7.9966C0 8.13083 0.0291214 8.26347 0.0853539 8.38536C0.141586 8.50724 0.223593 8.61548 0.325714 8.7026Z" fill="#C1C1C1"/>
        </svg>        
        <p>QUIT</p>
    </div>
    `

    //Quit game when clicking on quit button
    footer.querySelector(".buttonQuit").addEventListener("click", () => {
        renderCategoryLocalGame("Never Have I Ever");
    })
    
    //Swipe for next question
    document.querySelector(".swipeNextCard").addEventListener("click", renderNewCard);

    // Function to render a new question
    async function renderNewCard(){
       
        // Fetch new card information
        let questionData = questions[questionIndex];
        let question = questionData.question;
        questionIndex++
    
        // Display new card
        document.querySelector(".cards > .currentCard > .question").textContent = question;
    }
};

// Function to fetch a Never Have I Ever Question
async function fetchNeverHaveIEverQuestion(category){

    // Set request parameters
    let requestParameters = {
        method: "POST",
        headers: {"Content-Type": "application/json; charset=UTF-8"},
        body: JSON.stringify({
            category: category,
        })
    }

    let request = new Request("php/neverHaveIEver.php", requestParameters);

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

