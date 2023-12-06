
// Function to display menu
function renderMenu(){

    let menuPopup = document.createElement("div");
    menuPopup.classList.add("menuPopup");

    menuPopup.innerHTML = `
    <i class="fa-solid fa-xmark fa-lg exit" style="color: #747474;"></i>

    <div class="menuOptions">
        <div class="menuOption games">
            <i class="fa-solid fa-martini-glass-empty" style="color: #e6e6e6;"></i>
            <p>Games</p>
        </div>
        <div class="menuOption startGame">
            <i class="fa-solid fa-user-group" style="color: #e6e6e6;"></i>
            <p>Join Game</p>
        </div>
        <div class="menuOption instructions">
            <i class="fa-solid fa-circle-info" style="color: #e6e6e6;"></i>
            <p>Instructions</p>
        </div>
        <div class="menuOption language">
            <i class="fa-solid fa-earth-americas" style="color: #e6e6e6;"></i>
            <p>Language</p>
        </div>
    </div>
    `;

    document.querySelector("body").appendChild(menuPopup);

    // Display games on click
    menuPopup.querySelector(".menuOptions > .games").addEventListener("click", ()=>{

        // If gamedisplay already rendered remove menu, otherwise render game display
        if(!document.querySelector("main").classList.contains("gameDisplay")){
            document.querySelector("body").removeChild(menuPopup);
            renderGameDisplay();
        }else{
            document.querySelector("body").removeChild(menuPopup);
        }

    });

    // Display Join Game
    menuPopup.querySelector(".startGame").addEventListener("click", () =>{
        document.querySelector("body").removeChild(menuPopup);
        renderStartGame();
    });

    // Display instructions
    //menuPopup.querySelector(".instructions").addEventListener("click", renderGameDisplay);

    // Display language settings
    //menuPopup.querySelector(".language").addEventListener("click", renderGameDisplay);
    
    // Close menu
    menuPopup.querySelector(".exit").addEventListener("click", closeMenu);

    function closeMenu(event){
        document.querySelector("body").removeChild(event.originalTarget.parentElement);
    }
}

// Function to run a set timer
function runTimer(time, progressbar,callback){

    let timeLeft = time;

    function isTimeLeft(){
        return timeLeft > -1;
    }

    let countdownTimer = setInterval(function(){
        if(isTimeLeft()){
            const timeRemaining = timeLeft--;
            const progress = (100/time) * timeRemaining;
            progressbar.style.width = `${progress}%`;
        }else{
            clearInterval(countdownTimer);
            if(callback){
                callback();
            }
        }


    },1000);

    return countdownTimer; // Return the time ID
}
