/*
    TO DO:
    - Implement swipe animation
*/

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
    let numberOfQuestions = questions.length;
    questionIndex = questionIndex +1;


    // Structure of main
    main.innerHTML=`
    <h1>Never Have I Ever</h1>
    <div class="cards">
        <div class="currentCard">
            <p class="question">${question}</p>
            <div class="cardInformation">
                <p class="cardCategory">${category}</p>
                <p class="cardNumber">${questionIndex}/${numberOfQuestions}</p>
            </div>
        </div>
        <div class="backCard"></div>
        <div class="backCard"></div>
        <div class="backCard"></div>
    </div>
    <div class="swipeNextCard">
        <div>
            <i class="fa-solid fa-angle-up" style="color: #747474;"></i>
            <p>Swipe up</p>
        </div>
    </div>
    `;

    // Structure of footer
    footer.innerHTML=`
    <div class="buttonQuit">
        <i class="fa-solid fa-chevron-left" style="color: #747474;"></i>
        <p>QUIT</p>
    </div>
    `

    //Quit game when clicking on quit button
    footer.querySelector(".buttonQuit").addEventListener("click", () => {
        renderCategoryLocalGame("Never Have I Ever");
    })
    
    //Swipe for next question
    //swipeNext();
    document.querySelector(".swipeNextCard").addEventListener("click", renderNewCard);

    // Function to render a new question
    async function renderNewCard(){
       
        // Fetch new card information
        let questionData = questions[questionIndex];
        let question = questionData.question;
        questionIndex++
    
        // Display new card
        document.querySelector(".cards > .currentCard > .question").textContent = question;
        document.querySelector(".cards > .currentCard > .cardInformation > .cardNumber").textContent = `${questionIndex}/${numberOfQuestions}`;
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

// Function to swipe for next card
function swipeNext(){
    let touchArea = document.querySelector(".swipeNextCard");

    //Initial mouse X and Y positions are 0

    let mouseX, initialX = 0;
    let mouseY, initialY =0;
    let isSwiped;

    //Events for touch and mouse
    let events = {
        mouse: {
            down: "mousedown",
            move: "mousemove",
            up: "mouseup"
        },
        touch:{
            down: "touchstart",
            move: "touchmove",
            up: "touched"
        }
    };

    let deviceType = "";

    // Detect touch devive
    const isTouchDevice = () => {
        try{
            // Try to create TouchEvent, will fail for desktop andd trow error
            document.createEvent("TouchEvent");
            deviceType = "touch";
            return true;
        }catch(error){
            deviceType = "mouse";
            return false;
        }
    }

    // Get left and top of touchArea
    let recLeft = touchArea.getBoundingClientRect().left;
    let recTop = touchArea.getBoundingClientRect().top;


    //Get Exact X and Y positions of mouse/touch
    const getXY = (e) => {
        mouseX = (!isTouchDevice() ? e.pageX : e.touches[0].pageX) - recLeft;
        mouseY = (!isTouchDevice() ? e.pageY : e.touches[0].pageY) - recTop;

    };

    isTouchDevice();

    //Start Swipe
    touchArea.addEventListener(events[deviceType].down,
        (event) => {
            isSwiped = true;

            //Get X and Y position
            getXY(event);
            initialX = mouseX;
            initialY = mouseY;
            console.log(mouseX, mouseY);
    })

    // Mousemove/touchmove
    touchArea.addEventListener(events[deviceType].move,
        (event) => {
            if(!isTouchDevice()){
                event.preventDefault();
            }
            if(isSwiped){
                getXY(event);
                let diffx = mouseX - initialX;
                let diffY = mouseY - initialY;

                if(Math.abs(diffY) > Math.abs(diffx)){
                    renderNewCard(category);
                }
            }
        }
    )
}
