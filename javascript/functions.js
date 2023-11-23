function renderMenu(){
    let menuPopup = document.createElement("div");
    menuPopup.classList.add("menuPopup");

    menuPopup.innerHTML = `
    <i class="fa-solid fa-xmark fa-lg" style="color: #747474;"></i>

    <div class="menuOptions">
        <div class="menuOption">
            <i class="fa-solid fa-martini-glass-empty exit" style="color: #e6e6e6;"></i>
            <p>Games</p>
        </div>
        <div class="menuOption">
            <i class="fa-solid fa-user-group" style="color: #e6e6e6;"></i>
            <p>Players</p>
        </div>
        <div class="menuOption">
            <i class="fa-solid fa-circle-info" style="color: #e6e6e6;"></i>
            <p>Instructions</p>
        </div>
        <div class="menuOption">
            <i class="fa-solid fa-earth-americas" style="color: #e6e6e6;"></i>
            <p>Language</p>
        </div>
    </div>
    `;

    document.querySelector("body").appendChild(menuPopup);
    menuPopup.querySelector(".menuOptions > .menuOption > .exit").addEventListener("click", closeMenu);
    
    function closeMenu(event){
        menuPopup.removeChild();
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
}