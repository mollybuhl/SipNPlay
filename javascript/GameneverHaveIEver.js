
function renderNeverHaveIEver(){

    let main =document.querySelector("main");
    main.removeAttribute("class");
    main.classList.add("neverHaveIEver");

    let footer = document.querySelector("footer");

    main.innerHTML=`
    <h1>Never Have I Ever</h1>
    <div class="cards">
        <div class="currentCard"></div>
    </div>
    <div class=swipeNextCard>
        <div>
            <div></div>
            <p>Swipe up</p>
        </div>
    </div>
    `;

    footer.innerHTML=`
    <div class="buttonQuit">
        <i class="fa-solid fa-chevron-left" style="color: #747474;"></i>
        <p>QUIT</p>
    </div>
    `

    

};

function renderNewCard(){

}